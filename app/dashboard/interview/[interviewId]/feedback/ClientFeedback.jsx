"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronsUpDown,
  ThumbsUp,
  ThumbsDown,
  Info,
  Star,
  Sparkles,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const getRatingColor = (rating) => {
  const num = parseFloat(rating);
  if (num >= 8) return "bg-green-100 text-green-700";
  if (num >= 5) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

const ClientFeedback = ({ feedbackList }) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/dashboard");
  };

  if (!feedbackList || feedbackList.length === 0) {
    return (
      <div className="p-6 md:p-10 max-w-3xl mx-auto text-center">
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-6 py-4 rounded-lg shadow-sm inline-flex items-center gap-2">
          <Info className="w-5 h-5 text-yellow-600" />
          <p className="font-semibold text-lg">No feedback available to display.</p>
        </div>
        <div className="mt-6">
          <Button
            onClick={handleGoHome}
            className="px-6 py-3 text-base font-semibold flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const averageRating =
    feedbackList.reduce((acc, curr) => acc + parseFloat(curr.rating || 0), 0) /
    feedbackList.length;

  const allCorrect = feedbackList.every(
    (item) =>
      item.userAns?.trim().toLowerCase() ===
      item.correctAns?.trim().toLowerCase()
  );

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      {/* 🎉 Congratulations Message */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg shadow-sm">
          <Sparkles className="w-5 h-5 text-green-500 animate-pulse" />
          <p className="font-semibold text-lg">
            {allCorrect
              ? "🎉 Outstanding! You nailed every question!"
              : averageRating >= 7
              ? "🎉 Great job! You’ve done really well!"
              : "Keep practicing! You’re improving!"}
          </p>
        </div>
      </div>

      {/* 🔁 Feedback List */}
      {feedbackList.map((item, index) => {
        const isCorrect =
          item.userAns?.trim().toLowerCase() ===
          item.correctAns?.trim().toLowerCase();

        return (
          <Collapsible
            key={index}
            className="mb-5 border rounded-xl shadow hover:shadow-md transition-shadow"
          >
            <CollapsibleTrigger className="w-full px-5 py-4 bg-muted text-primary font-medium flex items-center justify-between text-left rounded-t-xl">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                <span>{item.question || `Question ${index + 1}`}</span>
              </div>
              <ChevronsUpDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-white px-5 py-4 space-y-4 text-gray-800 rounded-b-xl">
              <div>
                <p className="font-semibold text-gray-900">Your Answer:</p>
                <p
                  className={`pl-2 ${
                    isCorrect
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  } rounded-md px-2 py-1 inline-block font-medium`}
                >
                  {item.userAns}
                </p>
              </div>
              {!isCorrect && (
                <div>
                  <p className="font-semibold text-gray-900">Correct Answer:</p>
                  <p className="pl-2 text-gray-700 font-medium">
                    {item.correctAns}
                  </p>
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900">Feedback:</p>
                <p className="pl-2 italic text-gray-600">{item.feedback}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">Rating:</p>
                <span
                  className={`${getRatingColor(
                    item.rating
                  )} rounded-full px-3 py-1 text-sm font-semibold`}
                >
                  {item.rating}/10
                </span>
                {parseFloat(item.rating) >= 7 ? (
                  <ThumbsUp className="text-green-600 w-4 h-4" />
                ) : (
                  <ThumbsDown className="text-red-600 w-4 h-4" />
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}

      {/* 🏠 Go Home Button */}
      <div className="text-center mt-10">
        <Button
          onClick={handleGoHome}
          className="px-6 py-3 text-base font-semibold flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ClientFeedback;
