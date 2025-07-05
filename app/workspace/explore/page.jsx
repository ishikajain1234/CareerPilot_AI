"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, BookOpen } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";


import axios from "axios";
import { useUser } from "@clerk/nextjs";

import AddNewCourseDialog from "../_components/AddNewCourseDialog";
import CourseCard from "../_components/CourseCard";

const Page = () => {
  const [courseList, setCourseList] = useState([]);
  const { user } = useUser();

  const GetCourseList = async () => {
    try {
      const result = await axios.get("/api/courses?courseId=0");
      console.log("Fetched courses:", result.data);
      setCourseList(result.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (user) {
      GetCourseList();
    }
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="font-bold text-3xl mb-6">Explore More Courses</h2>

      {/* Search Bar */}
      <div className="flex gap-4 mb-8">
        <Input placeholder="Search" />
        <Button>
          <Search className="mr-2 w-4 h-4" /> Search
        </Button>
      </div>

      {/* Courses */}
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
          {courseList.map((course) => (
            <CourseCard key={course.cid} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
