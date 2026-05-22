"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Select } from "antd";
import { observer } from "mobx-react-lite";

import BudgetDonutChart from "@/components/pages/analytics/BudgetDonutChart/BudgetDonutChart";
import BudgetRadarChart from "@/components/pages/analytics/BudgetRadarChart/BudgetRadarChart";
import CategoryBarChart from "@/components/pages/analytics/CategoryBarChart/CategoryBarChart";
import HouseholdContributionChart from "@/components/pages/analytics/HouseholdContributionChart/HouseholdContributionChart";
import IncomeExpenseChart from "@/components/pages/analytics/IncomeExpenseChart/IncomeExpenseChart";
import SummaryCards from "@/components/pages/analytics/SummaryCards/SummaryCards";
import { useStores } from "@/stores/StoreContext";
import { Locale, LOCALE_FORMAT_MAP } from "@/lib/types/i18n";
import { BudgetPoolType } from "@/types/budget.types";

import styles from "./AnalyticsClient.module.scss";

const AnalyticsClient = observer(() => {
  const { monthlyIncomeStore, householdStore } = useStores();

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

  const trendMonths = monthlyIncomeStore.getLastMonths(4);

  const trendData = useMemo(() => {
    return trendMonths.map((month) => {
      const totals = monthlyIncomeStore.getTotalsByMonth(month);

      const income = monthlyIncomeStore
        .getByMonth(month)
        .reduce((sum, income) => sum + income.salary, 0);

      const spending =
        totals[BudgetPoolType.BILLS] +
        totals[BudgetPoolType.TRAVEL] +
        totals[BudgetPoolType.FOOD] +
        totals[BudgetPoolType.PERSONAL];

      return {
        month: formatMonth(month),

        income,

        spending,
      };
    });
  }, [trendMonths, locale]);

  const donutData = useMemo(() => {
    const total = Object.values(currentMonthTotals).reduce((sum, value) => sum + value, 0);

    return Object.entries(currentMonthTotals).map(([key, value]) => ({
      type: key as BudgetPoolType,

      label: getBudgetLabel(key as BudgetPoolType),

      value,

      percentage: total > 0 ? Number(((value / total) * 100).toFixed(1)) : 0,
    }));
  }, [currentMonthTotals]);

  const categoryData = useMemo(() => {
    const total = Object.values(currentMonthTotals).reduce((sum, value) => sum + value, 0);

    return Object.entries(currentMonthTotals).map(([key, value]) => ({
      type: key as BudgetPoolType,

      label: getBudgetLabel(key as BudgetPoolType),

      value,

      percentage: total > 0 ? Number(((value / total) * 100).toFixed(1)) : 0,
    }));
  }, [currentMonthTotals]);

  const radarData = useMemo(() => {
    return Object.entries(currentMonthTotals).map(([key, value]) => ({
      category: getBudgetLabel(key as BudgetPoolType),

      value,
    }));
  }, [currentMonthTotals]);

  const contributionData = useMemo(() => {
    return currentMonthIncomes.map((income) => {
      const member = householdStore.activeHousehold?.members.find((m) => m.id === income.memberId);

      const value =
        income.breakdown[BudgetPoolType.SAVINGS] + income.breakdown[BudgetPoolType.INVESTMENTS];

      return {
        name: member?.name || "Unknown",

        value,
      };
    });
  }, [currentMonthIncomes, householdStore.activeHousehold]);

  return (
    <section className={styles.page}>
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

      <SummaryCards
        totalIncome={totalIncome}
        incomeDifferencePercent={incomeDifferencePercent}
        biggestExpenseType={biggestExpenseType}
        biggestExpenseValue={biggestExpenseValue}
        totalSpending={totalSpending}
        savingsAndInvestments={savingsAndInvestments}
        personalFund={personalFund}
        getBudgetLabel={getBudgetLabel}
      />

      <div className={styles.secondRow}>
        <div className={styles.lineChartCol}>
          <IncomeExpenseChart trendMonths={trendMonths} trendData={trendData} />
        </div>

        <div className={styles.donutChartCol}>
          <BudgetDonutChart donutData={donutData} />
        </div>
      </div>

      <div className={styles.bottomChartsRow}>
        <div className={styles.categoryChartCol}>
          <CategoryBarChart categoryData={categoryData} />
        </div>

        <div className={styles.radarCol}>
          <BudgetRadarChart radarData={radarData} />
        </div>

        <div className={styles.contributionCol}>
          <HouseholdContributionChart contributionData={contributionData} />
        </div>
      </div>
    </section>
  );
});

export default AnalyticsClient;
