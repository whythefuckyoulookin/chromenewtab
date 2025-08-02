import { useSettings } from "@/hooks/use-settings";
import { SearchEngineSelect } from "./search-engine-select";
import { SearchInput } from "./search-input";

export function SearchBox() {
  const { settings } = useSettings();

  return (
    <div className="relative w-full">
      <div className="absolute flex w-full items-start justify-center gap-2">
        <SearchInput />
        {settings.includes("engine") && <SearchEngineSelect />}
      </div>
    </div>
  );
}
