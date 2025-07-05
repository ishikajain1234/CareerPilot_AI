import React from 'react';
import Image from 'next/image';
import { Book, PlayCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const EnrollCourseCard = ({ course, enrollcourse }) => {
  const courseData = course?.courseJson?.course || course || {};
  const imageSrc = course?.bannerImageUrl?.trim() || "/fallback-image.webp";
  const chapters = courseData?.noofChapters || 0;
  const hasContent = course?.courseContent?.length;

  const CalculatePerProgress=()=>{

    return (enrollcourse?.completedChapters?.length??0/course?.courseContent?.length)*100
  }// Replace this with actual progress logic later

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
        <h2 className="text-xl font-semibold text-gray-800">
          {courseData.name || "Untitled Course"}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3">
          {courseData?.description || "No description available."}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="flex items-center text-sm text-gray-500">
            <Book className="w-4 h-4 mr-1" />
            {chapters} Chapter{chapters !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <Progress value={CalculatePerProgress()} />
          <p className="text-xs text-muted-foreground mt-1">{CalculatePerProgress()}% completed</p>
           <Link href={'/workspace/view-course/'+course?.cid}>
          <Button className={'w-full mt-3 '}> 
           <PlayCircle/>Continuos Learning</Button>
           </Link>
        </div>

      </div>
    </div>
  );
};

export default EnrollCourseCard;
