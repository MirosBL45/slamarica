"use client";

import { useTranslations } from "next-intl";

import { Card } from "antd";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { BudgetPoolType } from "@/types/budget.types";

import styles from "./BudgetDonutChart.module.scss";

const COLORS: Record<BudgetPoolType, string> = {
  [BudgetPoolType.PERSONAL]: "#3f5f5a",
  [BudgetPoolType.BILLS]: "#6f8f8a",
  [BudgetPoolType.TRAVEL]: "#c2a36b",
  [BudgetPoolType.FOOD]: "#9bb5b0",
  [BudgetPoolType.SAVINGS]: "#8c734b",
  [BudgetPoolType.INVESTMENTS]: "#e6d6b3",
};

interface Props {
  donutData: {
    type: BudgetPoolType;
    label: string;
    value: number;
    percentage: number;
  }[];
}

const BudgetDonutChart = ({ donutData }: Props) => {
  const t = useTranslations("analytics");

  return (
    <Card className={styles.chartCard}>
      <div className={styles.cardHeader}>
        <div>
          <h3>{t("budgetDistribution")}</h3>

          <p>{t("categoryDistribution")}</p>
        </div>
      </div>

      <div className={styles.chartContent}>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={donutData}
                dataKey="value"
                nameKey="label"
                innerRadius={75}
                outerRadius={110}
                paddingAngle={2}
              >
                {donutData.map((entry) => (
                  <Cell key={entry.type} fill={COLORS[entry.type]} />
                ))}
              </Pie>

              <Tooltip formatter={(value) => Number(value || 0).toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* CUSTOM LEGEND */}
        <div className={styles.legend}>
          {donutData.map((item) => (
            <div key={item.type} className={styles.legendItem}>
              <div className={styles.legendLeft}>
                <span
                  className={styles.dot}
                  style={{
                    background: COLORS[item.type],
                  }}
                />

                <span>{item.label}</span>
              </div>

              <span className={styles.percent}>{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BudgetDonutChart;
