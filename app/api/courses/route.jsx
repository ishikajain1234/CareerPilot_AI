import { db } from "@/utils/db";
import { coursesTable } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq, ne } from "drizzle-orm";
import { NextResponse } from "next/server";
 
export async function GET(req){
      const {searchParams}=new URL(req.url);

      const user =await currentUser();
      const courseId=searchParams?.get('courseId');
      if(courseId==0){
            const result=await db.select().from(coursesTable).where(ne(coursesTable.courseContent,{}));
      console.log(result);
      }
      if(courseId){
const result=await db.select().from(coursesTable).where(eq(coursesTable.cid,courseId));
      console.log(result);
      return NextResponse.json(result[0]);
      }
      else{
            const result=await db.select().from(coursesTable).where(eq(coursesTable.userEmail,user.primaryEmailAddress?.emailAddress)).orderBy((desc(coursesTable.id)));
      console.log(result);
      return NextResponse.json(result);
      }
      
}