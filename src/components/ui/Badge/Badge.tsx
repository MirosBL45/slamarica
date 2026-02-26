import { ReactNode } from "react";
import styles from "./Badge.module.scss";

interface BadgeProps {
  children?: ReactNode;
  icon?: ReactNode;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  className?: string;
}

export default function Badge({
  children,
  icon,
  bgColor,
  borderColor,
  textColor,
  hoverBgColor,
  className,
}: BadgeProps) {
  return (
    <div
      className={`${styles.badge} ${className ?? ""}`}
      style={
        {
          "--badge-bg": bgColor,
          "--badge-border": borderColor,
          "--badge-text": textColor,
          "--badge-hover": hoverBgColor,
        } as React.CSSProperties
      }
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children && <span>{children}</span>}
    </div>
  );
}
