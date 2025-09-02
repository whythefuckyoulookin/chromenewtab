import { TranslationProvider } from "i18nano";
import { Widget } from "./widget";

const translations = {
  ru: () => import("./i18n/ru.json"),
  en: () => import("./i18n/en.json"),
};

interface CreditsProps {
  language?: string;
}

export function Credits({
  language = navigator.language.split("-")[0],
}: CreditsProps) {
  return (
    <TranslationProvider translations={translations} language={language}>
      <Widget />
    </TranslationProvider>
  );
}
