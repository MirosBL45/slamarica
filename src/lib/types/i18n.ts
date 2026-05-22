// 1. Definiši niz kao "as const" da bi TS znao tačne vrednosti
export const SUPPORTED_LOCALES = ["sr", "en", "es", "de"] as const;

// 2. Izvuci tip iz niza (dobićeš "sr" | "en" | "es" | "de")
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export interface LocaleProps {
  locale: string;
}

export interface PageProps {
  params: Promise<LocaleProps>;
}

// za alternates u metadata
export const getAlternativeLanguages = (path: string) => {
  return Object.fromEntries(SUPPORTED_LOCALES.map((lang) => [lang, `/${lang}${path}`]));
};

export const LOCALE_FORMAT_MAP: Record<Locale, string> = {
  sr: "sr-Latn-RS",
  en: "en-US",
  de: "de-DE",
  es: "es-ES",
};
