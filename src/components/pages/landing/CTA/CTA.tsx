import { getTranslations } from "next-intl/server";

import { ActionLink, ContainerCard, SectionHeader } from "@/components/ui";
import { route } from "@/utils/route";
import { LocaleProps } from "@/lib/types/i18n";

import styles from "./CTA.module.scss";

export default async function CTA({ locale }: LocaleProps) {
  const t = await getTranslations({ locale, namespace: "cta" });
  const r = route(locale);

  return (
    <section className={styles.section}>
      <ContainerCard variant="primary">
        <div className={styles.center}>
          <SectionHeader title={t("title")} description={t("description")} variant="surface" />
          <ActionLink href={r.household.index}>{t("cta")}</ActionLink>
        </div>
      </ContainerCard>
    </section>
  );
}
