import { getTranslations } from "next-intl/server";
import {
  Hero,
  FinancialOverview,
  Calculator,
  Features,
  CTA,
} from "@/components/pages/landing";
import styles from "./page.module.scss";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      <p className={styles.description}>{t("description1")}</p>
      <p className={styles.description}>{t("description2")}</p>

      <main className={styles.mainContent}>
        <Hero locale={locale} />
        <FinancialOverview />
      </main>

      <Calculator />
      <Features />
      <CTA />
    </>
  );
}
