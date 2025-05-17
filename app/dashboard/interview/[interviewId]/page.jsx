"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Interview = () => {
  const [interviewData, setInterviewData] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails();
    }
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));
      console.log(result);
    setInterviewData(result[0]);
  };

  if (!interviewData) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-medium">
        Loading interview details...
      </div>
    );
  }

  return (
    <div className="my-10 flex flex-col items-center px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        🎯 Mock Interview Session
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Webcam Section */}
        <div className="flex flex-col items-center bg-white shadow-md p-6 rounded-xl border">
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              mirrored
              audio
              className="rounded-lg shadow"
              style={{ width: "100%", maxWidth: 400, height: 300 }}
            />
          ) : (
            <div className="flex flex-col items-center">
              <WebcamIcon className="h-48 w-48 text-gray-400 mb-4" />
              <Button onClick={() => setWebcamEnabled(true)}>
                Enable Web Cam and Microphone
              </Button>
            </div>
          )}
        </div>

        {/* Interview Details Section */}
        <div className="flex flex-col justify-center gap-4 bg-muted p-6 rounded-xl shadow-md border">
          <h2 className="text-lg font-semibold text-gray-700">
            <strong>Job Position:</strong> {interviewData.jobPosition}
          </h2>
          <h2 className="text-lg text-gray-700">
            <strong>Job Description:</strong> {interviewData.jobDesc}
          </h2>
          <h2 className="text-lg text-gray-700">
            <strong>Experience Required:</strong> {interviewData.jobExperience}
          </h2>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-10 w-full max-w-4xl bg-blue-50 text-blue-900 p-6 rounded-xl shadow border">
        <div className="flex items-center gap-2 mb-2 text-blue-800 font-semibold">
          <Lightbulb className="h-5 w-5" />
          <span>Important Information</span>
        </div>
        <p className="text-sm leading-relaxed">
          {process.env.NEXT_PUBLIC_INFORMATION || "Please enable your webcam and microphone to continue."}
        </p>
      </div>

      {/* Start Button */}
      <div className="mt-6 w-full flex justify-center">
        <Link href={'/dashboard/interview/' + interviewId + '/start'}>
        <Button className="px-6 py-2 text-md font-semibold">
          Start Interview
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
