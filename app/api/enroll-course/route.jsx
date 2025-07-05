import { db } from "@/utils/db";
import { coursesTable, enrollCourseTable } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId } = await req.json();
  const user = await currentUser();

  if (!user || !user.primaryEmailAddress?.emailAddress) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = user.primaryEmailAddress.emailAddress;

  // ✅ FIX 1: Corrected "where" to use enrollCourseTable
  const enrollCourses = await db
    .select()
    .from(enrollCourseTable)
    .where(
      and(
        eq(enrollCourseTable.userEmail, userEmail),
        eq(enrollCourseTable.cid, courseId)
      )
    );

  if (enrollCourses.length === 0) {
    // ✅ FIX 2: Typo in "enrollCourseTable"
    const result = await db
      .insert(enrollCourseTable)
      .values({
        cid: courseId,
        userEmail: userEmail,
      })
      .returning();

    return NextResponse.json(result);
  }

  return NextResponse.json({ resp: "Already Enrolled" });
}


export async function GET(req){
  const user=await currentUser();

   const {searchParams}=new URL(req.url);

      
      const courseId=searchParams?.get('courseId');
      if(courseId){
              const result=await db.select().from(coursesTable)
  .innerJoin(enrollCourseTable,eq(coursesTable.cid,enrollCourseTable.cid))
  .where(and(eq(enrollCourseTable.userEmail,user?.primaryEmailAddress.emailAddress),eq(enrollCourseTable.cid,courseId)))
      return NextResponse.json(result[0]);
      }
      else{
             const result=await db.select().from(coursesTable)
  .innerJoin(enrollCourseTable,eq(coursesTable.cid,enrollCourseTable.cid))
  .where(eq(enrollCourseTable.userEmail,user?.primaryEmailAddress.emailAddress))
  .orderBy(desc(enrollCourseTable.id));
  return NextResponse.json(result);
      }
 
}


export async function PUT(req) {
  const { completedChapters, courseId } = await req.json();
  const user = await currentUser();

  // 1. Get existing enrollment record
  const existing = await db
    .select()
    .from(enrollCourseTable)
    .where(
      and(
        eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress),
        eq(enrollCourseTable.cid, courseId)
      )
    );

  if (!existing || existing.length === 0) {
    return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
  }

  const currentChapters = existing[0].completedChapters ?? [];

  // 2. Merge existing + new chapters, removing duplicates
  const updatedChapters = Array.from(new Set([...currentChapters, ...completedChapters]));

  // 3. Update the database with merged chapters
  const result = await db
    .update(enrollCourseTable)
    .set({ completedChapters: updatedChapters })
    .where(
      and(
        eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress),
        eq(enrollCourseTable.cid, courseId)
      )
    )
    .returning(enrollCourseTable);

  return NextResponse.json(result);
}
