
import { pgTable, serial, text, varchar,integer, boolean, json  } from "drizzle-orm/pg-core";
import { SubscriptIcon } from "lucide-react";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull(),
});
export const UserAnswer=pgTable("userAnswer", {
  id: serial("id").primaryKey(),
   mockIdRef: varchar("mockId").notNull(),
   question:varchar("question").notNull(),
   correctAns:text("correctAns"),
   userAns:text("userAns"),
   feedback:text("feedback"),
   rating:varchar("rating").notNull(),
   userEmail:varchar("userEmail"),
    createdAt: varchar("createdAt"),
});

export const userTable = pgTable('user', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  SubscriptIconId:varchar()
});

export const coursesTable=pgTable("courses",{
  id: serial("id").primaryKey(),
  cid:varchar().notNull(),
  name:varchar(),
  description:varchar(),
  duration:varchar(),
  noofChapters:integer().notNull(),
  includeVedio:boolean().default(false),
  level:varchar().notNull(),
  category:varchar(),
  courseJson:json(),
  courseContent:json().default({}),
  bannerImageUrl:varchar().default(''),
   userEmail:varchar('userEmail').references(()=>userTable.email).notNull()
})
export const enrollCourseTable = pgTable("enrollCourse", {
  id: serial("id").primaryKey(),
  cid: varchar("cid", { length: 255 }).references(() => coursesTable.cid),
  userEmail: varchar("userEmail", { length: 255 }).references(() => userTable.email),
  completedChapters: json("completedChapters"),
});
