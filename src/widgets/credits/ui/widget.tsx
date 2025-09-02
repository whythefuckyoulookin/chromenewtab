import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Translation } from "i18nano";
import { GithubIcon, LinkIcon, MailIcon, SendIcon } from "lucide-react";
import { useRef } from "react";

const splittedAuthorId = import.meta.env.VITE_AUTHOR_ID.split("@");

export function Widget() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="group flex flex-col gap-8" ref={ref}>
      <Typography variant="lead" className="text-foreground relative flex">
        <span className="group-data-[hovered]:text-muted-foreground group-data-[hovered=mail]:text-primary group-data-[hovered=tg]:text-primary relative transition-colors duration-300 ease-in">
          {splittedAuthorId[0]}
          <Typography
            as="span"
            variant="small"
            className="text-muted-foreground text-xs border-muted-foreground absolute right-0 -bottom-5 left-0 w-full border-b border-dashed pb-1 opacity-0 transition-opacity duration-300 ease-in group-data-[hovered=tg]:opacity-100"
          >
            <Translation path="labels.telegram" />
          </Typography>
        </span>
        <span className="relative">
          <span className="group-data-[hovered]:text-muted-foreground group-data-[hovered=mail]:text-primary group-data-[hovered=github]:text-primary transition-colors duration-300 ease-in">
            @
          </span>
          <span className="group-data-[hovered]:text-muted-foreground group-data-[hovered=mail]:text-primary group-data-[hovered=github]:text-primary group-data-[hovered=site]:text-primary relative transition-colors duration-300 ease-in">
            {splittedAuthorId[1]}
            <Typography
              as="span"
              variant="small"
              className="text-muted-foreground text-xs border-muted-foreground absolute right-0 -bottom-5 left-0 w-full border-b border-dashed pb-1 opacity-0 transition-opacity duration-300 ease-in group-data-[hovered=site]:opacity-100"
            >
              <Translation path="labels.site" />
            </Typography>
          </span>
          <Typography
            as="span"
            variant="small"
            className="text-muted-foreground text-xs border-muted-foreground absolute right-0 -bottom-5 left-0 w-full border-b border-dashed pb-1 opacity-0 transition-opacity duration-300 ease-in group-data-[hovered=github]:opacity-100"
          >
            <Translation path="labels.github" />
          </Typography>
        </span>
        <Typography
          as="span"
          variant="small"
          className="text-muted-foreground text-xs border-muted-foreground absolute right-0 -bottom-5 left-0 w-full border-b border-dashed pb-1 opacity-0 transition-opacity duration-300 ease-in group-data-[hovered=mail]:opacity-100"
        >
          <Translation path="labels.mail" />
        </Typography>
      </Typography>
      <div className="flex items-center justify-center gap-4">
        <Button
          onMouseEnter={() => {
            ref.current?.setAttribute("data-hovered", "tg");
          }}
          onMouseLeave={() => {
            ref.current?.removeAttribute("data-hovered");
          }}
          size="icon"
          variant="ghost"
          className="cursor-pointer hover:!bg-transparent hover:pb-2"
          asChild
        >
          <a
            href={`https://${splittedAuthorId[0]}.t.me`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SendIcon />
          </a>
        </Button>
        <Button
          onMouseEnter={() => {
            ref.current?.setAttribute("data-hovered", "site");
          }}
          onMouseLeave={() => {
            ref.current?.removeAttribute("data-hovered");
          }}
          size="icon"
          variant="ghost"
          className="cursor-pointer hover:!bg-transparent hover:pb-2"
          asChild
        >
          <a
            href={`https://${splittedAuthorId[1]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkIcon />
          </a>
        </Button>
        <Button
          onMouseEnter={() => {
            ref.current?.setAttribute("data-hovered", "mail");
          }}
          onMouseLeave={() => {
            ref.current?.removeAttribute("data-hovered");
          }}
          size="icon"
          variant="ghost"
          className="cursor-pointer hover:!bg-transparent hover:pb-2"
          asChild
        >
          <a href={`mailto:${import.meta.env.VITE_AUTHOR_ID}`}>
            <MailIcon />
          </a>
        </Button>
        <Button
          onMouseEnter={() => {
            ref.current?.setAttribute("data-hovered", "github");
          }}
          onMouseLeave={() => {
            ref.current?.removeAttribute("data-hovered");
          }}
          size="icon"
          variant="ghost"
          className="cursor-pointer hover:!bg-transparent hover:pb-2"
          asChild
        >
          <a
            href={`https://github.com/${splittedAuthorId[0]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </a>
        </Button>
      </div>
    </div>
  );
}
