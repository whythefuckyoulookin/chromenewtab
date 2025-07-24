/**
 * a raw, unoptimized version of the hook...
 * don't look at him...
 * yet.
 */

import { useCallback, useRef, useSyncExternalStore } from "react";

export function useSearchHistory(): [string[], (newItem: string) => void] {
  const lastSnapshotRef = useRef([]);

  const getSnapshot = useCallback(() => {
    const storedHistory = localStorage.getItem("search-history");
    try {
      if (!storedHistory) return lastSnapshotRef.current;
      if (JSON.stringify(lastSnapshotRef.current) !== storedHistory)
        lastSnapshotRef.current = JSON.parse(storedHistory);
      return lastSnapshotRef.current;
    } catch {
      return lastSnapshotRef.current;
    }
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "search-history") callback();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const history = useSyncExternalStore(subscribe, getSnapshot);

  const addToHistory = useCallback(
    (newItem: string) =>
      localStorage.setItem(
        "search-history",
        history.length < 5
          ? JSON.stringify([newItem, ...history])
          : JSON.stringify([newItem, ...history.slice(0, -1)])
      ),
    [history]
  );

  return [history, addToHistory];
}
