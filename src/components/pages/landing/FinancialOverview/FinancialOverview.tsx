import { getTranslations } from 'next-intl/server';
import { ContainerCard } from "@/components/ui";
import { LocaleProps } from "@/lib/types/i18n";
import { demoCategories } from "@/lib/demoCategories";
import styles from "./FinancialOverview.module.scss";

const INCOME = 5000;

export default async function FinancialOverview({ locale }: LocaleProps) {
  const t = await getTranslations({ locale, namespace: "financialOverview" });

  return (
    <ContainerCard>
      
      <article className={styles.top}>
        <div>
          <div className={styles.label}>{t("title")}</div>
          <div className={styles.amount}>${INCOME.toLocaleString()}</div>
          <div className={styles.small}>{t("monthly")}</div>
        </div>
      </article>

      <div className={styles.bars}>
        {demoCategories.map((cat) => {
          const value = (INCOME * cat.percent) / 100;

          return (
            <div key={cat.name} className={styles.row}>
              <div className={styles.rowTop}>
                <span>{cat.name}</span>
                <span>${value.toFixed(0)}</span>
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
      
    </ContainerCard>
  );
}
