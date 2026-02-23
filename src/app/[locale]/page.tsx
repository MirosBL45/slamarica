import styles from "./page.module.scss";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/ui/Hero/Hero";
import FinancialOverview from "@/components/ui/FinancialOverview/FinancialOverview";
import Features from "@/components/ui/Features/Features";
import Calculator from "@/components/ui/Calculator/Calculator";
import CTA from "@/components/ui/CTA/CTA";

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
        <Hero />
        <FinancialOverview />
      </main>

      <Calculator />
      <Features />
      <CTA />
    </>
  );
}
