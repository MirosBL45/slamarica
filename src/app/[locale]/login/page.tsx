"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { GoogleOutlined } from "@ant-design/icons";

import { ActionButton } from "@/components/ui";
import AppInput from "@/components/ui/AppInput/AppInput";
import ContainerCard from "@/components/ui/ContainerCard/ContainerCard";
import Spinner from "@/components/ui/Spinner/Spinner";

import styles from "./page.module.scss";

export default function LoginPage() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const { status } = useSession();

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

  const handleRegister = async () => {
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name: email.split("@")[0],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Greška pri registraciji");
      return;
    }

    setError("Proveri email i klikni na link za verifikaciju");
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
        <h1 className={styles.title}>Welcome</h1>
        <p className={styles.subtitle}>Sign in to your household account</p>

        <div className={styles.form}>
          <AppInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />

          <AppInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <ActionButton onClick={handleCredentialsLogin} disabled={!email || !password}>
            Sign In
          </ActionButton>

          <div className={styles.row}>
            <Link href={`/${locale}/forgot-password`}>Forgot password?</Link>
          </div>

          <ActionButton variant="outline" onClick={handleGoogleLogin}>
            <span className={styles.googleText}>Continue with Google</span>
            <GoogleOutlined className={styles.googleIcon} />
          </ActionButton>

          {error && <p className={styles.error}>{error}</p>}
        </div>

        <p className={styles.bottomText}>
          Don&apos;t have an account? <span onClick={handleRegister}>Create one</span>
        </p>
      </ContainerCard>
    </div>
  );
}
