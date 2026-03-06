import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { redirect } from "next/navigation";

import HouseholdClient from "./components/HouseholdClient";
import { getTranslations } from "next-intl/server";
import { PageProps } from "@/lib/types/i18n";

export default async function HouseholdPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "household" });

  if (!session) {
    redirect(`/${locale}/login`);
  }

  // FAKE FOR LOADING
  // await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>

      <HouseholdClient />
    </div>
  );
}
