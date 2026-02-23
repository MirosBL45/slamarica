import styles from "./Header.module.scss";

import { ActionLink } from "@/components/ui";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.icon}>✦</div>
          Household
        </div>

        <ActionLink variant="outline" href="/login">
          Sign In
        </ActionLink>
      </div>
    </header>
  );
}
