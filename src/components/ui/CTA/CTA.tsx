"use client";

import styles from "./CTA.module.scss";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import Link from "next/link";

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2>Start building financial clarity today</h2>
        <p>Join families who have taken control of their finances</p>

        <Link href="/login">
          <PrimaryButton>Get Started Free</PrimaryButton>
        </Link>
      </div>
    </section>
  );
}
