import { getTranslations } from "next-intl/server";
import { ActionLink } from "@/components/ui";
import { LocaleProps } from "@/lib/types/i18n";
import { route } from "@/utils/route";
import styles from "./Hero.module.scss";

export default async function Hero({ locale }: LocaleProps) {
  const t = await getTranslations({ locale, namespace: "hero" });
  const r = route(locale);

  return (
    <section className={styles.content}>
      <div className={styles.badge}>{t("badge")}</div>

      <h1 className={styles.title}>
        {t("title1")} <br className={styles.brakeTitle} />
        <span>{t("title2")}</span>
      </h1>

      <p className={styles.description}>{t("description")}</p>

      <div className={styles.actions}>
        <ActionLink href={r.household.index} variant="primary">
          {t("action1")}
        </ActionLink>

        <ActionLink href="#demoCalculator" variant="outline">
          {t("action2")}
        </ActionLink>
      </div>
    </section>
  );
}
