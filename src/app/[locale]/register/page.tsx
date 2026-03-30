"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { ActionButton, ActionLink } from "@/components/ui";
import AppInput from "@/components/ui/AppInput/AppInput";
import ContainerCard from "@/components/ui/ContainerCard/ContainerCard";

import styles from "./page.module.scss";

export default function RegisterPage() {
  const { locale } = useParams<{ locale: string }>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    setError("");
    setSuccess("");

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
      setError(data.error || "Registration failed");
      return;
    }

    setSuccess("Check your email to verify your account");
  };

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <div className={styles.icon}>✦</div>
        <span>Household</span>
      </div>

      <ContainerCard className={styles.card}>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Start managing your household today</p>

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

          <ActionButton onClick={handleRegister} disabled={!email || !password}>
            Create account
          </ActionButton>

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
        </div>

        <p className={styles.bottomText}>
          Already have an account?{" "}
          <ActionLink href={`/${locale}/login`} variant="white">
            Sign in
          </ActionLink>
        </p>
      </ContainerCard>
    </div>
  );
}
