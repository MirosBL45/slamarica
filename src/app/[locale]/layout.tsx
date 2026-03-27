import { NextIntlClientProvider } from "next-intl";
import Providers from "../providers";
import { notFound } from "next/navigation";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { PageProps, Locale, SUPPORTED_LOCALES, getAlternativeLanguages } from "@/lib/types/i18n";

import "@/styles/globals.scss";
import { Navbar, Footer } from "@/components/layout";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const titles: Record<Locale, string> = {
    sr: "Slamarica - Kućni budžet",
    en: "Slamarica - Household Budget",
    es: "Slamarica - Presupuesto Familiar",
    de: "Slamarica - Haushaltsbudget",
  };

  const descriptions: Record<Locale, string> = {
    sr: "Pametna raspodela kućnog budžeta po članovima. Slamarica je moderna aplikacija za pametno upravljanje kućnim budžetom. Omogućava raspodelu prihoda po članovima, praćenje troškova, štednje i finansijskih ciljeva na jednostavan i pregledan način.",
    en: "Smart household budget distribution per member. Slamarica is a modern app for smart household budget management. It helps you distribute income among members, track expenses, savings, and financial goals in a simple and intuitive way.",
    es: "Distribución inteligente del presupuesto familiar por miembro. Slamarica es una aplicación moderna para la gestión inteligente del presupuesto familiar. Permite distribuir ingresos, seguir gastos, ahorros y objetivos financieros fácilmente.",
    de: "Intelligente Verteilung des Haushaltsbudgets pro Mitglied. Slamarica ist eine moderne App für intelligentes Haushaltsbudget-Management. Sie ermöglicht Einkommensverteilung, Ausgabenverfolgung, Sparziele und Finanzplanung.",
  };

  const keywords: Record<Locale, string[]> = {
    sr: [
      "kućni budžet",
      "finansije",
      "štednja",
      "troškovi",
      "porodični budžet",
      "planiranje finansija",
      "aplikacija za budžet",
    ],
    en: [
      "household budget",
      "finance app",
      "expense tracker",
      "budget planner",
      "family finances",
      "money management",
    ],
    es: ["presupuesto familiar", "finanzas", "control de gastos", "ahorro"],
    de: ["Haushaltsbudget", "Finanzen", "Ausgaben verfolgen", "Sparen"],
  };

  return {
    metadataBase: new URL("https://slamarica.app"),

    title: titles[locale as Locale],
    description: descriptions[locale as Locale],
    keywords: keywords[locale as Locale],

    authors: [{ name: "Miroslav Jović" }],
    creator: "Miroslav Jović",
    publisher: "Miroslav Jović",
    category: "finance",
    applicationName: "Slamarica",

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },

    alternates: {
      canonical: `/${locale}/`,
      languages: getAlternativeLanguages("/"),
    },

    openGraph: {
      title: titles[locale as Locale],
      description: descriptions[locale as Locale],
      url: `https://slamarica.app/${locale}`,
      siteName: "Slamarica",
      locale,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: titles[locale as Locale],
      description: descriptions[locale as Locale],
      creator: "@miroslavjovic",
      images: ["/og-image.png"],
    },

    icons: {
      icon: [{ url: "/favicon.ico" }],
      apple: [{ url: "/favicon.ico" }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AntdRegistry>
              <Navbar />
              {children}
              <Footer />
            </AntdRegistry>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
