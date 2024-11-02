import { translations, defaultLang } from "./translations";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in translations) return lang as keyof typeof translations;
  return defaultLang;
}

export function useTranslations(
  lang: keyof typeof translations,
  variable?: string
) {
  if (variable) {
    return function t(key: keyof (typeof translations)[typeof defaultLang]) {
      return (
        // @ts-ignore
        translations[lang][key](variable) ||
        // @ts-ignore
        translations[defaultLang][key](variable)
      );
    };
  }
  return function t(key: keyof (typeof translations)[typeof defaultLang]) {
    return translations[lang][key] || translations[defaultLang][key];
  };
}
