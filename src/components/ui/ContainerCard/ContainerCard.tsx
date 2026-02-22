import { ReactNode } from "react";
import styles from "./ContainerCard.module.scss";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ContainerCard({ children, className }: Props) {
  return <div className={`${styles.card} ${className ?? ""}`}>{children}</div>;
}
