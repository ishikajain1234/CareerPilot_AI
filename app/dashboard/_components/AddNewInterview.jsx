"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { chatSession } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt =
      "Job Position:" +
      jobPosition +
      ", Job Description:" +
      jobDesc +
      ", Job Experience:" +
      jobExperience +
      ",Depend on this information, give me " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " interview questions with answer in json format. Give question and answer as fields in json";

    const result = await chatSession.sendMessage(InputPrompt);
    const MockjsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    setJsonResponse(MockjsonResp);

    if (MockjsonResp) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockjsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: MockInterview.mockId });

      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0]?.mockId);
      }
    } else {
      console.log("error");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Tell us more about your job interview
            </DialogTitle>
            <p className="mb-4 font-semibold text-gray-700">
              Add details about your job position/role, job description and years
              of experience
            </p>
          </DialogHeader>

          <DialogDescription>
            {/* Keep this empty or add a small description if you want */}
          </DialogDescription>

          {/* Form is outside DialogDescription to avoid invalid HTML nesting */}
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="jobPosition"
                className="block mb-1 font-semibold text-gray-800"
              >
                Job Role/Job Position
              </label>
              <Input
                id="jobPosition"
                placeholder="Ex. Full Stack Developer"
                required
                onChange={(e) => setJobPosition(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="jobDesc"
                className="block mb-1 font-semibold text-gray-800"
              >
                Job Description/Tech Stack
              </label>
              <Textarea
                id="jobDesc"
                placeholder="Ex. React, Angular, NodeJS, etc"
                required
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="jobExperience"
                className="block mb-1 font-semibold text-gray-800"
              >
                Years of Experience
              </label>
              <Input
                id="jobExperience"
                placeholder="Ex. 5"
                type="number"
                max="50"
                required
                onChange={(e) => setJobExperience(e.target.value)}
              />
            </div>

            <div className="flex gap-5 justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2" />
                    Generating from AI
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
