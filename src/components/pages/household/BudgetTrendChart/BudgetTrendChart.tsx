"use client";
import { useState } from "react";
import { useLocale } from "next-intl";

import { Line } from "@ant-design/plots";
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

const BudgetTrendChart = observer(() => {
  const { monthlyIncomeStore, householdStore } = useStores();
  const locale = useLocale();
  const currency = householdStore.activeHousehold?.currency ?? MoneyCurrency.RSD;
  const [range, setRange] = useState(6); // 3, 6, 12

  const months = monthlyIncomeStore.getLastMonths(range);
  const data: ChartDataItem[] = [];

  const COLORS: Record<BudgetPoolType, string> = {
    [BudgetPoolType.PERSONAL]: "#3f5f5a",
    [BudgetPoolType.BILLS]: "#6f8f8a",
    [BudgetPoolType.TRAVEL]: "#c2a36b",
    [BudgetPoolType.FOOD]: "#9bb5b0",
    [BudgetPoolType.SAVINGS]: "#8c734b",
    [BudgetPoolType.INVESTMENTS]: "#e6d6b3",
  };

  months.forEach((month: string) => {
    const totals = monthlyIncomeStore.getTotalsByMonth(month);
    Object.values(BudgetPoolType).forEach((type) => {
      data.push({
        month,
        value: totals[type] || 0,
        type,
      });
    });
  });

  const config = {
    data,
    xField: "month",
    yField: "value",
    seriesField: "type",
    smooth: true,
    color: (datum: ChartDataItem) => COLORS[datum.type],
    lineStyle: ({ type }: { type: BudgetPoolType }) => ({
      stroke: COLORS[type],
      lineWidth: 2,
    }),
    point: ({ type }: { type: BudgetPoolType }) => ({
      size: 4,
      shape: "circle",
      style: {
        fill: COLORS[type],
        stroke: COLORS[type],
        lineWidth: 2,
      },
    }),
    legend: false,
    tooltip: {
      shared: true,
      showTitle: false,
      formatter: (datum: ChartDataItem) => {
        return {
          name: getLabel(datum.type),
          value: formatCurrency(datum.value, locale, currency),
        };
      },
      domStyles: {
        "g2-tooltip-list-item-value": {
          color: "#000",
          fontWeight: "500",
        },
      },
    },
    itemNameFormatter: (name: string) => getLabel(name as BudgetPoolType),
  };

  return (
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
      <Line {...config} className={styles.chart} />
      <div className={styles.legend}>
        {Object.values(BudgetPoolType).map((type) => (
          <div key={type} className={styles.legendItem}>
            <span className={styles.dot} style={{ background: COLORS[type] }} />
            {getLabel(type)}
          </div>
        ))}
      </div>
    </Card>
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
