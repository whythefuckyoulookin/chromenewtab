export const LANGUAGES = [
  'en', 'ru', 'it'
] as const;

export const MODULES = [
  'bookmarks', 'calendar', 'clock', 'common', 'settings', 'theme-select'
] as const;


export const getTranslations = (mod: typeof MODULES[number]) => {
  const modTranslations = {} as Record<typeof LANGUAGES[number], () => Promise<any>>
  for (const lan of LANGUAGES) {
    modTranslations[lan] = () => import(`@/i18n/translations/${mod}/${lan}.json`)
  }
  return modTranslations
}
