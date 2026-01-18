import { getTranslations } from 'next-intl/server';

export default async function TextLangComp({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'common' });

  return (
    <div>
      <h2>{t('confirm')}</h2>
      <p>{t('salary')}</p>
    </div>
  );
}
