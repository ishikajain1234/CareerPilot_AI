import { db } from "@/utils/db";
import { coursesTable } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq, ne } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const user = await currentUser();
    const courseId = searchParams.get("courseId");

    if (courseId === "0") {
      // Case: courseId = 0 — return all non-empty courses
      const result = await db
        .select()
        .from(coursesTable)
        .where(ne(coursesTable.courseContent, {}));
      console.log(result);
      return NextResponse.json(result);
    }

    if (courseId) {
      // Case: specific course by ID
      const result = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.cid, courseId));

      if (!result || result.length === 0) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
      }

      console.log(result);
      return NextResponse.json(result[0]);
    }

    // Default case: return courses by user
    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.userEmail, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(coursesTable.id));

    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Error in GET /api/courses:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
