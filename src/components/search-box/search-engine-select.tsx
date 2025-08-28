import { useSearchEngine } from "@/hooks/use-search-engine";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { engines } from "@/data/search-engines";
import type { SearchEngine } from "@/types/search-engine";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useTranslation } from "i18nano";

export function SearchEngineSelect() {
  const { engine, setEngine } = useSearchEngine("google");
  const t = useTranslation()

  return (
    <Select value={engine} onValueChange={(v) => setEngine(v as SearchEngine)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SelectTrigger
            className="w-36"
            data-with-icon
            aria-label={t("search.engine.ariaLabel")}
          >
            <SelectValue />
          </SelectTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("search.engine.tooltip")}</p>
        </TooltipContent>
      </Tooltip>
      <SelectContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        align="end"
        className="bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur"
      >
        <SelectGroup>
          <SelectLabel>{t("search.engine.label")}</SelectLabel>
          {Object.entries(engines).map((v, i) => (
            <SelectItem key={i} value={v[0]}>
              <img src={`/assets/img/engines/${v[0]}.png`} alt="" width={16} height={16} />
              {v[1].title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
