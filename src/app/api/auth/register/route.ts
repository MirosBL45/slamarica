import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const client = await clientPromise;
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.collection("users").insertOne({
    email,
    name,
    password: hashedPassword,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true });
}
