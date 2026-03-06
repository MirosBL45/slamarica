import {
  Hero,
  FinancialOverview,
  Calculator,
  Features,
  CTA,
} from "@/components/pages/landing";
import { PageProps } from "@/lib/types/i18n";
import styles from "./page.module.scss";

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  // FAKE FOR LOADING
  // await new Promise((resolve) => setTimeout(resolve, 1500));

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
