// src/utils/route.ts

import { routes } from "@/constants/routes";
import { AppRoute } from "@/types/routes.type";

const withLocale = (locale: string, route: AppRoute) => {
  return `/${locale}${route}`;
};

export const route = (locale: string) => ({
  login: withLocale(locale, routes.login),

  household: {
    index: withLocale(locale, routes.household.index),
    settings: withLocale(locale, routes.household.settings),
    // members: withLocale(locale, routes.household.members),
    // budgets: withLocale(locale, routes.household.budgets),
  },

  articles: withLocale(locale, routes.articles),
  privacy: withLocale(locale, routes.privacy),
  terms: withLocale(locale, routes.terms),
  contact: withLocale(locale, routes.contact),
});
