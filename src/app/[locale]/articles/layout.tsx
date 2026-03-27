import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PageProps, Locale, SUPPORTED_LOCALES, getAlternativeLanguages } from "@/lib/types/i18n";

import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;

  // Provera koristi centralizovanu listu
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const titles: Record<Locale, string> = {
    sr: "Saveti o finansijama i kućnom budžetu - Vodiči Slamarica",
    en: "Personal Finance & Budgeting Tips - Slamarica Guides",
    es: "Finanzas personales y presupuesto - Guías Slamarica",
    de: "Persönliche Finanzen & Haushaltsbudget - Slamarica Ratgeber",
  };

  const descriptions: Record<Locale, string> = {
    sr: "Otkrijte praktične vodiče za upravljanje novcem, pametnu štednju i planiranje kućnog budžeta. Naučite kako da preuzmete kontrolu nad troškovima i ostvarite finansijsku slobodu uz Slamaricu.",
    en: "Explore expert guides on money management, smart saving, and household budgeting. Take control of your expenses and reach your financial goals with Slamarica's professional resources.",
    es: "Descubre guías prácticas sobre gestión de dinero, ahorro y presupuesto familiar. Toma el control de tus gastos y alcanza la estabilidad financiera con las herramientas de Slamarica.",
    de: "Praxisnahe Ratgeber für Geldmanagement, Sparen und Haushaltsplanung. Lernen Sie, Ihre Ausgaben effektiv zu kontrollieren und finanzielle Stabilität mit Slamarica zu erreichen.",
  };

  return {
    title: titles[locale as Locale],
    description: descriptions[locale as Locale],

    alternates: {
      canonical: `/${locale}/articles`,
      languages: getAlternativeLanguages("/articles"),
    },
  };
}

export default async function ArticlesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "articlesLayout",
  });

  return (
    <div>
      <header style={{ padding: "1rem" }}>
        <h1>{t("title")}</h1>

        <p>{t("text")}</p>
        <p>
          <Link style={{ color: "green" }} title="Go to main household page" href={`/${locale}`}>
            homepage
          </Link>
        </p>
      </header>

      {children}
    </div>
  );
}
