import { NextResponse } from "next/server";

import crypto from "crypto";
import { Resend } from "resend";

import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  const { email } = await req.json();

  const client = await clientPromise;
  const db = client.db();

  const resend = new Resend(process.env.RESEND_API_KEY);

  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return NextResponse.json({ success: true }); // ne otkrivaj da ne postoji
  }

  const token = crypto.randomBytes(32).toString("hex");

  await db.collection("users").updateOne(
    { email },
    {
      $set: {
        resetToken: token,
        resetTokenExpires: Date.now() + 1000 * 60 * 30, // 30min
      },
    }
  );

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset password",
    html: `
      <p>Klikni da resetuješ lozinku:</p>
      <a href="${process.env.APP_URL}/reset-password?token=${token}">
        Reset password
      </a>
    `,
  });

  return NextResponse.json({ success: true });
}
