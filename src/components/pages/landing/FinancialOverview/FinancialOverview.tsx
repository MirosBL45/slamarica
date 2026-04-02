import { getTranslations } from "next-intl/server";

import { ContainerCard } from "@/components/ui";
import { DEMO_CATEGORIES, INCOME } from "@/utils/helpers/demoConstants";
import { LocaleProps } from "@/lib/types/i18n";

import styles from "./FinancialOverview.module.scss";

export default async function FinancialOverview({ locale }: LocaleProps) {
  const t = await getTranslations({ locale, namespace: "financialOverview" });

  return (
    <ContainerCard>
      <article className={styles.top}>
        <div>
          <h3 className={styles.smallTitle}>{t("title")}</h3>
          <p className={styles.amount}>&euro;{INCOME.toLocaleString()}</p>
          <p className={styles.small}>{t("monthly")}</p>
        </div>
      </article>

      <div className={styles.bars}>
        {DEMO_CATEGORIES.map((cat) => {
          const value = (INCOME * cat.percent) / 100;

          return (
            <div key={cat.id} className={styles.row}>
              <div className={styles.rowTop}>
                <span>{t(`categories.${cat.id}`)}</span>
                <span>&euro;{value.toFixed(0)}</span>
              </div>

              <div className={styles.bar}>
                <div
                  className={styles.fill}
                  style={{
                    width: `${cat.percent}%`,
                    background: cat.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p id="demoCalculator" className={styles.helpForScrollToCalculator}>
        help For Scroll To Calculator
      </p>
    </ContainerCard>
  );
}
