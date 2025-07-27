import { useBookmarks } from "@/hooks/use-bookmarks";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { HexColorPicker } from "react-colorful";

const formSchema = z.object({
  title: z.string().min(3).max(16),
  url: z.url(),
  color: z.string(),
});

export function AddBookmarkCard() {
  const { addBookmark } = useBookmarks();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", url: "", color: "" },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    addBookmark(data);
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (v) form.reset();
        setOpen(v);
      }}
    >
      <DialogTrigger asChild>
        <Card className="hover:bg-muted cursor-pointer transition-colors bg-background">
          <PlusIcon className="size-10 mx-auto mt-auto rounded-full" />
          <p className="text-nowrap text-center mt-auto font-semibold">
            Add bookmark
          </p>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New bookmark</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="flex gap-4 items-start">
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
                  <div className="flex gap-2 items-end">
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
