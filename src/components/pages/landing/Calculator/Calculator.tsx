"use client";

import { useState } from "react";
import styles from "./Calculator.module.scss";
import { DEMO_CATEGORIES, INCOME } from "@/lib/demoConstants";
import { ContainerCard, PercentBadge } from "@/components/ui";
import { useTranslations } from "next-intl";

export default function Calculator() {
  const [income, setIncome] = useState<number>(INCOME);
  const t = useTranslations("financialOverview");

  const handleChange = (value: string) => {
    const numeric = Number(value.replace(/[^\d]/g, ""));
    setIncome(numeric);
  };

  return (
    <section className={styles.section}>
      <ContainerCard>
        <div className={styles.header}>
          <h2>{t("calculator")}</h2>
          <p>{t("income")}</p>
        </div>

        <div className={styles.inputBlock}>
          <label>{t("monthly")}</label>
          <input
            type="number"
            inputMode="numeric"
            value={income === 0 ? "" : income}
            onChange={(e) => handleChange(e.target.value)}
            className={styles.input}
            placeholder={t("placeholder")}
          />
        </div>

        <div className={styles.grid}>
          {DEMO_CATEGORIES.map((cat) => {
            const value = (income * cat.percent) / 100;

            return (
              <div key={cat.id} className={styles.card}>
                <div>
                  <div className={styles.label}>
                    {t(`categories.${cat.id}`)}
                  </div>
                  <div className={styles.amount}>&euro;{value.toFixed(0)}</div>
                </div>

                <PercentBadge percent={cat.percent} color={cat.color} />
              </div>
            );
          })}
        </div>
      </ContainerCard>
    </section>
  );
}
