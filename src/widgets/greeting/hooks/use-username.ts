import { useSyncExternalStore } from "react";

const LOCAL_STORAGE_KEY = "username";

const getSnapshot = () => {
  const storedUsername = localStorage.getItem(LOCAL_STORAGE_KEY);
  try {
    return storedUsername ? (JSON.parse(storedUsername) as string) : undefined;
  } catch {
    return undefined;
  }
};

const subscribe = (callback: () => void) => {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === LOCAL_STORAGE_KEY) callback();
  };
  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
};

export function useUsername() {
  const username = useSyncExternalStore(subscribe, getSnapshot);

  const setUsername = (newUsername: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUsername));
    window.dispatchEvent(
      new StorageEvent("storage", { key: LOCAL_STORAGE_KEY })
    );
  };

  return { username, setUsername };
}
