import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

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
  namespace: 'householdLayout',
});

  return (
    <div>
      <header style={{ padding: '1rem' }}>
        <h1>{t('title')}</h1>

        <p>
          {t('text')}{' '}
          <Link
            title={t('settingsTitle')}
            href={`/${locale}/household/settings`}
          >
            {t('settings')}
          </Link>{' '}
          {t('or')}{' '}
          <Link
            title={t('mainTitle')}
            href={`/${locale}/household`}
          >
            {t('main')}
          </Link>
          .
        </p>
      </header>

      {children}
    </div>
  );
}
