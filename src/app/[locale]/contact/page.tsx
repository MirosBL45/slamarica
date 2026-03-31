import { getTranslations } from "next-intl/server";

import { PageProps } from "@/lib/types/i18n";

import styles from "./page.module.scss";

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <main className={styles.mainContent}>
      <h1>{t("title")}</h1>
      <h2>Contact Page</h2>

      <p>{t("lastUpdated")}</p>
      <p>{t("intro")}</p>
      <p>{t("description")}</p>
      <form action="">
        <input type="text" />
        <input type="text" />
        <input type="email" name="" id="" />
        <button type="submit">Proba samo</button>
      </form>
    </main>
  );
}
