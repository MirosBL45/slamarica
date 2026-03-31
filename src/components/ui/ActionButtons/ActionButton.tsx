"use client";

import { ButtonHTMLAttributes } from "react";

import styles from "./Action.module.scss";

type Variant = "primary" | "outline" | "white";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function ActionButton({ children, variant = "primary", ...rest }: Props) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...rest}>
      {children}
    </button>
  );
}
