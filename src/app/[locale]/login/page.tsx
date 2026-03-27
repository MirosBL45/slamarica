"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ContainerCard from "@/components/ui/ContainerCard/ContainerCard";
import AppInput from "@/components/ui/AppInput/AppInput";
import { ActionButton, ActionLink } from "@/components/ui";

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

  const handleLogout = async () => {
    await signOut({
      callbackUrl: `/${locale}/login`,
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
        <h1 className={styles.title}>Welcome back</h1>
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

          <div className={styles.row}>
            <label className={styles.checkbox}>
              <input type="checkbox" />
              Remember me
            </label>

            <ActionLink href={`/${locale}/forgot-password`} variant="white">
              Forgot password?
            </ActionLink>
          </div>

          <ActionButton onClick={handleCredentialsLogin} disabled={!email || !password}>
            Sign In
          </ActionButton>

          <ActionButton variant="outline" onClick={handleGoogleLogin}>
            Continue with Google
          </ActionButton>

          {error && <p className={styles.error}>{error}</p>}
        </div>

        <p className={styles.bottomText}>
          Don&apos;t have an account? <span onClick={handleRegister}>Create one</span>
        </p>
      </ContainerCard>

      <ActionLink href={`/${locale}`} variant="white">
        ← Back to home
      </ActionLink>
    </div>
  );
}
