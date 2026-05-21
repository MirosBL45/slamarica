"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Card, Select } from "antd";
import { observer } from "mobx-react-lite";

import { useStores } from "@/stores/StoreContext";
import { Locale, LOCALE_FORMAT_MAP } from "@/lib/types/i18n";

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

  const totalIncome = useMemo(() => {
    return monthlyIncomeStore
      .getByMonth(selectedMonth)
      .reduce((sum, income) => sum + income.salary, 0);
  }, [selectedMonth]);

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
        <Card className={styles.summaryCard}>
          <span>{t("totalIncome")}</span>

          <h2>{totalIncome.toLocaleString()}</h2>
        </Card>

        <Card className={styles.summaryCard}>
          <span>{t("biggestExpense")}</span>

          <h2>Hrana</h2>
        </Card>

        <Card className={styles.summaryCard}>
          <span>{t("savingAndInvestments")}</span>

          <h2>0</h2>
        </Card>

        <Card className={styles.summaryCard}>
          <span>{t("personalFund")}</span>

          <h2>0</h2>
        </Card>
      </div>
    </div>
  );
});

export default AnalyticsClient;
