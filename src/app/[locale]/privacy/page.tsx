import { getTranslations } from "next-intl/server";
import { PageProps } from "@/lib/types/i18n";



export default async function PrivacyPage({ params }: PageProps) {
  
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>

      
    </div>
  );
}