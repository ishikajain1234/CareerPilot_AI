"use client";

import React, { useEffect, useState, use } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Dynamically import RecordAnswerSection with SSR disabled
const RecordAnswerSection = dynamic(
  () => import("./_components/RecordAnswerSection"),
  { ssr: false }
);

const StartInterview = ({ params: paramsPromise }) => {
  const params = use(paramsPromise);
  const [interviewData, setInterviewData] = useState(null);
  const [mockQuestions, setMockQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    const GetInterviewDetails = async () => {
      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));

        if (result.length > 0) {
          const data = result[0];
          setInterviewData(data);

          const parsedQuestions = JSON.parse(data.jsonMockResp);
          setMockQuestions(parsedQuestions.slice(0, 5));
        }
      } catch (err) {
        console.error("Failed to load mock interview:", err.message);
      }
    };

    GetInterviewDetails();
  }, [params.interviewId]);

  if (!interviewData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading interview...
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <QuestionsSection
          mockQuestions={mockQuestions}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
          mockQuestions={mockQuestions}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>

     <div className="flex justify-end gap-4 mt-6">
  {activeQuestionIndex > 0 && (
    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
      Previous Question
    </Button>
  )}

 {activeQuestionIndex < mockQuestions.length - 1 ? (
  <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
    Next Question
  </Button>
) : (
  <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
    <Button>
      End Interview
    </Button>
  </Link>
)}
</div>

    </div>
  );
};

export default StartInterview;
