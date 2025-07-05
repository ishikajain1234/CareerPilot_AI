"use client";
import AppHeader from '@/app/workspace/_components/AppHeader';
import React, { useEffect, useState } from 'react';
import ChapterListSidebar from '../_components/ChapterListSidebar';
import ChapterContent from '../_components/ChapterContent';
import axios from 'axios';
import { useParams } from 'next/navigation';

const Course = () => {
  const { courseId } = useParams(); // ✅ FIXED: extract courseId properly
  const [courseInfo, setCourseInfo] = useState(null);

  const GetEnrolledCourse = async () => {
    try {
      const result = await axios.get(`/api/enroll-course?courseId=${courseId}`); // ✅ FIXED
      console.log("Fetched Enrolled Course:", result.data);
      setCourseInfo(result.data);
    } catch (error) {
      console.error("Failed to fetch enrolled course", error);
    }
  };

  useEffect(() => {
    if (courseId) {
      GetEnrolledCourse();
    }
  }, [courseId]); // ✅ Add courseId as dependency

  return (
    <div>
      <AppHeader hideSidebar={true} />
      <div className='flex gap-10'>
        <ChapterListSidebar  courseInfo={courseInfo}/>
        <ChapterContent  courseInfo={courseInfo} refreshData={()=>GetEnrolledCourse()}/>
      </div>
    </div>
  );
};

export default Course;
