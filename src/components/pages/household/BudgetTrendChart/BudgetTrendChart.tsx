"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Column, Pie } from "@ant-design/plots";
import { Card, Segmented, Select, Tabs } from "antd";
import { observer } from "mobx-react-lite";

import { useStores } from "@/stores/StoreContext";
import { formatCurrency } from "@/utils/helpers/formatCurrency";
import { BudgetPoolType } from "@/types/budget.types";
import { MoneyCurrency } from "@/types/household.types";

import styles from "./BudgetTrendChart.module.scss";

const COLORS: Record<BudgetPoolType, string> = {
  [BudgetPoolType.PERSONAL]: "#3f5f5a",
  [BudgetPoolType.BILLS]: "#6f8f8a",
  [BudgetPoolType.TRAVEL]: "#c2a36b",
  [BudgetPoolType.FOOD]: "#9bb5b0",
  [BudgetPoolType.SAVINGS]: "#8c734b",
  [BudgetPoolType.INVESTMENTS]: "#e6d6b3",
};

const BudgetTrendChart = observer(() => {
  const { monthlyIncomeStore, householdStore } = useStores();

  const locale = useLocale();
  const t = useTranslations("budgetChart");

  const currency = householdStore.activeHousehold?.currency ?? MoneyCurrency.RSD;

  const [range, setRange] = useState(6);

  const months = monthlyIncomeStore.getLastMonths(range);

  const [selectedMonth, setSelectedMonth] = useState(months[months.length - 1]);

  const localeMap: Record<string, string> = {
    sr: "sr-Latn-RS",
    en: "en-US",
    de: "de-DE",
    es: "es-ES",
  };

  const formatMonth = (month: string) => {
    const [year, monthNumber] = month.split("-");

    return new Intl.DateTimeFormat(localeMap[locale] || locale, {
      month: "short",
      year: "numeric",
    }).format(new Date(Number(year), Number(monthNumber) - 1));
  };

  const getLabel = (type: BudgetPoolType) => {
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

  const stackedData = useMemo(() => {
    return months.flatMap((month: string) => {
      const totals = monthlyIncomeStore.getTotalsByMonth(month);

      return Object.values(BudgetPoolType).map((type) => ({
        month,
        monthLabel: formatMonth(month),
        type,
        label: getLabel(type),
        value: totals[type] || 0,
      }));
    });
  }, [months, locale]);

  const donutData = useMemo(() => {
    const totals = monthlyIncomeStore.getTotalsByMonth(selectedMonth);

    return Object.values(BudgetPoolType).map((type) => ({
      type,
      label: getLabel(type),
      value: totals[type] || 0,
    }));
  }, [selectedMonth, locale]);

  const getTotalForMonth = (month: string) => {
    const totals = monthlyIncomeStore.getTotalsByMonth(month);

    return Object.values(BudgetPoolType).reduce((sum, type) => {
      return sum + (totals[type] || 0);
    }, 0);
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage < 10) return "#52c41a";

    if (percentage < 20) return "#faad14";

    return "#ff4d4f";
  };

  const stackedConfig = {
    data: stackedData,

    xField: "monthLabel",

    yField: "value",

    seriesField: "label",

    isStack: true,

    colorField: "type",

    color: Object.values(COLORS),

    style: {
      radiusTopLeft: 8,
      radiusTopRight: 8,
    },

    legend: {
      position: "bottom",
    },

    label: false,

    tooltip: {
      formatter: (datum: any) => {
        const total = getTotalForMonth(datum.month);

        const percentage = total ? ((datum.value / total) * 100).toFixed(1) : "0";

        return {
          name: datum.label,

          value: `${formatCurrency(datum.value, locale, currency)} (${percentage}%)`,
        };
      },
    },
  };

  const donutTotal = donutData.reduce((sum, item) => sum + item.value, 0);

  const donutConfig = {
    data: donutData.filter((item) => item.value > 0),

    angleField: "value",

    colorField: "label",

    innerRadius: 0.7,

    colorField: "type",

    color: Object.values(COLORS),

    legend: {
      position: "bottom",
    },

    label: false,

    statistic: {
      title: false,

      content: {
        content: formatCurrency(donutTotal, locale, currency),

        style: {
          fontSize: 18,
          fontWeight: 700,
        },
      },
    },

    tooltip: {
      formatter: (datum: any) => {
        const percentage = donutTotal ? ((datum.value / donutTotal) * 100).toFixed(1) : "0";

        return {
          name: datum.label,

          value: `${formatCurrency(datum.value, locale, currency)} (${percentage}%)`,
        };
      },
    },
  };

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <Tabs
          defaultActiveKey="trend"
          items={[
            {
              key: "trend",

              label: t("trendTab"),

              children: (
                <>
                  <div className={styles.header}>
                    <h3>{t("trendTitle")}</h3>

                    <Segmented
                      options={[
                        { label: "3M", value: 3 },
                        { label: "6M", value: 6 },
                        { label: "12M", value: 12 },
                      ]}
                      value={range}
                      onChange={(val) => setRange(val as number)}
                    />
                  </div>

                  <Column {...stackedConfig} className={styles.chart} />
                </>
              ),
            },

            {
              key: "structure",

              label: t("structureTab"),

              children: (
                <>
                  <div className={styles.header}>
                    <h3>{t("structureTitle")}</h3>

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

                  <Pie {...donutConfig} className={styles.chart} />
                </>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
});

export default BudgetTrendChart;
