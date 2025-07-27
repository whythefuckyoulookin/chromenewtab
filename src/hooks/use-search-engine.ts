import type { SearchEngine } from "@/types/search-engine";
import { useSyncExternalStore } from "react";

const LOCAL_STORAGE_KEY = "search-engine";

const subscribe = (callback: () => void) => {
  const handleStorageChangee = (event: StorageEvent) => {
    if (event.key === LOCAL_STORAGE_KEY) callback();
  };
  window.addEventListener("storage", handleStorageChangee);
  return () => window.removeEventListener("storage", handleStorageChangee);
};

const getSnapshot = (initialEngine: SearchEngine) => {
  const storedEngine = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedEngine ? (storedEngine as SearchEngine) : initialEngine;
};

export function useSearchEngine(initialEngine: SearchEngine) {
  const engine = useSyncExternalStore(subscribe, () =>
    getSnapshot(initialEngine)
  );

  const setEngine = (engine: SearchEngine) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, engine);
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: LOCAL_STORAGE_KEY,
      })
    );
  };

  return { engine, setEngine };
}
