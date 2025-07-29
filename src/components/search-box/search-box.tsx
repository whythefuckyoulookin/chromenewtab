import { SearchEngineSelect } from "./search-engine-select";
import { SearchInput } from "./search-input";

export function SearchBox() {
  return (
    <div className="w-full relative">
      <div className="absolute w-full flex items-start justify-center gap-2">
        <SearchInput />
        <SearchEngineSelect />
      </div>
    </div>
  );
}
