"use client";

import { useTranslations } from "next-intl";

import { Card } from "antd";

import { BudgetPoolType } from "@/types/budget.types";

import styles from "./SummaryCards.module.scss";

interface Props {
  totalIncome: number;
  incomeDifferencePercent: number | null;

  biggestExpenseType: BudgetPoolType;
  biggestExpenseValue: number;
  totalSpending: number;

  savingsAndInvestments: number;
  personalFund: number;

  getBudgetLabel: (type: BudgetPoolType) => string;
}

const SummaryCards = ({
  totalIncome,
  incomeDifferencePercent,
  biggestExpenseType,
  biggestExpenseValue,
  totalSpending,
  savingsAndInvestments,
  personalFund,
  getBudgetLabel,
}: Props) => {
  const t = useTranslations("analytics");

  return (
    <div className={styles.grid}>
      {/* TOTAL INCOME */}
      <Card className={styles.summaryCard}>
        <span>{t("totalIncome")}</span>

        <h2>{totalIncome.toLocaleString()}</h2>

        {incomeDifferencePercent && (
          <p className={incomeDifferencePercent >= 0 ? styles.positive : styles.negative}>
            {incomeDifferencePercent > 0 ? "+" : ""}
            {incomeDifferencePercent}% {t("previousMonth")}
          </p>
        )}
      </Card>

      {/* BIGGEST EXPENSE */}
      <Card className={styles.summaryCard}>
        <span>{t("biggestExpense")}</span>

        <h2>{getBudgetLabel(biggestExpenseType)}</h2>

        <p>
          {biggestExpenseValue.toLocaleString()} {" -> "}
          {totalSpending > 0 ? ((biggestExpenseValue / totalSpending) * 100).toFixed(1) : 0}%
        </p>
      </Card>

      {/* SAVINGS + INVESTMENTS */}
      <Card className={styles.summaryCard}>
        <span>{t("savingAndInvestments")}</span>

        <h2>{savingsAndInvestments.toLocaleString()}</h2>

        <p>
          {totalIncome > 0 ? ((savingsAndInvestments / totalIncome) * 100).toFixed(1) : 0}%{" "}
          {t("ofIncome")}
        </p>
      </Card>

      {/* PERSONAL FUND */}
      <Card className={styles.summaryCard}>
        <span>{t("personalFund")}</span>

        <h2>{personalFund.toLocaleString()}</h2>

        <p>
          {totalIncome > 0 ? ((personalFund / totalIncome) * 100).toFixed(1) : 0}% {t("ofIncome")}
        </p>
      </Card>
    </div>
  );
};

export default SummaryCards;
