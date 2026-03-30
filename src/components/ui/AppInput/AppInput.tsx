"use client";

import { Input } from "antd";
import { InputProps } from "antd";

import styles from "./AppInput.module.scss";

interface Props extends InputProps {
  label?: string;
  type?: "text" | "email" | "number" | "password";
  error?: string;
}

export default function AppInput({ label, type = "text", error, ...rest }: Props) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      {type === "password" ? (
        <Input.Password className={styles.input} {...rest} />
      ) : (
        <Input className={styles.input} type={type} {...rest} />
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
