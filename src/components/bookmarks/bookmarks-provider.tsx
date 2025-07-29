import type { IBookmark } from "@/types/bookmark";
import { createContext, useState, type ReactNode } from "react";

export const BookmarksContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  editingBookmark: IBookmark | null;
  setEditingBookmark: (bookmark: IBookmark | null) => void;
}>({
  open: false,
  setOpen: () => {},
  editingBookmark: null,
  setEditingBookmark: () => {},
});

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<IBookmark | null>(
    null,
  );

  return (
    <BookmarksContext.Provider
      value={{ open, setOpen, editingBookmark, setEditingBookmark }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
