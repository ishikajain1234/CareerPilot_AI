import { db } from "@/utils/db";
import { userTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name } = body; // ✅ correct destructuring

    // Check if user already exists
    const users = await db.select().from(userTable).where(eq(userTable.email, email));

    if (users.length === 0) {
      const result = await db.insert(userTable).values({ name, email }).returning();
      console.log("User created:", result);
      return NextResponse.json(result[0], { status: 201 });
    }

    // User already exists
    return NextResponse.json(users[0], { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
