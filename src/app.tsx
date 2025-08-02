import { SearchBox } from "./components/search-box/search-box";
import { lazy } from "react";
import { SettingsPopover } from "./components/settings-popover";
import { useSettings } from "./hooks/use-settings";
import { Credits } from "./components/credits";

const Calendar = lazy(() =>
  import("./components/calendar").then((module) => ({
    default: module.Calendar,
  })),
);

const Clock = lazy(() =>
  import("./components/clock").then((module) => ({
    default: module.Clock,
  })),
);

const Greeting = lazy(() =>
  import("./components/greeting").then((module) => ({
    default: module.Greeting,
  })),
);
const Bookmarks = lazy(() =>
  import("./components/bookmarks/bookmarks").then((module) => ({
    default: module.Bookmarks,
  })),
);
// const Credits = lazy(() =>
//   import("./components/credits").then((module) => ({
//     default: module.Credits,
//   })),
// );
const ThemeSelect = lazy(() =>
  import("./components/theme-select").then((module) => ({
    default: module.ThemeSelect,
  })),
);

export function App() {
  const { settings } = useSettings();

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center gap-16">
      <SettingsPopover />
      {settings.includes("greeting") && <Greeting />}
      <SearchBox />
      {settings.includes("clock") && <Clock />}
      {settings.includes("bookmarks") && <Bookmarks />}
      <Credits />
      {settings.includes("calendar") && <Calendar />}
      {settings.includes("theme") && <ThemeSelect />}
    </div>
  );
}
