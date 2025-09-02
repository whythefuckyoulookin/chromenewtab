import { SearchBox } from "./components/search-box/search-box";
import { SettingsPopover } from "./components/settings-popover";
import { useSettings } from "./hooks/use-settings";
import { lazyNamed } from "./lib/lazy-named";
import { TranslationProvider } from "i18nano";
import { getTranslations } from "./i18n/constants";

const Credits = lazyNamed(() => import("./widgets/credits"), "Credits")
const Calendar = lazyNamed(() => import("./components/calendar"), "Calendar");
const Clock = lazyNamed(() => import("./components/clock"), "Clock");
const Greeting = lazyNamed(() => import("./components/greeting"), "Greeting");
const Bookmarks = lazyNamed(
  () => import("./components/bookmarks/bookmarks"),
  "Bookmarks",
);
const ThemeSelect = lazyNamed(
  () => import("./components/theme-select"),
  "ThemeSelect",
);

// const translations = MODULES.reduce((acc, mod) => ({ ...acc, ...({ [mod]: LANGUAGES.reduce((acc, lan) => ({ ...acc, ... ({ [lan]: () => import(`@/i18n/translations/${mod}/${lan}.json`) }) }), {}) }) }), {})

const commonTranslations = getTranslations("common");
const bookmarksTranslations = getTranslations("bookmarks");

export function App() {
  const { settings } = useSettings();

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center gap-16">
      {settings.includes("greeting") && <Greeting />}
      <TranslationProvider
        translations={commonTranslations}
        language={navigator.language.split("-")[0]}
      >
        <SettingsPopover />
        <SearchBox />
      </TranslationProvider>
      <div className="absolute bottom-0 mb-12">
        <Credits />
      </div>

      {settings.includes("clock") && <Clock />}
      {settings.includes("bookmarks") && (
        <TranslationProvider
          translations={bookmarksTranslations}
          language={navigator.language.split("-")[0]}
        >
          <Bookmarks />
        </TranslationProvider>
      )}
      {settings.includes("calendar") && <Calendar />}
      {settings.includes("theme") && <ThemeSelect />}
    </div>
  );
}
