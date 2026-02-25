import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  PageProps,
  Locale,
  SUPPORTED_LOCALES,
  getAlternativeLanguages,
} from "@/lib/types/i18n";

import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;

  // Provera koristi centralizovanu listu
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const titles: Record<Locale, string> = {
    sr: "Kućni budžet - Upravljanje finansijama | Slamarica",
    en: "Household Budget - Manage Your Finances | Slamarica",
    es: "Presupuesto Familiar - Gestiona tus finanzas | Slamarica",
    de: "Haushaltsbudget - Finanzen verwalten | Slamarica",
  };

  const descriptions: Record<Locale, string> = {
    sr: "Organizujte kućne finansije, pratite prihode i troškove, planirajte štednju i finansijske ciljeve. Slamarica vam pomaže da imate potpunu kontrolu nad porodičnim budžetom.",
    en: "Organize your household finances, track income and expenses, plan savings and financial goals. Slamarica helps you stay in full control of your family budget.",
    es: "Organiza las finanzas familiares, controla ingresos y gastos, y planifica el ahorro y tus objetivos financieros.",
    de: "Organisieren Sie Ihre Haushaltsfinanzen, verfolgen Sie Einnahmen und Ausgaben und planen Sie Sparziele.",
  };

  return {
    title: titles[locale as Locale],
    description: descriptions[locale as Locale],

    alternates: {
      canonical: `/${locale}/household`,
      languages: getAlternativeLanguages("/household"),
    },
  };
}

export default async function HouseholdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "householdLayout",
  });

  return (
    <div>
      <header style={{ padding: "1rem" }}>
        <h1>{t("title")}</h1>

        <p>
          {t("text")}{" "}
          <Link
            style={{ color: "green" }}
            title={t("settingsTitle")}
            href={`/${locale}/household/settings`}
          >
            {t("settings")}
          </Link>{" "}
          {t("or")}{" "}
          <Link
            style={{ color: "green" }}
            title={t("mainTitle")}
            href={`/${locale}/household`}
          >
            {t("main")}
          </Link>
          .
        </p>
      </header>

      {children}
    </div>
  );
}
