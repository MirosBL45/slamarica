import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { IMember, MemberRole, MemberStatus } from "@/types/member.types";
import { IMonthlyIncome } from "@/types/income.types";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await req.json();

  const client = await clientPromise;
  const db = client.db();

  const household = await db.collection("households").findOne({
    userEmail: session.user.email,
  });

  if (!household) {
    return NextResponse.json({ error: "Household not found" });
  }

  const members = (household.members ?? []) as IMember[];

  const exists = members.some(
    (m: IMember) =>
      typeof m.name === "string" && m.name.toLowerCase() === name.toLowerCase(),
  );

  if (!name || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (exists) {
    return NextResponse.json(
      { error: "Member already exists" },
      { status: 400 },
    );
  }

  // Sprecava Miroslav i miroslav i MIROSLAV

  const member: IMember = {
    id: uuidv4(),
    name,
    role: household.members.length === 0 ? MemberRole.ADMIN : MemberRole.MEMBER,
    status: MemberStatus.ACTIVE,
  };

  await db
    .collection("households")
    .updateOne({ _id: household._id }, { $push: { members: member } });

  return NextResponse.json(member);
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();

  const household = await db.collection("households").findOne({
    userEmail: session.user.email,
  });

  return NextResponse.json(household?.members ?? []);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { memberId } = await req.json();

  const client = await clientPromise;
  const db = client.db();

  const household = await db.collection("households").findOne({
    userEmail: session.user.email,
  });

  const hasIncome = household?.incomes?.some(
    (i: IMonthlyIncome) => i.memberId === memberId,
  );
  if (hasIncome) {
    return NextResponse.json(
      { error: "Cannot delete member with existing incomes" },
      { status: 400 },
    );
  }

  await db
    .collection("households")
    .updateOne(
      { _id: household?._id },
      { $pull: { members: { id: memberId } } },
    );

  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { memberId, status } = await req.json();

  const client = await clientPromise;
  const db = client.db();

  const household = await db.collection("households").findOne({
    userEmail: session.user.email,
  });

  await db.collection("households").updateOne(
    {
      _id: household?._id,
      "members.id": memberId,
    },
    {
      $set: {
        "members.$.status": status,
      },
    },
  );

  return NextResponse.json({ success: true });
}
