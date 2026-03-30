import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";

import clientPromise from "@/lib/mongodb";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = uuidv4();

  await db.collection("users").insertOne({
    email,
    name,
    password: hashedPassword,
    emailVerified: false,
    verificationToken,
    createdAt: new Date(),
  });

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `
    <p>Klikni da verifikuješ nalog:</p>
    <a href="${process.env.APP_URL}/api/auth/verify?token=${verificationToken}">
      Verify Email
    </a>
  `,
  });

  return NextResponse.json({ success: true });
}
