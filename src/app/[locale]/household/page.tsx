import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

import { PageProps } from "@/lib/types/i18n";

import { authOptions } from "@/auth/authOptions";

import HouseholdClient from "./components/HouseholdClient";

export default async function HouseholdPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "household" });

  if (!session) {
    redirect(`/${locale}/login`);
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>

      <HouseholdClient />
    </div>
  );
}
