import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { NextResponse } from "next/server";
import { MoneyCurrency } from "@/stores/household/household.types";
import { householdName } from "@/utils/helpers/householdName";

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
            name: nameHouse,
            currency: MoneyCurrency.RSD,
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