"use client";

import { useTranslations } from "next-intl";

import { Card } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { BudgetPoolType } from "@/types/budget.types";

import styles from "./CategoryBarChart.module.scss";

const COLORS: Record<BudgetPoolType, string> = {
  [BudgetPoolType.PERSONAL]: "#3f5f5a",
  [BudgetPoolType.BILLS]: "#6f8f8a",
  [BudgetPoolType.TRAVEL]: "#c2a36b",
  [BudgetPoolType.FOOD]: "#9bb5b0",
  [BudgetPoolType.SAVINGS]: "#8c734b",
  [BudgetPoolType.INVESTMENTS]: "#e6d6b3",
};

interface Props {
  categoryData: {
    type: BudgetPoolType;
    label: string;
    value: number;
    percentage: number;
  }[];
}

const CategoryBarChart = ({ categoryData }: Props) => {
  const t = useTranslations("analytics");

  return (
    <Card className={styles.chartCard}>
      <div className={styles.cardHeader}>
        <div>
          <h3>{t("categoryOverview")}</h3>

          <p>{t("allCategoriesCurrentMonth")}</p>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip
              cursor={false}
              formatter={(value) => [Number(value || 0).toLocaleString(), t("amount")]}
            />

            <Bar dataKey="value" radius={[12, 12, 0, 0]}>
              {categoryData.map((entry) => (
                <Cell key={entry.type} fill={COLORS[entry.type]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CategoryBarChart;
