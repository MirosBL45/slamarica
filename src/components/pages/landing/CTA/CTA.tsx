import styles from "./CTA.module.scss";

import { ActionLink } from "@/components/ui";

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2>Start building financial clarity today</h2>
        <p>Join families who have taken control of their finances</p>

        <ActionLink href="/login">Get Started Free</ActionLink>
      </div>
    </section>
  );
}
