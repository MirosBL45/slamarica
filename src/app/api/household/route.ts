import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { NextResponse } from "next/server";
import { MoneyCurrency } from "@/types/household.types";
import { householdName } from "@/utils/helpers/householdName";

type HouseholdPatchData = {
  currency?: string;
  name?: string;
  currencyLocked?: boolean;
};

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection("users").findOne({
    email: session.user.email,
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" });
  }

  let household = await db.collection("households").findOne({
    userId: user._id.toString(),
  });

  const nameHouse = householdName(session.user.email);

  if (!household) {
    const result = await db.collection("households").insertOne({
      userId: user._id.toString(),
      userEmail: session.user.email,
      name: nameHouse,
      currency: MoneyCurrency.RSD,
      currencyLocked: false,
      members: [],
      incomes: [],
      monthlyBudgets: [],
      createdAt: new Date(),
    });

    household = await db.collection("households").findOne({
      _id: result.insertedId,
    });
  }

  return NextResponse.json(household);
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { currency, name, currencyLocked } = body;

  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection("users").findOne({
    email: session.user.email,
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updateData: HouseholdPatchData = {};

  if (currency) updateData.currency = currency;
  if (name) updateData.name = name;
  if (typeof currencyLocked === "boolean") {
    updateData.currencyLocked = currencyLocked;
  }

  await db
    .collection("households")
    .updateOne({ userId: user._id.toString() }, { $set: updateData });

  return NextResponse.json({ success: true });
}
