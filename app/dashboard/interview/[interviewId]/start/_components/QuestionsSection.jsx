import React from "react";
import { Lightbulb, Volume2 } from "lucide-react";

const QuestionsSection = ({ mockQuestions, activeQuestionIndex }) => {
  const texttoSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'en-US';
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    } else {
      alert('Text to speech not supported in this browser');
    }
  };

  return (
    <div className="p-6 border rounded-2xl my-10 shadow-sm bg-white">
      {/* Question Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {mockQuestions?.map((_, index) => (
          <button
            key={index}
            className={`rounded-full px-4 py-2 text-xs md:text-sm font-medium border transition-all duration-200
              ${
                activeQuestionIndex === index
                  ? "bg-primary text-white shadow-md"
                  : "bg-muted text-primary hover:bg-primary/10"
              }`}
          >
            Question #{index + 1}
          </button>
        ))}
      </div>

      {/* Current Question */}
      <div className="mt-6 flex items-start justify-between gap-4">
        <h2 className="text-base md:text-lg font-semibold text-gray-800 flex-1">
          {mockQuestions[activeQuestionIndex]?.question}
        </h2>
        <button
          onClick={() => texttoSpeech(mockQuestions[activeQuestionIndex]?.question)}
          className="text-primary hover:text-primary/80"
          aria-label="Read question out loud"
        >
          <Volume2 className="w-6 h-6" />
        </button>
      </div>

      {/* Note Section */}
      <div className="mt-4 border-l-4 border-blue-400 bg-blue-50 p-5 rounded-xl shadow-sm">
        <div className="flex items-start gap-3 text-blue-700">
          <Lightbulb className="mt-1" />
          <div>
            <p className="font-semibold">Note</p>
            <p className="text-sm mt-1 text-blue-800">
              {process.env.NEXT_PUBLIC_QUESTION_NOTE ||
                "No note provided for this question."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsSection;
