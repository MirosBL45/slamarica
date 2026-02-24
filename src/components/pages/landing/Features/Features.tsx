import { getTranslations } from "next-intl/server";
import { LocaleProps } from "@/lib/types/i18n";
import { ContainerCard } from "@/components/ui";
import { FEATURES_DATA } from "@/lib/demoConstants";
import styles from "./Features.module.scss";

export default async function Features({ locale }: LocaleProps) {
  const t = await getTranslations({ locale, namespace: "features" });

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{t("title")}</h2>
        <p>{t("description")}</p>
      </div>
      <div className={styles.grid}>
        {FEATURES_DATA.map((f) => (
          <ContainerCard key={f.id}>
            <h3>{t(`items.${f.id}.title`)}</h3>
            <p>{t(`items.${f.id}.desc`)}</p>
          </ContainerCard>
        ))}
      </div>
    </section>
  );
}
