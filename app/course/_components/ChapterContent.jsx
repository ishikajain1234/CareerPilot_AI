'use client';

import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChpaterIndex';
import axios from 'axios';
import { CheckCircle, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext } from 'react';
import YouTube from 'react-youtube';
import { toast } from 'sonner';

const ChapterContent = ({ courseInfo, enrollCourse, refreshData }) => {
  const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);
  const { courseId } = useParams();
  const courseContent = courseInfo?.courses?.courseContent ?? [];

  if (!courseInfo || !courseContent[selectedChapterIndex]) {
    return <div className="p-10">Loading...</div>;
  }

  const videoData = courseContent[selectedChapterIndex]?.youtubeVedio ?? [];
  const topics = courseContent[selectedChapterIndex]?.courseData?.topics ?? [];
  const chapterName = courseContent[selectedChapterIndex]?.courseData?.chapterName ?? '';

  const completedChapters = enrollCourse?.completedChapters ?? [];
  const isAlreadyCompleted = completedChapters.includes(selectedChapterIndex);

  const markChapterCompleted = async () => {
    if (isAlreadyCompleted) {
      toast.info('Chapter already marked as completed');
      return;
    }

    const updatedChapters = [...completedChapters, selectedChapterIndex];

    try {
      await axios.put('/api/enroll-course', {
        courseId,
        completedChapters: updatedChapters,
      });

      await refreshData();
      toast.success('Chapter marked as completed');
    } catch (error) {
      console.error('Error updating chapter:', error);
      toast.error('Failed to mark chapter as completed');
    }
  };

  const markChapterIncomplete = async () => {
    const updatedChapters = completedChapters.filter(idx => idx !== selectedChapterIndex);

    try {
      await axios.put('/api/enroll-course', {
        courseId,
        completedChapters: updatedChapters,
      });

      await refreshData();
      toast.success('Chapter marked as incomplete');
    } catch (error) {
      console.error('Error marking incomplete:', error);
      toast.error('Failed to mark as incomplete');
    }
  };

  return (
    <div className="p-8 md:p-10 w-full overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedChapterIndex + 1}. {chapterName}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Watch the videos below to understand the topic better.
          </p>
        </div>

        {!isAlreadyCompleted ? (
          <Button className="flex items-center gap-2" onClick={markChapterCompleted}>
            <CheckCircle className="w-5 h-5" />
            Mark as Completed
          </Button>
        ) : (
          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={markChapterIncomplete}
          >
            <X className="w-5 h-5" />
            Mark as Incomplete
          </Button>
        )}
      </div>

      {/* Related Videos */}
      <h3 className="text-xl font-semibold text-primary mb-4">📽️ Related Videos</h3>
      {videoData.length === 0 ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-700 p-4 rounded-md">
          No videos available for this chapter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videoData.slice(0, 2).map((video, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-md bg-white">
              <YouTube
                videoId={video?.videoId}
                className="w-full aspect-video"
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: { autoplay: 0 },
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Topics */}
      <div className="mt-10 space-y-6">
        {topics.map((topic, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-bold text-lg mb-2">
              📝 {index + 1}. {topic?.topic}
            </h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: topic?.content }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterContent;
