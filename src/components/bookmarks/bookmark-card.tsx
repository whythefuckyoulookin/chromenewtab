import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EllipsisVerticalIcon } from "lucide-react";
import { useContext } from "react";
import { BookmarksContext } from "./bookmarks-provider";
import { useBookmarks } from "@/hooks/use-bookmarks";
import type { IBookmark } from "@/types/bookmark";

export function BookmarkCard({ bookmark }: { bookmark: IBookmark }) {
  const { setOpen, setEditingBookmark } = useContext(BookmarksContext);
  const { removeBookmark } = useBookmarks();
  return (
    <Card
      className="bg-background relative p-2"
      {...(bookmark.color && { style: { backgroundColor: bookmark.color } })}
    >
      <a
        href={bookmark.url}
        className="absolute inset-0 rounded-xl"
        aria-label={`Bookmark ${bookmark.title}`}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="z-0 size-6 self-end rounded-sm"
            aria-label="Edit bookmark"
          >
            <EllipsisVerticalIcon className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onCloseAutoFocus={(e) => e.preventDefault()}
          side="left"
          align="start"
          className="w-min min-w-min"
        >
          <DropdownMenuItem
            onClick={() => {
              setEditingBookmark(bookmark);
              setOpen(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              removeBookmark(bookmark.title);
            }}
            variant="destructive"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <img
        src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${bookmark.url}&size=32`}
        alt="bookmark-icon"
        className="size-8 self-center rounded-xs"
        width={32}
        height={32}
      />
      <span className="text-center">{bookmark.title}</span>
    </Card>
  );
}
