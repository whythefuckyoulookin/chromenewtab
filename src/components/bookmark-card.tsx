import { EllipsisIcon } from "lucide-react";
import { Card } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { IBookmark } from "@/types/bookmark";
import { useBookmarks } from "@/hooks/use-bookmarks";

const FAVICON =
  "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=";

// const FAVICON2 = "https://www.google.com/s2/favicons?domain=";

interface BookmarkCardProps {
  bookmark: IBookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const { removeBookmark } = useBookmarks();
  return (
    <Card
      className="transition-colors group/item cursor-pointer bg-background hover:bg-muted items-stretch relative"
      onClick={() => (location.href = bookmark.url)}
      {...(bookmark.color && {
        style: { backgroundColor: bookmark.color },
      })}
    >
      <div className="absolute mt-1 mr-1 top-0 right-0">
        <DropdownMenu>
          <DropdownMenuTrigger className="group/edit relative size-6" asChild>
            <div onClick={(e) => e.stopPropagation()}>
              <div className="size-px absolute"></div>
              <EllipsisIcon className="size-5 hidden group-hover/item:inline-flex group-data-[state=open]/edit:inline-flex fade-in-10 text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-min min-w-min bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            side="left"
            align="start"
          >
            <DropdownMenuItem disabled>Change</DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                removeBookmark(bookmark.title);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <img
        src={`${FAVICON}${bookmark.url}&size=32`}
        alt=""
        className="size-10 mx-auto rounded-sm mt-auto"
      />
      <p className="text-nowrap text-center mt-auto font-semibold">
        {bookmark.title}
      </p>
    </Card>
  );
}
