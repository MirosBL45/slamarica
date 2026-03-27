import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection("users").findOne({
    verificationToken: token,
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  await db.collection("users").updateOne(
    { _id: user._id },
    {
      $set: { emailVerified: true },
      $unset: { verificationToken: "" },
    }
  );

  return NextResponse.redirect(`${process.env.APP_URL}/login`);
}
