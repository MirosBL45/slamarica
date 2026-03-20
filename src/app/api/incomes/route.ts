import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { IMonthlyIncome } from "@/types/income.types";
import { IMember, MemberStatus } from "@/types/member.types";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { memberId, month, salary, breakdown } = body;

  const client = await clientPromise;
  const db = client.db();

  // const user = await db.collection("users").findOne({
  //   email: session.user.email,
  // });

  const household = await db.collection("households").findOne({
    userEmail: session.user.email,
  });

  // if (!user) {
  //   return NextResponse.json({ error: "User not found" });
  // }

  // const household = await db.collection("households").findOne({
  //   userId: user._id.toString(),
  // });

  if (!household) {
    return NextResponse.json({ error: "Household not found" });
  }

  const member = household.members.find(
    (m: IMember) => m.id === memberId
  );
  if (member?.status === MemberStatus.INACTIVE) {
    return NextResponse.json(
      { error: "Inactive member cannot submit income" },
      { status: 400 },
    );
  }

  const incomes = (household.incomes ?? []) as IMonthlyIncome[];

  const alreadyExists = incomes.some(
    (i: IMonthlyIncome) => i.memberId === memberId && i.month === month,
  );

  if (alreadyExists) {
    return NextResponse.json(
      { error: "Income already exists for this member and month" },
      { status: 400 },
    );
  }

  const income = {
    id: uuidv4(),
    memberId,
    month,
    salary,
    breakdown,
  };

  await db.collection("households").updateOne(
    { _id: household._id },
    {
      $push: { incomes: income },
      ...(household.currencyLocked ? {} : { $set: { currencyLocked: true } }),
    },
  );

  return NextResponse.json(income);
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();

  // const user = await db.collection("users").findOne({
  //   email: session.user.email,
  // });

  const household = await db.collection("households").findOne({
    userEmail: session.user.email,
  });

  // if (!user) {
  //   return NextResponse.json({ error: "User not found" });
  // }

  // const household = await db.collection("households").findOne({
  //   userId: user._id.toString(),
  // });

  if (!household) {
    return NextResponse.json({ error: "Household not found" });
  }

  return NextResponse.json(household.incomes ?? []);
}
