import { getTranslations } from "next-intl/server";
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
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      <p className={styles.description}>{t("description1")}</p>
      <p className={styles.description}>{t("description2")}</p>

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
