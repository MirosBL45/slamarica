export type Locale = "sr" | "en" | "es" | "de";

export interface LocaleProps {
  locale: Locale;
}

export interface PageProps {
  params: Promise<LocaleProps>;
}