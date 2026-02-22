"use client";

import ContainerCard from "../ContainerCard/ContainerCard";
import styles from "./FinancialOverview.module.scss";
import { demoCategories } from "@/lib/demoCategories";
import { useState } from "react";

export default function FinancialOverview() {
  const [income, setIncome] = useState(5000);

  return (
    <ContainerCard>
      <div className={styles.top}>
        <div>
          <div className={styles.label}>Financial Overview</div>
          <div className={styles.amount}>${income.toLocaleString()}</div>
          <div className={styles.small}>Monthly Income</div>
        </div>
      </div>

      <div className={styles.bars}>
        {demoCategories.map((cat) => {
          const value = (income * cat.percent) / 100;

          return (
            <div key={cat.name} className={styles.row}>
              <div className={styles.rowTop}>
                <span>{cat.name}</span>
                <span>${value.toFixed(0)}</span>
              </div>

              <div className={styles.bar}>
                <div
                  className={styles.fill}
                  style={{
                    width: `${cat.percent}%`,
                    background: cat.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </ContainerCard>
  );
}
