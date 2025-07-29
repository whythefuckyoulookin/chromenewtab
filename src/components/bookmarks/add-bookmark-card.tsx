import { Card } from "../ui/card";
import { useContext } from "react";
import { BookmarksContext } from "./bookmarks-provider";
import { PlusIcon } from "lucide-react";

export function AddBookmarkCard() {
  const { setOpen } = useContext(BookmarksContext);

  return (
    <Card className="bg-background p-2" onClick={() => setOpen(true)}>
      <PlusIcon className="mt-auto size-8 self-center" />
      <span className="text-center">Add bookmark</span>
    </Card>
  );
}
