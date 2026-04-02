import { AnchorHTMLAttributes, ReactNode } from "react";
import Link, { LinkProps } from "next/link";

import styles from "./Action.module.scss";

type Variant = "primary" | "outline" | "white";

interface Props extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  variant?: Variant;
  children: ReactNode;
}

export default function ActionLink({ children, variant = "primary", className, ...rest }: Props) {
  return (
    <Link className={`${styles.button} ${styles[variant]} ${className || ""}`} {...rest}>
      {children}
    </Link>
  );
}
