import styles from "./PercentBadge.module.scss";

interface Props {
  percent: number;
  color: string;
}

export default function PercentBadge({ percent, color }: Props) {
  return (
    <div className={styles.badge} style={{ backgroundColor: color }}>
      {percent}%
    </div>
  );
}
