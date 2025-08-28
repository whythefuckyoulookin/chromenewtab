import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useEffect, useRef, useState } from "react";
import { useSearchHistory } from "@/hooks/use-search-history";
import { search } from "@/lib/search";
import { engines } from "@/data/search-engines";
import { useSearchEngine } from "@/hooks/use-search-engine";
import { useDebounce } from "@/hooks/use-debounce";
import { HistoryIcon, SearchIcon } from "lucide-react";
import { useTranslation } from "i18nano";

export function SearchInput() {
  const { engine } = useSearchEngine("google");
  const t = useTranslation()
  const { addToHistory, history } = useSearchHistory();
  const [value, setValue] = useState("");
  const debouncedSearchTerm = useDebounce(value, 500);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [fetchedItems, setFetchedItems] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.code === "Slash") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleChange = () => {
    console.log("handleChange");
    fetch(
      `https://cors-anywhere.herokuapp.com/https://duckduckgo.com/ac/?q=${encodeURIComponent(value)}&type=list`,
    )
      .then((res) => res.json())
      .then((data) => {
        setFetchedItems(data[1]);
      });
  };

  useEffect(() => {
    if (debouncedSearchTerm === "") {
      return setFetchedItems([]);
    }
    handleChange();
  }, [debouncedSearchTerm]);

  return (
    <Command
      loop
      className="z-10 h-full max-w-[600px] rounded-lg border shadow-md"
    >
      <div className="relative">
        <CommandInput
          onFocus={() => setFocus(true)}
          placeholder={t("search.input.placeholder", {engine: engines[engine].title})}
          value={value}
          ref={inputRef}
          className="pr-16"
          onBlur={() => setFocus(false)}
          onValueChange={setValue}
        />
        <div className="absolute top-0 right-0 bottom-0 flex items-center gap-1 pr-3 text-sm">
          <code className="bg-muted rounded px-1">Ctrl</code>
          <code className="bg-muted rounded px-1">/</code>
        </div>
      </div>
      <CommandList hidden={!focus}>
        {value !== "" &&
          !history.includes(value) &&
          !fetchedItems.includes(value) && (
            <CommandGroup forceMount>
              <CommandItem
                forceMount
                onSelect={() => {
                  if (!history.includes(value)) addToHistory(value);
                  search(value, engines[engine]);
                }}
              >
                <SearchIcon />
                <span>{value}</span>
              </CommandItem>
            </CommandGroup>
          )}
        {!!fetchedItems.length && (
          <CommandGroup forceMount>
            {fetchedItems.map((item, key) => (
              <CommandItem
                forceMount
                key={key}
                onSelect={() => {
                  if (!history.includes(value)) addToHistory(value);
                  search(item, engines[engine]);
                }}
              >
                <SearchIcon />
                <span>{item}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {!!history.length && (
          <CommandGroup>
            {history.map((item, key) => (
              <CommandItem
                key={key}
                onSelect={() => search(item, engines[engine])}
              >
                <HistoryIcon />
                <span>{item}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
