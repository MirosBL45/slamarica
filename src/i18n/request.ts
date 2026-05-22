import { getRequestConfig } from "next-intl/server";

import analytics from "./messages/sr/analytics.json";
// ✅ IMPORT ZA TYPE
import articles from "./messages/sr/articles.json";
import articlesLayout from "./messages/sr/articlesLayout.json";
import budget from "./messages/sr/budget.json";
import budgetChart from "./messages/sr/budgetChart.json";
import common from "./messages/sr/common.json";
import cta from "./messages/sr/cta.json";
import features from "./messages/sr/features.json";
import financialOverview from "./messages/sr/financialOverview.json";
import footer from "./messages/sr/footer.json";
import hero from "./messages/sr/hero.json";
import household from "./messages/sr/household.json";
import householdLayout from "./messages/sr/householdLayout.json";
import income from "./messages/sr/income.json";
import incomeTable from "./messages/sr/incomeTable.json";
import login from "./messages/sr/login.json";
import members from "./messages/sr/members.json";
import month from "./messages/sr/month.json";
import navbarLayout from "./messages/sr/navbarLayout.json";
import privacy from "./messages/sr/privacy.json";
import register from "./messages/sr/register.json";
import settings from "./messages/sr/settings.json";
import terms from "./messages/sr/terms.json";
import totals from "./messages/sr/totals.json";

// ✅ TYPE
export type Messages = {
  common: typeof common;
  household: typeof household;
  articles: typeof articles;
  income: typeof income;
  members: typeof members;
  incomeTable: typeof incomeTable;
  totals: typeof totals;
  month: typeof month;
  budget: typeof budget;
  settings: typeof settings;
  householdLayout: typeof householdLayout;
  articlesLayout: typeof articlesLayout;
  hero: typeof hero;
  financialOverview: typeof financialOverview;
  features: typeof features;
  cta: typeof cta;
  navbarLayout: typeof navbarLayout;
  privacy: typeof privacy;
  terms: typeof terms;
  footer: typeof footer;
  login: typeof login;
  register: typeof register;
  budgetChart: typeof budgetChart;
  analytics: typeof analytics;
};

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? "sr";

  return {
    locale: resolvedLocale,
    messages: {
      common: (await import(`./messages/${resolvedLocale}/common.json`)).default,
      household: (await import(`./messages/${resolvedLocale}/household.json`)).default,
      articles: (await import(`./messages/${resolvedLocale}/articles.json`)).default,
      income: (await import(`./messages/${resolvedLocale}/income.json`)).default,
      members: (await import(`./messages/${resolvedLocale}/members.json`)).default,
      incomeTable: (await import(`./messages/${resolvedLocale}/incomeTable.json`)).default,
      totals: (await import(`./messages/${resolvedLocale}/totals.json`)).default,
      month: (await import(`./messages/${resolvedLocale}/month.json`)).default,
      budget: (await import(`./messages/${resolvedLocale}/budget.json`)).default,
      settings: (await import(`./messages/${resolvedLocale}/settings.json`)).default,
      householdLayout: (await import(`./messages/${resolvedLocale}/householdLayout.json`)).default,
      articlesLayout: (await import(`./messages/${resolvedLocale}/articlesLayout.json`)).default,
      hero: (await import(`./messages/${resolvedLocale}/hero.json`)).default,
      financialOverview: (await import(`./messages/${resolvedLocale}/financialOverview.json`))
        .default,
      features: (await import(`./messages/${resolvedLocale}/features.json`)).default,
      cta: (await import(`./messages/${resolvedLocale}/cta.json`)).default,
      navbarLayout: (await import(`./messages/${resolvedLocale}/navbarLayout.json`)).default,
      privacy: (await import(`./messages/${resolvedLocale}/privacy.json`)).default,
      terms: (await import(`./messages/${resolvedLocale}/terms.json`)).default,
      footer: (await import(`./messages/${resolvedLocale}/footer.json`)).default,
      login: (await import(`./messages/${resolvedLocale}/login.json`)).default,
      register: (await import(`./messages/${resolvedLocale}/register.json`)).default,
      budgetChart: (await import(`./messages/${resolvedLocale}/budgetChart.json`)).default,
      analytics: (await import(`./messages/${resolvedLocale}/analytics.json`)).default,
    } as Messages,
  };
});
