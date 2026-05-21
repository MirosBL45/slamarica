"use client";

import { useTranslations } from "next-intl";

import { Card } from "antd";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import styles from "./IncomeExpenseChart.module.scss";

interface Props {
  trendMonths: string[];

  trendData: {
    month: string;
    income: number;
    spending: number;
  }[];
}

const IncomeExpenseChart = ({ trendMonths, trendData }: Props) => {
  const t = useTranslations("analytics");

  return (
    <Card className={styles.chartCard}>
      <div className={styles.cardHeader}>
        <div>
          <h3>{t("incomeVsSpending")}</h3>

          <p>{t("last4Months")}</p>
        </div>
      </div>

      {trendMonths.length < 4 ? (
        <div className={styles.emptyState}>
          <p>{t("notEnoughData")}</p>
        </div>
      ) : (
        <div className={styles.lineChartWrapper}>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip formatter={(value) => Number(value || 0).toLocaleString()} />

              <Legend />

              <Line
                type="monotone"
                dataKey="income"
                stroke="#3f5f5a"
                strokeWidth={3}
                dot={{ r: 5 }}
                name={t("income")}
              />

              <Line
                type="monotone"
                dataKey="spending"
                stroke="#c2a36b"
                strokeWidth={3}
                dot={{ r: 5 }}
                name={t("spending")}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
};

export default IncomeExpenseChart;
