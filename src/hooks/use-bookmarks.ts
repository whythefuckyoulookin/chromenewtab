import type { IBookmark } from "@/types/bookmark";
import { useRef, useSyncExternalStore, type RefObject } from "react";

const LOCAL_STORAGE_KEY = "bookmarks";

const getSnapshot = (lastSnapshotRef: RefObject<IBookmark[]>) => {
  const storedBookmarks = localStorage.getItem(LOCAL_STORAGE_KEY);
  try {
    if (!storedBookmarks) return lastSnapshotRef.current;
    if (JSON.stringify(lastSnapshotRef.current) !== storedBookmarks)
      lastSnapshotRef.current = JSON.parse(storedBookmarks);
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

export function useBookmarks() {
  const lastSnapshotRef = useRef([]);

  const bookmarks = useSyncExternalStore(subscribe, () =>
    getSnapshot(lastSnapshotRef)
  );

  const addBookmark = (newBookmark: IBookmark) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...bookmarks, newBookmark])
    );
    window.dispatchEvent(
      new StorageEvent("storage", { key: LOCAL_STORAGE_KEY })
    );
  };

  const removeBookmark = (bookmarkTitle: IBookmark["title"]) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(bookmarks.filter((v) => v.title !== bookmarkTitle))
    );
    window.dispatchEvent(
      new StorageEvent("storage", { key: LOCAL_STORAGE_KEY })
    );
  };

  return { bookmarks, addBookmark, removeBookmark };
}
