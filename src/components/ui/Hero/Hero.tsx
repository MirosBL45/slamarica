"use client";

import styles from "./Hero.module.scss";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.badge}>Trusted by families worldwide</div>

        <h1 className={styles.title}>
          Financial clarity <br />
          <span>for your household</span>
        </h1>

        <p className={styles.description}>
          Take control of your family finances. Split income into smart
          categories, track savings and build stability.
        </p>

        <div className={styles.actions}>
          <Link href="/login">
            <PrimaryButton>Enter the App</PrimaryButton>
          </Link>

          <PrimaryButton variant="outline">Learn More</PrimaryButton>
        </div>
      </div>
    </section>
  );
}
