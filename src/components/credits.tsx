import { useTranslation } from "i18nano";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function Credits() {
  const t = useTranslation()
  return (
    <div className="absolute bottom-0 mb-12">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild variant="link" className="text-muted-foreground">
            <a
              href="https://github.com/whythefuckyoulookin"
              target="_blank"
              rel="noopener noreferrer"
            >
              @whythefuckyoulookin?
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("credits")}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
