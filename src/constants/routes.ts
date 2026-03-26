export const routes = {
  login: "/login",

  household: {
    index: "/household",
    settings: "/household/settings",
    // members: "/household/members",
    // budgets: "/household/budgets",
  },

  articles: "/articles",
  privacy: "/privacy",
  terms: "/terms",
  contact: "/contact",
} as const;
