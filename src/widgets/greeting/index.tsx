import { TranslationProvider } from "i18nano";
import { Widget } from "./ui/widget";

const translations = {
  ru: () => import("./i18n/ru.json"),
  en: () => import("./i18n/en.json"),
};

interface GreetingProps {
  language?: string;
}

export function Greeting({
  language = navigator.language.split("-")[0],
}: GreetingProps) {
  return (
    <TranslationProvider translations={translations} language={language}>
      <Widget />
    </TranslationProvider>
  );
}
