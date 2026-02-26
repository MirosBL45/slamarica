import PercentBadge from "../PercentBadge/PercentBadge";
import styles from "./StatCard.module.scss";

interface Props {
  title: string;
  amount: number;
  percent: number;
  color: string;
}

export default function StatCard({ title, amount, percent, color }: Props) {
  return (
    <div className={styles.card}>
      <div>ewuyriuwyriuweyrwiue
        <div className={styles.label}>{title}</div>
        <div className={styles.amount}>{amount.toLocaleString()}</div>
      </div>

      <PercentBadge percent={percent} color={color} />
    </div>
  );
}
