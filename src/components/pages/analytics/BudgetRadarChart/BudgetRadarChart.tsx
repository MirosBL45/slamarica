"use client";

import { useTranslations } from "next-intl";

import { Card } from "antd";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import styles from "./BudgetRadarChart.module.scss";

interface Props {
  radarData: {
    category: string;
    value: number;
  }[];
}

const BudgetRadarChart = ({ radarData }: Props) => {
  const t = useTranslations("analytics");

  return (
    <Card className={styles.chartCard}>
      <div className={styles.cardHeader}>
        <div>
          <h3>{t("budgetBalance")}</h3>

          <p>{t("budgetBalanceDescription")}</p>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={340}>
          <RadarChart data={radarData}>
            <PolarGrid />

            <PolarAngleAxis dataKey="category" />

            <Radar dataKey="value" stroke="#3f5f5a" fill="#6f8f8a" fillOpacity={0.5} />

            <Tooltip
              cursor={false}
              formatter={(value) => [Number(value || 0).toLocaleString(), t("amount")]}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default BudgetRadarChart;
