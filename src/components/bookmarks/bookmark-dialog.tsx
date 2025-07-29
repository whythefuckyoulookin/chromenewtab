import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useContext, useEffect } from "react";
import { BookmarksContext } from "./bookmarks-provider";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { HexColorPicker } from "react-colorful";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBookmarks } from "@/hooks/use-bookmarks";

const formSchema = z.object({
  title: z.string().min(3).max(16),
  url: z.url(),
  color: z.string(),
});

export function BookmarkDialog() {
  const { open, setOpen, editingBookmark, setEditingBookmark } =
    useContext(BookmarksContext);
  const { editBookmark, addBookmark } = useBookmarks();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: editingBookmark?.title || "",
      url: editingBookmark?.url || "",
      color: editingBookmark?.color || "",
    },
  });

  useEffect(() => {
    form.reset({
      title: editingBookmark ? editingBookmark.title : "",
      url: editingBookmark ? editingBookmark.url : "",
      color: editingBookmark ? editingBookmark.color : "",
    });
  }, [editingBookmark]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    editingBookmark
      ? editBookmark(editingBookmark.title, data)
      : addBookmark(data);
    onClose();
  };

  const onClose = () => {
    setOpen(false);
    setEditingBookmark(null);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingBookmark ? "Edit bookmark" : "New bookmark"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="basis-2/3">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <div className="flex items-end gap-2">
                    <FormItem>
                      <FormLabel>Custom color</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="transition-none"
                          style={{ backgroundColor: field.value }}
                        >
                          <div />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-2">
                        <HexColorPicker
                          className="custom-pointers"
                          color={field.value}
                          onChange={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input placeholder="https://everywhere.yvl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
