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
    sr: "Saveti o finansijama i kućnom budžetu - Blog Slamarica",
    en: "Personal Finance & Budgeting Tips - Blog Slamarica",
    es: "Finanzas personales y presupuesto - Blog Slamarica",
    de: "Persönliche Finanzen & Haushaltsbudget - Blog Slamarica",
  };

  const descriptions: Record<Locale, string> = {
    sr: "Čitajte najnovije savete o upravljanju novcem, štednji, planiranju kućnog budžeta i finansijskoj stabilnosti. Naučite kako da bolje kontrolišete troškove i ostvarite svoje finansijske ciljeve.",
    en: "Read the latest tips on money management, saving, household budgeting, and financial stability. Learn how to control expenses and achieve your financial goals.",
    es: "Lee los mejores consejos sobre gestión del dinero, ahorro y presupuesto familiar para mejorar tu estabilidad financiera.",
    de: "Lesen Sie aktuelle Tipps zu Geldmanagement, Sparen und Haushaltsbudget, um Ihre finanzielle Stabilität zu verbessern.",
  };

  return {
    title: titles[locale as Locale],
    description: descriptions[locale as Locale],

    alternates: {
      canonical: `/${locale}/blog`,
      languages: getAlternativeLanguages("/blog"),
    },
  };
}

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "blogLayout",
  });

  return (
    <div>
      <header style={{ padding: "1rem" }}>
        <h1>{t("title")}</h1>

        <p>{t("text")}</p>
        <p>
          <Link
            style={{ color: "green" }}
            title="Go to main household page"
            href={`/${locale}`}
          >
            homepage
          </Link>
        </p>
      </header>

      {children}
    </div>
  );
}
