import styles from "./page.module.scss";
import Link from "next/link";
import { Button } from "antd";
import { getTranslations } from "next-intl/server";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import ContainerCard from "@/components/ui/ContainerCard/ContainerCard";
import PercentBadge from "@/components/ui/PercentBadge/PercentBadge";
import { demoCategories } from "@/lib/demoCategories";
import StatCard from "@/components/ui/StatCard/StatCard";
import Header from "@/components/ui/Header/Header";
import Hero from "@/components/ui/Hero/Hero";
import FinancialOverview from "@/components/ui/FinancialOverview/FinancialOverview";
import Features from "@/components/ui/Features/Features";
import Calculator from "@/components/ui/Calculator/Calculator";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <div>
      <Header />
      <h1 className={styles.title}>{t("title")}</h1>

      <p>{t("description1")}</p>
      <p>{t("description2")}</p>
      <div className={styles.heroContainer}>
        <Hero />
        <FinancialOverview />
      </div>
      <Features />
      <Calculator />

      <Button type="primary">
        <Link href={`/${locale}/household`}>{t("enterApp")}</Link>
      </Button>
      <PrimaryButton variant="primary">{t("enterApp")}</PrimaryButton>
      <ContainerCard>
        <p>{t("description1")}</p>
        <p>{t("description2")}</p> <PercentBadge percent={75} color="#4CAF50" />
        {demoCategories.map((category) => (
          <StatCard
            key={category.name}
            title={category.name}
            amount={1000}
            percent={category.percent}
            color={category.color}
          />
        ))}
      </ContainerCard>
    </div>
  );
}
