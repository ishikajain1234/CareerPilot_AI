import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';

const CourseCard = ({ course }) => {
  const courseData = course?.courseJson?.course || {};
  const imageSrc = course?.bannerImageUrl?.trim() || "/fallback-image.webp";
  const chapters = courseData?.noofChapters || 0;
  const hasContent = course?.courseContent?.length;
  const [loading,setLoading]=useState(false);

  const onEnrollCourse=async()=>{
    try{
    setLoading(true);
     const result=await axios.post('/api/enroll-course',{
      courseId:course?.cid
     });
     console.log(result.data);
     if(result.data.resp){
      toast.warning('Already Enrolled');
      setLoading(false);
      return ;
     }
     toast.success("Enrolled");
     setLoading(false);
    }
    catch(e){
      toast.error('Server Side Error');
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border">
      {/* Course Image */}
      <Image
        src={imageSrc}
        alt={courseData.name || "Course image"}
        width={400}
        height={250}
        className="w-full h-[200px] object-cover"
      />
      
      {/* Course Details */}
      <div className="p-5 flex flex-col gap-3">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800">
          {courseData.name || "Untitled Course"}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3">
          {courseData?.description || "No description available."}
        </p>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-2">
          <span className="flex items-center text-sm text-gray-500">
            <Book className="w-4 h-4 mr-1" />
            {chapters} Chapter{chapters !== 1 ? 's' : ''}
          </span>

          {hasContent ? (
            <Button className="flex items-center gap-1 text-sm"
            onClick={onEnrollCourse}
            >
              {loading?<LoaderCircle className='animate-spin' disabled={loading}/>:
              <PlayCircle className="w-4 h-4" />}
              Enroll Course
            </Button>
          ) : (
            <Link href ={'/workspace/edit-course/'+course?.cid}><Button variant="outline" className="flex items-center gap-1 text-sm">
              <Settings className="w-4 h-4" />
              Generate Course
            </Button></Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
