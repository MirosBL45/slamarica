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

import styles from "./HouseholdContributionChart.module.scss";

interface Props {
  contributionData: {
    name: string;
    value: number;
  }[];
}

const COLORS = ["#3f5f5a", "#6f8f8a", "#c2a36b", "#9bb5b0", "#8c734b", "#e6d6b3"];

const HouseholdContributionChart = ({ contributionData }: Props) => {
  const t = useTranslations("analytics");

  return (
    <Card className={styles.chartCard}>
      <div className={styles.cardHeader}>
        <div>
          <h3>{t("householdContribution")}</h3>

          <p>{t("savingsAndInvestmentsByMember")}</p>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart layout="vertical" data={contributionData}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />

            <XAxis type="number" />

            <YAxis type="category" dataKey="name" width={80} />

            <Tooltip
              cursor={false}
              formatter={(value) => [Number(value || 0).toLocaleString(), t("amount")]}
            />

            <Bar dataKey="value" radius={[0, 12, 12, 0]}>
              {contributionData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default HouseholdContributionChart;
