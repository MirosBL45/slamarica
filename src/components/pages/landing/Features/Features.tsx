import { getTranslations } from "next-intl/server";
import { LocaleProps } from "@/lib/types/i18n";
import { ContainerCard, SectionHeader, Badge } from "@/components/ui";
import { FEATURES_DATA } from "@/utils/helpers/demoConstants";
import styles from "./Features.module.scss";

export default async function Features({ locale }: LocaleProps) {
  const t = await getTranslations({ locale, namespace: "features" });

  return (
    <section className={styles.section}>
      <SectionHeader title={t("title")} description={t("description")} variant="primary" />
      <div className={styles.grid}>
        {FEATURES_DATA.map((feat) => {
          const Icon = feat.icon;

          return (
            <ContainerCard key={feat.id}>
              <div className={styles.featuresItem}>
                {/* npr. <Icon size="40px" /> */}
                <Badge icon={<Icon />} bgColor={feat.bgColor} hoverBgColor={feat.bgHoverColor} />
                <h3>{t(`items.${feat.id}.title`)}</h3>
                <p>{t(`items.${feat.id}.desc`)}</p>
              </div>
            </ContainerCard>
          );
        })}
      </div>
    </section>
  );
}
