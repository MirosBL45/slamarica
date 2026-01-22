import styles from './page.module.scss';
import Link from 'next/link';
import { Button } from 'antd';
import { getTranslations } from 'next-intl/server';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <div>
      <h1 className={styles.title}>{t('title')}</h1>

      <p>{t('description1')}</p>
      <p>{t('description2')}</p>

      <Button type="primary">
        <Link href={`/${locale}/household`}>{t('enterApp')}</Link>
      </Button>
    </div>
  );
}
