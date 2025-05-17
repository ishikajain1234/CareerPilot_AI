"use client";

import React from "react";

const basicQuestions = [
  {
    id: 1,
    question: "What is a data structure?",
    answer:
      "A data structure is a way to organize and store data efficiently to access and modify it.",
  },
  {
    id: 2,
    question: "What is an array?",
    answer:
      "An array is a collection of elements stored in contiguous memory locations, accessible by their index.",
  },
  {
    id: 3,
    question: "What is a linked list?",
    answer:
      "A linked list is a linear collection of nodes where each node points to the next node in the sequence.",
  },
  {
    id: 4,
    question: "What is recursion?",
    answer:
      "Recursion is a process where a function calls itself directly or indirectly to solve smaller instances of a problem.",
  },
  {
    id: 5,
    question: "What is the difference between Stack and Queue?",
    answer:
      "Stack follows Last-In-First-Out (LIFO) order, whereas Queue follows First-In-First-Out (FIFO) order.",
  },
  {
    id: 6,
    question: "What is a hash table?",
    answer:
      "A hash table stores key-value pairs and allows fast insertion, deletion, and searching using a hash function.",
  },
  {
    id: 7,
    question: "What is time complexity?",
    answer:
      "Time complexity describes how the runtime of an algorithm grows with the size of the input.",
  },
];

const QuestionsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Basic Interview Questions
      </h1>

      <div className="space-y-6">
        {basicQuestions.map(({ id, question, answer }) => (
          <div
            key={id}
            className="border border-gray-200 p-5 rounded-lg hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Q{id}. {question}
            </h2>
            <p className="text-gray-600 pl-4 border-l-4 border-blue-500">{answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsPage;
