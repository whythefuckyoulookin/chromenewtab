import { MoonIcon, SunIcon, TvMinimalIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "./ui/select";
import { useTheme } from "@/hooks/use-theme";
import { useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ThemeSelect() {
  const { setTheme, theme } = useTheme("system");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const handleMqlChange = (e: MediaQueryListEvent) => {
        root.classList.remove("light", "dark");
        root.classList.add(e.matches ? "dark" : "light");
      };
      root.classList.add(mql.matches ? "dark" : "light");
      mql.addEventListener("change", handleMqlChange);
      return () => mql.removeEventListener("change", handleMqlChange);
    }
    root.classList.add(theme);
  }, [theme]);

  return (
    <Select value={theme} onValueChange={setTheme}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant="outline"
            className="absolute top-0 right-0 mt-12 mr-12 group"
            size="icon"
            aria-label="Select theme"
          >
            <SelectTrigger data-value={theme}>
              <SunIcon className="group-data-[value=light]:block hidden" />
              <MoonIcon className="group-data-[value=dark]:block hidden" />
              <TvMinimalIcon className="group-data-[value=system]:block hidden" />
            </SelectTrigger>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Choose page theme</p>
        </TooltipContent>
      </Tooltip>
      <SelectContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        align="end"
        className="w-min"
      >
        <SelectGroup>
          <SelectLabel>Theme</SelectLabel>
          <SelectItem value="light">
            <SunIcon /> Light
          </SelectItem>
          <SelectItem value="dark">
            <MoonIcon /> Dark
          </SelectItem>
          <SelectItem value="system">
            <TvMinimalIcon /> System
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
