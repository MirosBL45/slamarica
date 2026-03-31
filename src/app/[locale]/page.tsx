import { Calculator, CTA, Features, FinancialOverview, Hero } from "@/components/pages/landing";
import { PageProps } from "@/lib/types/i18n";

import styles from "./page.module.scss";

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <main className={styles.mainContent}>
        <Hero locale={locale} />
        <FinancialOverview locale={locale} />
      </main>

      <Calculator />
      <Features locale={locale} />
      <CTA locale={locale} />
    </>
  );
}
