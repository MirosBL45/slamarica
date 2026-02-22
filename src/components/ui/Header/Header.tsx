"use client";

import styles from "./Header.module.scss";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.icon}>✦</div>
          Household
        </div>

        <Link href="/login">
          <PrimaryButton variant="outline">Sign In</PrimaryButton>
        </Link>
      </div>
    </header>
  );
}
