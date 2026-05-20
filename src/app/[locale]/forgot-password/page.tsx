"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { ActionButton, ActionLink } from "@/components/ui";
import AppInput from "@/components/ui/AppInput/AppInput";
import ContainerCard from "@/components/ui/ContainerCard/ContainerCard";

import styles from "./page.module.scss";

export default function ForgotPasswordPage() {
  const { locale } = useParams<{ locale: string }>();

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleReset() {
    setError("");
    setSuccess("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setSuccess("Check your email for reset link");
  }

  return (
    <div className={styles.page}>
      <ContainerCard className={styles.card}>
        <h1 className={styles.title}>Forgot password</h1>

        <AppInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
        />

        <ActionButton onClick={handleReset} disabled={!email}>
          Send reset link
        </ActionButton>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <ActionLink href={`/${locale}/login`} variant="white">
          Back to login
        </ActionLink>
      </ContainerCard>
    </div>
  );
}
