"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { GoogleOutlined } from "@ant-design/icons";

import { ActionButton, ActionLink } from "@/components/ui";
import AppInput from "@/components/ui/AppInput/AppInput";
import ContainerCard from "@/components/ui/ContainerCard/ContainerCard";
import Spinner from "@/components/ui/Spinner/Spinner";

import styles from "./page.module.scss";

export default function LoginPage() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const { status } = useSession();

  const t = useTranslations("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(`/${locale}/household`);
    }
  }, [status, locale, router]);

  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: `/${locale}/household`,
    });
  };

  const handleCredentialsLogin = async () => {
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Pogrešan email ili lozinka");
      return;
    }

    router.push(`/${locale}/household`);
  };

  if (status === "loading") {
    return <Spinner text="Loging loading..." />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <div className={styles.icon}>✦</div>
        <span>Household</span>
      </div>

      <ContainerCard className={styles.card}>
        <h1 className={styles.title}>{t("welcome")}</h1>
        <p className={styles.subtitle}>{t("siginText")}</p>

        <div className={styles.form}>
          <AppInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mike@email.com"
          />

          <AppInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="***&&&***++##@@"
          />

          <ActionButton onClick={handleCredentialsLogin} disabled={!email || !password}>
            {t("siginButton")}
          </ActionButton>

          <div className={styles.row}>
            <Link href={`/${locale}/forgot-password`}>{t("forgot")}</Link>
          </div>

          <ActionButton variant="outline" onClick={handleGoogleLogin}>
            <span className={styles.googleText}>{t("google")}</span>
            <GoogleOutlined className={styles.googleIcon} />
          </ActionButton>

          {error && <p className={styles.error}>{error}</p>}
        </div>

        <ActionLink href={`/${locale}/register`} variant="white">
          {t("noAccount")}
        </ActionLink>
      </ContainerCard>
    </div>
  );
}
