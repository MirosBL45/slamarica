import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import AddMemberForm from "@/components/AddMemberForm";
import CurrencySettings from "@/components/CurrencySettings";
import MemberList from "@/components/MemberList";

const supportedLocales = ["sr", "en", "es", "de"] as const;

type Locale = (typeof supportedLocales)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!supportedLocales.includes(locale as Locale)) {
    notFound();
  }

  const titles: Record<Locale, string> = {
    sr: "Podešavanja domaćinstva | Slamarica",
    en: "Household Settings | Slamarica",
    es: "Configuración del hogar | Slamarica",
    de: "Haushaltseinstellungen | Slamarica",
  };

  const descriptions: Record<Locale, string> = {
    sr: "Upravljajte članovima domaćinstva, dozvolama i pravilima budžeta. Podesite kako funkcioniše raspodela finansija u vašoj porodici.",
    en: "Manage household members, permissions, and budgeting rules. Customize how your family finances work.",
    es: "Gestiona los miembros del hogar, permisos y reglas del presupuesto.",
    de: "Verwalten Sie Haushaltsmitglieder, Berechtigungen und Budgetregeln.",
  };

  return {
    title: titles[locale as Locale],
    description: descriptions[locale as Locale],

    alternates: {
      canonical: `/${locale}/household/settings`,
      languages: {
        sr: "/sr/household/settings",
        en: "/en/household/settings",
        es: "/es/household/settings",
        de: "/de/household/settings",
      },
    },
  };
}

export default async function HouseholdSettings({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "settings",
  });

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{t("title")}</h1>
      <CurrencySettings />
      <AddMemberForm />
      <MemberList />
    </div>
  );
}
