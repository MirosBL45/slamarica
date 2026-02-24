import { getTranslations } from "next-intl/server";
import { LocaleProps } from "@/lib/types/i18n";
import styles from "./CTA.module.scss";

import { ActionLink } from "@/components/ui";

export default async function CTA({ locale }: LocaleProps) {
  const t = await getTranslations({ locale, namespace: "cta" });

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2>{t("title")}</h2>
        <p>{t("description")}</p>

        <ActionLink href="/login">{t("cta")}</ActionLink>
      </div>
    </section>
  );
}
