// src/utils/route.ts

import { AppRoute } from "@/types/routes.type";

import { routes } from "@/constants/routes";

const withLocale = (locale: string, route: AppRoute) => {
  return `/${locale}${route}`;
};

export const route = (locale: string) => ({
  login: withLocale(locale, routes.login),

  household: {
    index: withLocale(locale, routes.household.index),
    settings: withLocale(locale, routes.household.settings),
    analytics: withLocale(locale, routes.household.analytics),
    // members: withLocale(locale, routes.household.members),
    // budgets: withLocale(locale, routes.household.budgets),
  },

  articles: withLocale(locale, routes.articles),
  privacy: withLocale(locale, routes.privacy),
  terms: withLocale(locale, routes.terms),
  contact: withLocale(locale, routes.contact),
});
