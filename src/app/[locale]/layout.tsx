import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Navbar from '@/components/Navbar';

import '@/styles/globals.scss';

const supportedLocales = ['sr', 'en', 'es', 'de'] as const;

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
    sr: 'Slamarica – Kućni budžet',
    en: 'Slamarica – Household Budget',
    es: 'Slamarica – Presupuesto Familiar',
    de: 'Slamarica – Haushaltsbudget',
  };

  const descriptions: Record<Locale, string> = {
    sr: 'Pametna raspodela kućnog budžeta po članovima.',
    en: 'Smart household budget distribution per member.',
    es: 'Distribución inteligente del presupuesto familiar por miembro.',
    de: 'Intelligente Verteilung des Haushaltsbudgets pro Mitglied.',
  };

  return {
    title: titles[locale as Locale],
    description: descriptions[locale as Locale],
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

  if (!supportedLocales.includes(locale as Locale)) {
    notFound();
  }

  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AntdRegistry>
            <Navbar />
            {children}
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
