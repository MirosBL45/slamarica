"use client";

import { signIn } from "next-auth/react";
import { useParams } from "next/navigation";

export default function LoginPage() {
  const { locale } = useParams();

  return (
    <div>
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: `/${locale}/dashboard`,
          })
        }
      >
        Login with Google
      </button>

      <p>ispod je ovo drugo dugme</p>

      <button
        onClick={() =>
          signIn("credentials", {
            callbackUrl: `/${locale}/dashboard`,
          })
        }
      >
        Login with Email
      </button>
    </div>
  );
}
