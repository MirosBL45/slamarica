import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { NextResponse } from "next/server";
import { IMonthlyBudget } from "@/types/budget.types";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { month, pools } = body;

  const client = await clientPromise;
  const db = client.db();

  const household = await db.collection("households").findOne({
    userEmail: session.user.email,
  });

  if (!household) {
    return NextResponse.json({ error: "Household not found" });
  }

  const budgets = (household.monthlyBudgets ?? []) as IMonthlyBudget[];

  const existing = budgets.find((b) => b.month === month);

  if (existing) {
    await db.collection("households").updateOne(
      {
        _id: household._id,
        "monthlyBudgets.month": month,
      },
      {
        $set: {
          "monthlyBudgets.$.pools": pools,
        },
      }
    );
  } else {
    await db.collection("households").updateOne(
      { _id: household._id },
      {
        $push: {
          monthlyBudgets: {
            month,
            pools,
          },
        },
      }
    );
  }

  return NextResponse.json({ success: true });
}
