export const routes = {
  login: "/login",

  household: {
    index: "/household",
    settings: "/household/settings",
    analytics: "/household/analytics",
    // budgets: "/household/budgets",
  },

  articles: "/articles",
  privacy: "/privacy",
  terms: "/terms",
  contact: "/contact",
} as const;
