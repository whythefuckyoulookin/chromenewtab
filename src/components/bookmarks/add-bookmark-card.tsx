import { Card } from "../ui/card";
import { useContext } from "react";
import { BookmarksContext } from "./bookmarks-provider";
import { PlusIcon } from "lucide-react";
import { useTranslation } from "i18nano";

export function AddBookmarkCard() {
  const { setOpen } = useContext(BookmarksContext);
  const t = useTranslation()
  return (
    <Card className="bg-background p-2" onClick={() => setOpen(true)}>
      <PlusIcon className="mt-auto size-8 self-center" />
      <span className="text-center">{t("createNew.title")}</span>
    </Card>
  );
}
