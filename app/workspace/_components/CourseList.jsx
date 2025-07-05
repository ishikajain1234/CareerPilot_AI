"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddNewCourseDialog from "./AddNewCourseDialog";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./CourseCard";

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const { user } = useUser();

  const GetCourseList = async () => {
    try {
      const result = await axios.get("/api/courses");
      console.log("Fetched courses:", result.data);
      setCourseList(result.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (user) {
      GetCourseList(); // ✅ make sure to call the function
    }
  }, [user]);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
        <BookOpen className="w-8 h-8 text-indigo-600" />
        Course List
      </h2>

      {courseList.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-gray-50 p-10 rounded-xl shadow-inner">
          <Image
            src="/online.webp"
            alt="No courses"
            width={200}
            height={200}
            className="rounded-md"
          />
          <p className="text-lg text-gray-500 mt-4">
            No courses available at the moment.
          </p>
          <AddNewCourseDialog>
            <Button className="mt-4">+ Create Your First Course</Button>
          </AddNewCourseDialog>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList.map((course, index) => (
            <CourseCard  key={course.cid} course={course}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
