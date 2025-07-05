"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EnrollCourseCard from "./EnrollCourseCard";

const EnrollCourseList = () => {
  const [enrolledCourseList, setEnrolledCourseList] = useState([]);

  const GetEnrolledCourse = async () => {
    try {
      const result = await axios.get("/api/enroll-course");
      console.log("Fetched Enrolled Courses:", result.data);
      console.log("Enrolled Course List:", enrolledCourseList);

      setEnrolledCourseList(result.data);
    } catch (error) {
      console.error("Failed to fetch enrolled courses", error);
    }
  };

  useEffect(() => {
    GetEnrolledCourse();
  }, []);

  return (
    enrolledCourseList?.length > 0 && (
      <div className="mt-3">
        <h2 className="font-bold text-xl">
          Continue Learning your Courses
        </h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       {enrolledCourseList.map((course, index) => (
  <EnrollCourseCard
    key={index}
    course={course?.courses}
    enrollCourse={course?.enroll_course}
  />
))}
</div>

      </div>
    )
  );
};

export default EnrollCourseList;
