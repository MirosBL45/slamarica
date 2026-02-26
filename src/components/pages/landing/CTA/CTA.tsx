import { getTranslations } from "next-intl/server";
import { LocaleProps } from "@/lib/types/i18n";
import { ActionLink, SectionHeader, ContainerCard } from "@/components/ui";
import styles from "./CTA.module.scss";

export default async function CTA({ locale }: LocaleProps) {
  const t = await getTranslations({ locale, namespace: "cta" });

  return (
    <section className={styles.section}>
      <ContainerCard variant="primary">
        <div className={styles.center}>
        <SectionHeader
          title={t("title")}
          description={t("description")}
          variant="surface"
        />
        <ActionLink href="/login">{t("cta")}</ActionLink>
        </div>
      </ContainerCard>
    </section>
  );
}
