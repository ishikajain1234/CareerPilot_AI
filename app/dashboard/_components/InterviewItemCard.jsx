"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  const onStart = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/start`);
  };
  const onFeedback = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  }

  return (
    <div className="border rounded-xl p-5 shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-primary">
          {interview?.jobPosition}
        </h2>
        <p className="text-sm text-muted-foreground">
          {interview?.jobExperience} {interview?.jobExperience === "1" ? "year" : "years"} of Experience
        </p>
        <p className="text-xs text-gray-400">
          Created on: <span className="font-medium">{interview?.createdAt}</span>
        </p>
      </div>

      <div className="flex gap-4 mt-5">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 hover:bg-muted transition-colors"
          onClick={onFeedback}
        >
          Feedback
        </Button>

        <Button
          size="sm"
          className="flex-1 transition-transform hover:scale-[1.02]"
          onClick={onStart}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
