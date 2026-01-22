import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Navbar from '@/components/Navbar';

import '@/styles/globals.scss';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    sr: 'Slamarica – Kućni budžet',
    en: 'Slamarica – Household Budget',
  };

  const descriptions = {
    sr: 'Pametna raspodela kućnog budžeta po članovima.',
    en: 'Smart household budget distribution per member.',
  };

  return {
    title: titles[locale as 'sr' | 'en'],
    description: descriptions[locale as 'sr' | 'en'],
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

  if (!['sr', 'en'].includes(locale)) {
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
