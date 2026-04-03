"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

import { DualAxes } from "@ant-design/plots";
import { Card, Segmented } from "antd";
import { observer } from "mobx-react-lite";

import { useStores } from "@/stores/StoreContext";
import { formatCurrency } from "@/utils/helpers/formatCurrency";
import { BudgetPoolType } from "@/types/budget.types";
import { MoneyCurrency } from "@/types/household.types";

import styles from "./BudgetTrendChart.module.scss";

type ChartDataItem = {
  month: string;
  value: number;
  type: BudgetPoolType;
};

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
  const currency = householdStore.activeHousehold?.currency ?? MoneyCurrency.RSD;

  const [range, setRange] = useState(3);

  // 🔥 kontrola koje linije su vidljive
  const [visibleTypes, setVisibleTypes] = useState<BudgetPoolType[]>(Object.values(BudgetPoolType));

  const months = monthlyIncomeStore.getLastMonths(range);
  const data: ChartDataItem[] = [];

  months.forEach((month: string) => {
    const totals = monthlyIncomeStore.getTotalsByMonth(month);

    Object.values(BudgetPoolType).forEach((type) => {
      if (visibleTypes.includes(type)) {
        data.push({
          month,
          value: totals[type] || 0,
          type,
        });
      }
    });
  });

  // 🔥 total po mesecu (za tooltip)
  const getTotalForMonth = (month: string) => {
    const totals = monthlyIncomeStore.getTotalsByMonth(month);
    return Object.values(BudgetPoolType).reduce((sum, type) => sum + (totals[type] || 0), 0);
  };

  const config = {
    xField: "month",

    axis: {
      y: {
        labelFormatter: (v: number) => formatCurrency(v, locale, currency),
      },
    },

    scale: {
      color: {
        range: Object.values(COLORS),
      },
    },

    children: [
      {
        type: "area",
        data,
        yField: "value",
        colorField: "type",
        shapeField: "smooth",
        style: {
          fillOpacity: 0.15,
        },
        // axis: false, // 🔥 gasi dodatnu osu
      },
      {
        type: "line",
        data,
        yField: "value",
        colorField: "type",
        shapeField: "smooth",
        style: {
          lineWidth: 2,
        },
        axis: false, // 🔥 gasi dodatnu osu
      },
      {
        type: "point",
        data,
        yField: "value",
        colorField: "type",
        sizeField: 4,
        shapeField: "point",
        axis: false, // 🔥 gasi dodatnu osu
        tooltip: false,
      },
    ],

    tooltip: {
      shared: true,
      title: (datum: ChartDataItem) => {
        const total = getTotalForMonth(datum.month);
        return `${datum.month} — Ukupno: ${formatCurrency(total, locale, currency)}`;
      },
      items: (datum: ChartDataItem) => ({
        name: getLabel(datum.type),
        value: formatCurrency(datum.value, locale, currency),
      }),
    },

    legend: false,
  };

  const toggleType = (type: BudgetPoolType) => {
    setVisibleTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <h3>Pregled po kategorijama</h3>

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

        <DualAxes {...config} className={styles.chart} />

        {/* 🔥 INTERAKTIVNA LEGENDA */}
        <div className={styles.legend}>
          {Object.values(BudgetPoolType).map((type) => {
            const isActive = visibleTypes.includes(type);

            return (
              <div
                key={type}
                className={`${styles.legendItem} ${!isActive ? styles.inactive : ""}`}
                onClick={() => toggleType(type)}
              >
                <span className={styles.dot} style={{ background: COLORS[type] }} />
                {getLabel(type)}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
});

export default BudgetTrendChart;

const getLabel = (type: BudgetPoolType | string) => {
  switch (type) {
    case BudgetPoolType.PERSONAL:
      return "Lični";
    case BudgetPoolType.BILLS:
      return "Računi";
    case BudgetPoolType.TRAVEL:
      return "Putovanja";
    case BudgetPoolType.FOOD:
      return "Hrana";
    case BudgetPoolType.SAVINGS:
      return "Štednja";
    case BudgetPoolType.INVESTMENTS:
      return "Investicije";
    default:
      return type;
  }
};
