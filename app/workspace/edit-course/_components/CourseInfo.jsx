import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, Clock, PlayCircle, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const CourseInfo = ({ course ,viewCourse}) => {
  const courseLayout = course?.courseJson?.course;
  const [loading,setLoading]=useState(false);
   const router =useRouter();
  const GenerateCourseContent=async()=>{
    setLoading(true);
    try{

      const result=await axios.post('/api/generate-course-content',{
        courseJson:courseLayout,
        courseTitle:course?.name,
        courseId:course?.cid
      });
      console.log(result.data);
      setLoading(false);
      router.replace('/workspace');
      toast.success('course Generated Successfully')
    }
    catch(e){
      console.log(e);  
        setLoading(false);
        toast.error("Server Side Error ,Try Again")

    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-5 rounded-2xl shadow-md">
      {/* Left Content */}
      <div className="flex flex-col gap-4 flex-1">
        <h2 className="font-bold text-2xl sm:text-3xl">{courseLayout?.name}</h2>
        <p className="line-clamp-2 text-gray-500 text-sm sm:text-base">
          {courseLayout?.description}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex gap-2 items-center p-3 rounded-lg shadow-sm bg-white">
            <Clock className="text-blue-500" />
            <section>
              <h2 className="font-semibold text-sm">Duration</h2>
              <h2 className="text-sm">2 hours</h2>
            </section>
          </div>
          <div className="flex gap-2 items-center p-3 rounded-lg shadow-sm bg-white">
            <Book className="text-green-500" />
            <section>
              <h2 className="font-semibold text-sm">Chapters</h2>
              <h2 className="text-sm">4 Chapters</h2>
            </section>
          </div>
          <div className="flex gap-2 items-center p-3 rounded-lg shadow-sm bg-white">
            <TrendingUp className="text-red-500" />
            <section>
              <h2 className="font-semibold text-sm">Difficulty</h2>
              <h2 className="text-sm">{course?.level || "Beginner"}</h2>
            </section>
          </div>
        </div>

     {!viewCourse ? (
  <Button className="w-fit mt-3" onClick={GenerateCourseContent} disabled={loading}>
    {loading ? "Generating..." : "Generate Content"}
  </Button>
) : (
  <Link href={'/course/'+course?.cid}><Button className="w-fit mt-3 flex items-center gap-1">
    <PlayCircle className="w-4 h-4" />
    Continue Learning
  </Button></Link>
)}
      </div>

      {/* Right Image */}
      <div className="w-full md:w-[300px]">
        {course?.bannerImageUrl ? (
          <Image
            src={course.bannerImageUrl}
            alt="banner Image"
            width={400}
            height={400}
            className="w-full h-[240px] object-cover rounded-2xl"
          />
        ) : (
          <div className="w-full h-[240px] bg-gray-100 flex items-center justify-center text-gray-400 rounded-2xl">
            No Image
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseInfo;
