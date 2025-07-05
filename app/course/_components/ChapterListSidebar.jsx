'use client';

import React, { useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndexContext } from "@/context/SelectedChpaterIndex";

const ChapterListSidebar = ({ courseInfo }) => {
  const courseContent = courseInfo?.courses?.courseContent ?? [];
  const completedChapters = courseInfo?.enrollCourse?.completedChapters ?? [];
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);

  return (
    <div className="w-80 bg-secondary h-screen p-5 overflow-y-auto">
      <h2 className="my-3 font-bold text-xl">Chapters ({courseContent.length})</h2>
      <Accordion type="single" collapsible>
        {courseContent.map((chapter, index) => {
          const isCompleted = completedChapters.includes(index);

          return (
            <AccordionItem
              value={chapter?.courseData?.chapterName}
              key={index}
              onClick={() => setSelectedChapterIndex(index)}
              className={`rounded-lg my-1 ${
                isCompleted ? 'bg-green-100 border-l-4 border-green-500' : ''
              }`}
            >
              <AccordionTrigger className="text-lg font-medium flex justify-between items-center px-2">
                <span>
                  {index + 1}. {chapter?.courseData?.chapterName}
                </span>
                {isCompleted && (
                  <span title="Completed" className="text-green-600 font-bold">✅</span>
                )}
              </AccordionTrigger>
              <AccordionContent asChild>
                <div className="pl-4 pr-2 py-2">
                  {chapter?.courseData?.topics.map((topic, tIndex) => (
                    <h2 key={tIndex} className="p-2 bg-white my-1 rounded-md">
                      {topic?.topic}
                    </h2>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ChapterListSidebar;
