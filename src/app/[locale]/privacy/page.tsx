import { getTranslations } from "next-intl/server";

import { PageProps } from "@/lib/types/i18n";

import styles from "./page.module.scss";

type PrivacyList = {
  title?: string;
  items: string[];
};

type PrivacySection = {
  title: string;
  content?: string[];
  lists?: PrivacyList[];
};

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  const sections = (t.raw("sections") as PrivacySection[]) ?? [];

  return (
    <main className={styles.mainContent}>
      <h1>{t("title")}</h1>

      <p>{t("lastUpdated")}</p>
      <p>{t("intro")}</p>
      <p>{t("description")}</p>

      {sections.map((section, sectionIndex) => (
        <section key={sectionIndex} className={styles.section}>
          <h2>{section.title}</h2>

          {section.content?.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>{paragraph}</p>
          ))}

          {section.lists?.map((list, listIndex) => (
            <div key={listIndex} className={styles.listBlock}>
              {list.title && <p className={styles.listTitle}>{list.title}</p>}

              <ul>
                {list.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </main>
  );
}
