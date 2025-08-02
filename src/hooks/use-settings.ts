import { useRef, useSyncExternalStore, type RefObject } from "react";

const COMPONENT_KEYS = [
  "clock",
  "greeting",
  "theme",
  "engine",
  "bookmarks",
  "calendar",
] as const;

type AllowedSettingsKeys = (typeof COMPONENT_KEYS)[number];

type Settings = AllowedSettingsKeys[];

const LOCAL_STORAGE_KEY = "settings";

const getSnapshot = (lastSnapshotRef: RefObject<Settings>) => {
  const storedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
  try {
    if (!storedSettings) return lastSnapshotRef.current;
    if (JSON.stringify(lastSnapshotRef.current) !== storedSettings)
      lastSnapshotRef.current = JSON.parse(storedSettings);
    return lastSnapshotRef.current;
  } catch {
    return lastSnapshotRef.current;
  }
};

const subscribe = (callback: () => void) => {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === LOCAL_STORAGE_KEY) callback();
  };
  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
};

export function useSettings() {
  const lastSnapshotRef = useRef<Settings>(["bookmarks"]);

  const settings = useSyncExternalStore(subscribe, () =>
    getSnapshot(lastSnapshotRef),
  );

  const setSettings = (key: AllowedSettingsKeys, value: boolean) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(
        value ? [...settings, key] : settings.filter((el) => el !== key),
      ),
    );
    window.dispatchEvent(
      new StorageEvent("storage", { key: LOCAL_STORAGE_KEY }),
    );
  };
  return { settings, setSettings };
}
