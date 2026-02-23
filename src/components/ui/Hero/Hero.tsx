import styles from "./Hero.module.scss";
import PrimaryLink from "../PrimaryButton/PrimaryLink";

export default function Hero() {
  return (
    <section className={styles.content}>
      <div className={styles.badge}>Trusted by families worldwide</div>

      <h1 className={styles.title}>
        Financial clarity
        <br />
        <span>for your household</span>
      </h1>

      <p className={styles.description}>
        Take control of your family finances. Split income into smart
        categories, track savings and build stability.
      </p>

      <div className={styles.actions}>
        <PrimaryLink href="/login" variant="primary">
          Enter the App
        </PrimaryLink>

        <PrimaryLink href="#demoCalculator" variant="outline">
          Learn More
        </PrimaryLink>
      </div>
    </section>
  );
}
