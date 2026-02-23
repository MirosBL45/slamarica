"use client";

import { useState } from "react";
import styles from "./Calculator.module.scss";
import { demoCategories } from "@/lib/demoCategories";
import { ContainerCard, PercentBadge } from "@/components/ui";

export default function Calculator() {
  const [income, setIncome] = useState<number>(5000);

  const handleChange = (value: string) => {
    const numeric = Number(value.replace(/[^\d]/g, ""));
    setIncome(numeric);
  };

  return (
    <section className={styles.section} id="demoCalculator">
      <ContainerCard>
        <div className={styles.header}>
          <h2>Try the Calculator</h2>
          <p>
            See how your income can be distributed across smart budget
            categories
          </p>
        </div>

        <div className={styles.inputBlock}>
          <label>Monthly Income</label>
          <input
            value={income}
            onChange={(e) => handleChange(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.grid}>
          {demoCategories.map((cat) => {
            const value = (income * cat.percent) / 100;

            return (
              <div key={cat.name} className={styles.card}>
                <div>
                  <div className={styles.label}>{cat.name}</div>
                  <div className={styles.amount}>${value.toFixed(0)}</div>
                </div>

                <PercentBadge percent={cat.percent} color={cat.color} />
              </div>
            );
          })}
        </div>
      </ContainerCard>
    </section>
  );
}
