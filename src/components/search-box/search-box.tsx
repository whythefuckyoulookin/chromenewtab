import { useSettings } from "@/hooks/use-settings";
import { SearchEngineSelect } from "./search-engine-select";
import { SearchInput } from "./search-input";
import { CircleQuestionMarkIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function SearchBox() {
  const { settings } = useSettings();

  return (
    <div className="relative w-full">
      <div className="absolute flex w-full items-start justify-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <CircleQuestionMarkIcon className="text-muted-foreground hover:text-foreground mt-2.5 flex size-5" />
          </TooltipTrigger>
          <TooltipContent side="left" className="text-center">
            Now to enable suggestions, open
            <br />
            <a
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://cors-anywhere.herokuapp.com/corsdemo"
            >
              link
            </a>{" "}
            and request temporary access
          </TooltipContent>
        </Tooltip>
        <SearchInput />
        {settings.includes("engine") && <SearchEngineSelect />}
      </div>
    </div>
  );
}
