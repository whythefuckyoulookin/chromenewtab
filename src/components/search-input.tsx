import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { useState } from "react";
import { useSearchHistory } from "@/hooks/use-search-history";
import { search } from "@/lib/search";
import { engines } from "@/data/search-engines";
import { useSearchEngine } from "@/hooks/use-search-engine";

export function SearchInput() {
  const { engine } = useSearchEngine("google");
  const { addToHistory, history } = useSearchHistory();
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);

  return (
    <Command className="rounded-lg border shadow-md max-w-[450px] h-full z-10">
      <CommandInput
        onFocus={() => setFocus(true)}
        placeholder={`Search in ${engines[engine].title}...`}
        value={value}
        onBlur={() => setFocus(false)}
        onValueChange={setValue}
      />
      <CommandList hidden={!focus}>
        {value !== "" && !history.includes(value) && (
          <CommandGroup forceMount heading="Search">
            <CommandItem
              forceMount
              onSelect={() => {
                if (!history.includes(value)) addToHistory(value);
                search(value, engines[engine]);
              }}
            >
              <span>{value}</span>
            </CommandItem>
          </CommandGroup>
        )}
        <CommandSeparator />
        {!!history.length && (
          <CommandGroup heading="History">
            {history.map((item, key) => (
              <CommandItem
                key={key}
                onSelect={() => search(item, engines[engine])}
              >
                <span>{item}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
