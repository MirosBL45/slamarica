"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/Spinner/Spinner";

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
    <div>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <button onClick={handleLogout}>Logout</button>

      <hr />

      <input
        type="email"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        value={password}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleCredentialsLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>

      {error ? <p>{error}</p> : null}
    </div>
  );
}
