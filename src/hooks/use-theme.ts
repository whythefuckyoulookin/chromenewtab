import { useSyncExternalStore } from "react";

type Theme = "light" | "dark" | "system";

const LOCAL_STORAGE_KEY = "theme";

const getSnapshot = (initialTheme: Theme) => {
  const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
  try {
    return storedTheme ? (JSON.parse(storedTheme) as Theme) : initialTheme;
  } catch {
    return initialTheme;
  }
};

const subscribe = (callback: () => void) => {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === LOCAL_STORAGE_KEY) callback();
  };
  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
};

export function useTheme(initialTheme: Theme) {
  const theme = useSyncExternalStore(subscribe, () =>
    getSnapshot(initialTheme)
  );

  const setTheme = (theme: Theme) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(theme));
    window.dispatchEvent(
      new StorageEvent("storage", { key: LOCAL_STORAGE_KEY })
    );
  };

  return {theme, setTheme};
}
