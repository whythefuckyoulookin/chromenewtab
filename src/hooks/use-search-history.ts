import { useCallback, useRef, useSyncExternalStore } from "react";

const LOCAL_STORAGE_KEY = "search-history";

export function useSearchHistory() {
  const lastSnapshotRef = useRef<string[]>([]);

  const getSnapshot = useCallback(() => {
    const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
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
      if (event.key === LOCAL_STORAGE_KEY) callback();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const history = useSyncExternalStore(subscribe, getSnapshot);

  const addToHistory = useCallback(
    (newItem: string) =>
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        history.length < 5
          ? JSON.stringify([newItem, ...history])
          : JSON.stringify([newItem, ...history.slice(0, -1)])
      ),
    [history]
  );

  // const removeFromHistory = useCallback(
  //   (item: string) => {
  //     localStorage.setItem(
  //       LOCAL_STORAGE_KEY,
  //       JSON.stringify(history.filter((v) => v !== item))
  //     );
  //     window.dispatchEvent(
  //       new StorageEvent("storage", {
  //         key: LOCAL_STORAGE_KEY,
  //       })
  //     );
  //   },
  //   [history]
  // );

  return { history, addToHistory };
}
