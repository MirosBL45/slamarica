"use client";

import styles from "./Features.module.scss";
import { ContainerCard } from "@/components/ui";

const features = [
  {
    title: "Smart Distribution",
    desc: "Automatically split income across customizable categories",
  },
  {
    title: "Track Growth",
    desc: "Watch your savings grow with powerful insights",
  },
  {
    title: "Secure & Private",
    desc: "Your financial data stays protected and encrypted",
  },
];

export default function Features() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Built for modern families</h2>
        <p>Everything you need to manage household finances</p>
      </div>

      <div className={styles.grid}>
        {features.map((f) => (
          <ContainerCard key={f.title}>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </ContainerCard>
        ))}
      </div>
    </section>
  );
}
