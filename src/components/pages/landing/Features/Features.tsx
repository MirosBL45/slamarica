import { getTranslations } from "next-intl/server";
import { LocaleProps } from "@/lib/types/i18n";
import { ContainerCard, SectionHeader, Badge } from "@/components/ui";
import { FEATURES_DATA } from "@/lib/demoConstants";
import styles from "./Features.module.scss";

export default async function Features({ locale }: LocaleProps) {
  const t = await getTranslations({ locale, namespace: "features" });

  return (
    <section className={styles.section}>
      <SectionHeader
        title={t("title")}
        description={t("description")}
        variant="primary"
      />
      <div className={styles.grid}>
        {FEATURES_DATA.map((feat) => {
          const Icon = feat.icon;

          return (
            <ContainerCard key={feat.id}>
              {/* a ako ikada poželiš drugu veličinu, samo prosledi npr. <Icon size="40px" /> */}
              <Badge icon={<Icon />} bgColor={feat.bgColor} hoverBgColor={feat.bgHoverColor} />

              <h3>{t(`items.${feat.id}.title`)}</h3>
              <p>{t(`items.${feat.id}.desc`)}</p>
            </ContainerCard>
          );
        })}
      </div>
    </section>
  );
}
