import { getTranslations } from "next-intl/server";
import {
  PageProps,
  Locale,
  SUPPORTED_LOCALES,
  getAlternativeLanguages,
} from "@/lib/types/i18n";

// import { Metadata } from "next";
import { notFound } from "next/navigation";

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  // const l = locale as Locale;

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

    // alternates: {
    //   canonical: `/${locale}/blog`,
    //   languages: {
    //     sr: "/sr/blog",
    //     en: "/en/blog",
    //     es: "/es/blog",
    //     de: "/de/blog",
    //   },
    // },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <p>{t("comingSoon")}</p>
    </div>
  );
}
