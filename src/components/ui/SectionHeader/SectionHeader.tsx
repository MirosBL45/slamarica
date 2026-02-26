import styles from "./SectionHeader.module.scss";

interface SectionHeaderProps {
  title: string;
  description: string;
  variant?: "primary" | "surface"; // Dodaj ovde nove varijante po potrebi
}

export default function SectionHeader({
  title,
  description,
  variant = "primary",
}: SectionHeaderProps) {
  return (
    <div className={`${styles.header} ${styles[variant]}`}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
