import Badge from "../Badge/Badge";

import styles from "./StatCard.module.scss";

interface StatCardProps {
  label: string;
  amount: number;
  percentage: number;
  color: string;
  active?: boolean;
}

export default function StatCard({ label, amount, percentage, color, active }: StatCardProps) {
  return (
    <div className={`${styles.card} ${active ? styles.active : ""}`} style={{ color }}>
      <div>
        <div className={styles.label}>{label}</div>
        <div className={styles.amount}>&euro;{amount.toFixed(0)}</div>
      </div>

      <Badge bgColor={color}>{percentage}%</Badge>
    </div>
  );
}
