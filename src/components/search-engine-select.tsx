import { useSearchEngine } from "@/hooks/use-search-engine";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { engines } from "@/data/search-engines";
import type { SearchEngine } from "@/types/search-engine";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function SearchEngineSelect() {
  const { engine, setEngine } = useSearchEngine("google");

  return (
    <Select value={engine} onValueChange={(v) => setEngine(v as SearchEngine)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SelectTrigger className="w-36" data-with-icon>
            <SelectValue />
          </SelectTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Pick search engine</p>
        </TooltipContent>
      </Tooltip>
      <SelectContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        align="end"
        className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <SelectGroup>
          <SelectLabel>Engines</SelectLabel>
          {Object.entries(engines).map((v, i) => (
            <SelectItem key={i} value={v[0]}>
              <img src={`/assets/img/engines/${v[0]}.png`} alt="" />
              {v[1].title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
