"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import styles from "./Header.module.scss";

import { ActionLink } from "@/components/ui";

export default function Header() {
  const t = useTranslations("navbarLayout");
  const { locale } = useParams();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.icon}>✦</div>
          Household
        </div>

        <ActionLink variant="outline" href={`/${locale}/login`}>
          {t("login")}
        </ActionLink>
      </div>
    </header>
  );
}
