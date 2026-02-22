"use client";

import { ButtonHTMLAttributes } from "react";
import styles from "./PrimaryButton.module.scss";

type Variant = "primary" | "outline" | "white";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function PrimaryButton({
  children,
  variant = "primary",
  ...rest
}: Props) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...rest}>
      {children}
    </button>
  );
}
