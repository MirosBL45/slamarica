import { getTranslations } from "next-intl/server";
import { PageProps } from "@/lib/types/i18n";

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <p>{t("comingSoon")}</p>
    </div>
  );
}
