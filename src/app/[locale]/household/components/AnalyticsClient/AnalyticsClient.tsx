"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Card, Select } from "antd";
import { observer } from "mobx-react-lite";

import { useStores } from "@/stores/StoreContext";
import { Locale, LOCALE_FORMAT_MAP } from "@/lib/types/i18n";
import { BudgetPoolType } from "@/types/budget.types";

import styles from "./AnalyticsClient.module.scss";

const AnalyticsClient = observer(() => {
  const { monthlyIncomeStore } = useStores();

  const t = useTranslations("analytics");

  const locale = useLocale();

  const months = monthlyIncomeStore.getLastMonths(12);

  const latestMonth = months[months.length - 1];

  const [selectedMonth, setSelectedMonth] = useState(latestMonth);

  const typedLocale = locale as Locale;

  const formatMonth = (month: string) => {
    const [year, monthNumber] = month.split("-");

    return new Intl.DateTimeFormat(LOCALE_FORMAT_MAP[typedLocale], {
      month: "long",
      year: "numeric",
    }).format(new Date(Number(year), Number(monthNumber) - 1));
  };

  // const totalIncome = useMemo(() => {
  //   return monthlyIncomeStore
  //     .getByMonth(selectedMonth)
  //     .reduce((sum, income) => sum + income.salary, 0);
  // }, [selectedMonth]);

  // helpers
  const currentMonthIncomes = monthlyIncomeStore.getByMonth(selectedMonth);

  const currentMonthTotals = monthlyIncomeStore.getTotalsByMonth(selectedMonth);

  const previousMonth = months[months.indexOf(selectedMonth) - 1];

  const previousMonthIncome = previousMonth
    ? monthlyIncomeStore.getByMonth(previousMonth).reduce((sum, income) => sum + income.salary, 0)
    : 0;

  const totalIncome = currentMonthIncomes.reduce((sum, income) => sum + income.salary, 0);

  const totalSpending =
    currentMonthTotals[BudgetPoolType.BILLS] +
    currentMonthTotals[BudgetPoolType.TRAVEL] +
    currentMonthTotals[BudgetPoolType.FOOD] +
    currentMonthTotals[BudgetPoolType.PERSONAL];

  const savingsAndInvestments =
    currentMonthTotals[BudgetPoolType.SAVINGS] + currentMonthTotals[BudgetPoolType.INVESTMENTS];

  const personalFund = currentMonthTotals[BudgetPoolType.PERSONAL];

  const biggestExpenseEntry = Object.entries(currentMonthTotals)
    .filter(([key]) =>
      [
        BudgetPoolType.BILLS,
        BudgetPoolType.TRAVEL,
        BudgetPoolType.FOOD,
        BudgetPoolType.PERSONAL,
      ].includes(key as BudgetPoolType)
    )
    .sort((a, b) => b[1] - a[1])[0];

  const biggestExpenseType = biggestExpenseEntry?.[0] as BudgetPoolType;

  const biggestExpenseValue = biggestExpenseEntry?.[1] || 0;

  const incomeDifferencePercent =
    previousMonthIncome > 0
      ? Number((((totalIncome - previousMonthIncome) / previousMonthIncome) * 100).toFixed(1))
      : null;

  // label helper
  const getBudgetLabel = (type: BudgetPoolType) => {
    switch (type) {
      case BudgetPoolType.PERSONAL:
        return t("personal");

      case BudgetPoolType.BILLS:
        return t("bills");

      case BudgetPoolType.TRAVEL:
        return t("travel");

      case BudgetPoolType.FOOD:
        return t("food");

      case BudgetPoolType.SAVINGS:
        return t("savings");

      case BudgetPoolType.INVESTMENTS:
        return t("investments");

      default:
        return type;
    }
  };

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1>{t("title")}</h1>

          <p>{t("subtitle")}</p>
        </div>

        <Select
          value={selectedMonth}
          onChange={setSelectedMonth}
          className={styles.select}
          options={months.map((month) => ({
            label: formatMonth(month),
            value: month,
          }))}
        />
      </div>

      {/* GRID */}
      <div className={styles.grid}>
        {/* TOTAL INCOME */}
        <Card className={styles.summaryCard}>
          <span>{t("totalIncome")}</span>

          <h2>{totalIncome.toLocaleString()}</h2>

          {incomeDifferencePercent && (
            <p className={Number(incomeDifferencePercent) >= 0 ? styles.positive : styles.negative}>
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
    </div>
  );
});

export default AnalyticsClient;
