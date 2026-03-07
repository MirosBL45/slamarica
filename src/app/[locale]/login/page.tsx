"use client";

import { signIn } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { locale } = useParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    signIn("credentials", {
      email,
      password,
      callbackUrl: `/${locale}/household`,
    });
  };

  return (
    <div>
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: `/${locale}/household`,
          })
        }
      >
        Login with Google
      </button>

      <hr />

      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={() =>
          signIn("credentials", {
            email,
            password,
            callbackUrl: `/${locale}/household`,
          })
        }
      >
        Login
      </button>

      <button onClick={register}>Register</button>
    </div>
  );
}
