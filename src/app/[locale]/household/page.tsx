import HouseholdClient from './components/HouseholdClient';
import { getTranslations } from 'next-intl/server';

export default async function HouseholdPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'household' });

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>

      <HouseholdClient />
    </div>
  );
}
