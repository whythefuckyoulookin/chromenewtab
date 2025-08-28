import { SettingsIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Switch } from "./ui/switch";
import { useSettings } from "@/hooks/use-settings";
import { useTranslation } from "i18nano";

export function SettingsPopover() {
  const { setSettings, settings } = useSettings();
  const t = useTranslation()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="group absolute top-0 left-0 mt-12 ml-12"
          size="icon"
          aria-label="Select theme"
        >
          <SettingsIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-auto flex-col gap-3">
        <div className="flex items-center justify-between gap-5 text-sm">
          <p>{t("settings.clock")}</p>
          <Switch
            checked={settings.includes("clock")}
            onCheckedChange={(value) => setSettings("clock", value)}
          />
        </div>
        <div className="flex items-center justify-between gap-5 text-sm">
          <p>{t("settings.greeting")}</p>
          <Switch
            checked={settings.includes("greeting")}
            onCheckedChange={(value) => setSettings("greeting", value)}
          />
        </div>
        <div className="flex items-center justify-between gap-5 text-sm">
          <p>{t("settings.themeSelect")}</p>
          <Switch
            checked={settings.includes("theme")}
            onCheckedChange={(value) => setSettings("theme", value)}
          />
        </div>
        <div className="flex items-center justify-between gap-5 text-sm">
          <p>{t("settings.searchEngineSelect")}</p>
          <Switch
            checked={settings.includes("engine")}
            onCheckedChange={(value) => setSettings("engine", value)}
          />
        </div>
        <div className="flex items-center justify-between gap-5 text-sm">
          <p>{t("settings.bookmarks")}</p>
          <Switch
            checked={settings.includes("bookmarks")}
            onCheckedChange={(value) => setSettings("bookmarks", value)}
          />
        </div>
        <div className="flex items-center justify-between gap-5 text-sm">
          <p>{t("settings.calendar")}</p>
          <Switch
            checked={settings.includes("calendar")}
            onCheckedChange={(value) => setSettings("calendar", value)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
