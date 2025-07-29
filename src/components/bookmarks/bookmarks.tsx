import { AddBookmarkCard } from "./add-bookmark-card";
import { BookmarkCard } from "./bookmark-card";
import { BookmarkDialog } from "./bookmark-dialog";
import { BookmarksProvider } from "./bookmarks-provider";
import { useBookmarks } from "@/hooks/use-bookmarks";

export function Bookmarks() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="grid w-full max-w-2xl grid-cols-4 gap-4">
      <BookmarksProvider>
        {bookmarks.map((bookmark, key) => (
          <BookmarkCard bookmark={bookmark} key={key} />
        ))}
        {bookmarks.length < 12 && <AddBookmarkCard />}
        <BookmarkDialog />
      </BookmarksProvider>
    </div>
  );
}
