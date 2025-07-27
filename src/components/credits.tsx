import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function Credits() {
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
          <p>Created by:</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
