"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, User } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { is } from "drizzle-orm";
import { db } from "@/utils/db"; // must be present



const RecordAnswerSection = ({ mockQuestions, activeQuestionIndex,interviewData }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [lastResultLength, setLastResultLength] = useState(0); // To avoid duplicate appends
  const {user}=useUser();
  const[loading,setLoading]=useState(false);
  const [hasSavedAnswer, setHasSavedAnswer] = useState(false);


  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > lastResultLength) {
      const newResults = results.slice(lastResultLength);
      newResults.forEach((res) => {
        if (res.transcript) {
          setUserAnswer((prev) => prev + " " + res.transcript);
        }
      });
      setLastResultLength(results.length);
    }
  }, [results]);
  useEffect(()=>{
    if(!isRecording && userAnswer?.length > 10){
      UpdateUserAnswer();
setHasSavedAnswer(true); 
    }
    
  },[isRecording])

  const StartStopRecording = async() => {
    if (isRecording) {
    
      stopSpeechToText();
     
      
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
  console.log("User Answer:", userAnswer);
  setLoading(true);

  try {
    const feedbackPrompt = `Question: ${mockQuestions[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Based on the question and the user's answer, please provide a rating from 1 to 5 and give feedback (in just 3 to 5 lines) suggesting areas of improvement. Respond in the following JSON format: 
    
    {
      "rating": number (1 to 5),
      "feedback": "Your improvement feedback here."
    }`;

    // Send prompt to the chat model
    const result = await chatSession.sendMessage(feedbackPrompt);

    // Await text response and clean it
    const textResponse = await result.response.text();
    const mockJsonResponse = textResponse
      .replace("```json", "")
      .replace("```", "")
      .trim();

    console.log("Mock JSON Response:", mockJsonResponse);

    // Parse the JSON
    let JsonFeedbackResp;
    try {
      JsonFeedbackResp = JSON.parse(mockJsonResponse);
    } catch (e) {
      console.error("Failed to parse feedback JSON:", e);
      toast.error("AI response could not be parsed as JSON.");
      setLoading(false);
      return;
    }

    // Sanity check
    if (
      !JsonFeedbackResp?.feedback ||
      typeof JsonFeedbackResp?.rating !== "number"
    ) {
      toast.error("Incomplete feedback received.");
      setLoading(false);
      return;
    }

    // Insert into DB
    const payload = {
      mockIdRef: interviewData.mockId,
      question: mockQuestions[activeQuestionIndex]?.question,
      correctAns: mockQuestions[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp.feedback,
      rating: JsonFeedbackResp.rating.toString(),

      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    };

    console.log("Inserting into DB:", payload);

    const rep = await db.insert(UserAnswer).values(payload);
console.log("Insert response:", rep);


    toast.success("Your answer has been recorded successfully.");
    setUserAnswer("");
    setResults([]);
  } catch (error) {
    console.error("Error in UpdateUserAnswer:", error);
    toast.error("Failed to save answer. Check console for details.");
     setResults([]);
  } finally {
    setResults([]);
    setLoading(false);
  }
};



  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      {/* Webcam Container */}
      <div className="relative flex flex-col justify-center items-center bg-secondary rounded-lg p-5 overflow-hidden shadow-lg w-full max-w-2xl">
        {/* Webcam Feed */}
        <div className="rounded-lg overflow-hidden w-full max-w-md aspect-video border-2 border-primary">
          <Webcam
            audio={true}
            mirrored={true}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay Icon */}
        <div className="absolute top-5 right-5 opacity-30 pointer-events-none">
          <Image src="/webcam.png" width={100} height={100} alt="Webcam Icon" />
        </div>

        {/* Status Text */}
        <p className="mt-4 text-sm text-muted-foreground">
          {isRecording ? "🎤 Recording your answer..." : "🎥 Ready to record"}
        </p>
      </div>

      {/* Record Button */}
      <Button
       disabled={loading}
        variant="outline"
        className="text-sm px-6 py-2"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex items-center gap-2">
            <Mic /> Recording...
          </h2>
        ) : (
          "Start Recording"
        )}
      </Button>

     
    </div>
  );
};

export default RecordAnswerSection;
