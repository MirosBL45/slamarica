import { getTranslations } from 'next-intl/server';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <p>{t('comingSoon')}</p>
    </div>
  );
}
