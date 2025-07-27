import { useBookmarks } from "@/hooks/use-bookmarks";
import { AddBookmarkCard } from "./add-bookmark-card";
import { BookmarkCard } from "./bookmark-card";

export function Bookmarks() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="grid grid-cols-4 max-w-2xl w-full gap-4">
      {bookmarks.map((bookmark, key) => (
        <BookmarkCard key={key} bookmark={bookmark} />
      ))}
      {bookmarks.length < 12 && <AddBookmarkCard />}
    </div>
  );
}
