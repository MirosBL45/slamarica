"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error);
      return;
    }

    setMessage("Password changed");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <div>
      <h1>Set new password</h1>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleReset}>Reset</button>
      {message && <p>{message}</p>}
    </div>
  );
}
