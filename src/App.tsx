import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from "./components/ui/select";
import { Card, CardHeader, CardTitle } from "./components/ui/card";

type SearchEngine = "google" | "yandex";

interface SearchEngineProps {
  title: string;
  url: string;
  name: string;
}

const engines: { [key in SearchEngine]: SearchEngineProps } = {
  google: {
    title: "Google",
    url: "https://www.google.com/search",
    name: "q",
  },
  yandex: {
    title: "Yandex",
    url: "https://ya.ru/search/",
    name: "text",
  },
};

export function App() {
  const [engine, setEngine] = useState<SearchEngine>("google");
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);

  return (
    <div className="min-h-dvh flex w-full items-center justify-center flex-col gap-16">
      <div className="flex w-full gap-4 justify-center relative">
        <div className="absolute w-full flex items-start justify-center gap-2">
          <Command className="rounded-lg border shadow-md max-w-[450px] h-full">
            <form id="search" action={engines[engine].url}>
              <CommandInput
                name={engines[engine].name}
                placeholder={`Search in ${engines[engine].title}...`}
                value={value}
                onValueChange={setValue}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
              />
            </form>
            <CommandList hidden={!focus}>
              {value !== "" && (
                <CommandGroup heading="Search">
                  <CommandItem
                    onSelect={() => {
                      const form = document.getElementById(
                        "search"
                      ) as HTMLFormElement;
                      form.submit();
                    }}
                  >
                    <span>{value}</span>
                  </CommandItem>
                </CommandGroup>
              )}
              <CommandGroup heading="Suggestions">
                <CommandItem>alendar</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="History">
                <CommandItem>Profile</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
          <Select
            value={engine}
            onValueChange={(v) => setEngine(v as SearchEngine)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Engines</SelectLabel>
                {Object.entries(engines).map((v, i) => (
                  <SelectItem key={i} value={v[0]}>
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${v[1].url}`}
                      alt=""
                    />
                    {v[1].title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-4 max-w-2xl w-full gap-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="text-center">
                <CardTitle>{i}</CardTitle>
              </CardHeader>
            </Card>
          ))}
      </div>
    </div>
  );
}
