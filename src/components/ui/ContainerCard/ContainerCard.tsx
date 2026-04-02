import { ReactNode } from "react";

import styles from "./ContainerCard.module.scss";

interface Props {
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary"; // Dodajemo opcije za varijante
}

export default function ContainerCard({ children, className = "", variant = "default" }: Props) {
  // Spajamo osnovnu klasu, opcionu varijantu i eksterni className
  const cardClasses = [styles.card, variant === "primary" ? styles.primaryGradient : "", className]
    .join(" ")
    .trim();

  return <div className={cardClasses}>{children}</div>;
}
