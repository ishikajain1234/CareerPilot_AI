"use client";
import React, {useState, useMemo} from "react";
import {BrainCircuit, ChevronDown, Code, Shuffle} from "lucide-react";
import {Remarkable} from "remarkable";

import CodeMirror from "@uiw/react-codemirror";
import {python} from "@codemirror/lang-python";
import {javascript} from "@codemirror/lang-javascript";
import {java} from "@codemirror/lang-java";
import {cpp} from "@codemirror/lang-cpp";
import {vscodeDark} from "@uiw/codemirror-theme-vscode";

const md = new Remarkable({
  html: true,
  breaks: true,
});

const DSAPrepPage = () => {
  const [topic, setTopic] = useState("");
  const [problem, setProblem] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const [language, setLanguage] = useState("C++");
  const [solution, setSolution] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate"); // --- NEW: State for difficulty ---
  const [isLoadingProblem, setIsLoadingProblem] = useState(false);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [isLoadingSolution, setIsLoadingSolution] = useState(false);
  const [error, setError] = useState("");

  const languageOptions = ["Python", "JavaScript", "Java", "C++"];
  const difficultyOptions = ["Basic", "Intermediate", "Hard", "Pro"]; // --- NEW: Difficulty levels ---

  const languageExtension = useMemo(() => {
    switch (language) {
      case "JavaScript":
        return javascript({jsx: true});
      case "Java":
        return java();
      case "C++":
        return cpp();
      case "Python":
      default:
        return python();
    }
  }, [language]);

  const resetStateForNewProblem = () => {
    setError("");
    setProblem(null);
    setFeedback("");
    setSolution("");
    setUserCode("");
  };

  const handleGetProblem = async () => {
    if (!topic) {
      setError("Please enter a DSA topic.");
      return;
    }
    resetStateForNewProblem();
    setIsLoadingProblem(true);

    try {
      const response = await fetch("/api/dsa-tutor", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({action: "validate_topic_and_get_problem", topic}),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to fetch problem.");
      if (!data.isValid) setError(data.message);
      else setProblem(data.problem);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingProblem(false);
    }
  };

  // --- NEW: Handler for getting a random problem ---
  const handleGetRandomProblem = async () => {
    resetStateForNewProblem();
    setIsLoadingProblem(true);
    try {
      const response = await fetch("/api/dsa-tutor", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({action: "get_random_problem", difficulty}),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to fetch problem.");
      setProblem(data.problem);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingProblem(false);
    }
  };

  const handleEvaluateCode = async () => {
    if (!userCode) {
      setError("Please write some code before evaluating.");
      return;
    }
    setError("");
    setFeedback("");
    setSolution("");
    setIsLoadingFeedback(true);

    try {
      const response = await fetch("/api/dsa-tutor", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          action: "evaluate_code",
          problem,
          userCode,
          language,
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to get feedback.");
      setFeedback(md.render(data.feedback));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  const handleRequestSolution = async () => {
    setIsLoadingSolution(true);
    setError("");
    try {
      const response = await fetch("/api/dsa-tutor", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({action: "get_solution", problem, language}),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to get solution.");
      setSolution(data.solution);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingSolution(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 text-gray-800 p-4 md:p-8 font-sans">
      <div className="container mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center gap-x-3">
            <BrainCircuit size={48} />
            Smart DSA Prep
          </h1>
          <p className="text-gray-600 mt-2">
            Your personal AI-powered coach for Data Structures & Algorithms.
          </p>
        </header>

        <main>
          {/* --- UPDATED: Combined Topic and Random Question Section --- */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Topic Input Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Get a Problem by Topic
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., 'Arrays', 'Binary Search'"
                    className="flex-grow bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <button
                    onClick={handleGetProblem}
                    disabled={isLoadingProblem}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isLoadingProblem && topic ? (
                      <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    ) : (
                      <span>Get Problem</span>
                    )}
                  </button>
                </div>
              </div>
              {/* Random Question Section */}
              <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Get a Random Challenge
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {difficultyOptions.map((level) => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                          difficulty === level
                            ? "bg-indigo-600 text-white shadow"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleGetRandomProblem}
                    disabled={isLoadingProblem}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isLoadingProblem && !topic ? (
                      <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Shuffle size={18} />
                        <span>Random Question</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            {error && (
              <p className="text-red-500 mt-4 text-sm text-center">{error}</p>
            )}
          </div>

          {/* Problem Solving Section */}
          {problem && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                  The Challenge
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <h3 className="text-gray-800 font-bold">{problem.title}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: md.render(problem.description),
                    }}
                  />
                  <h4 className="font-semibold">Examples:</h4>
                  {problem.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="bg-gray-100 border border-gray-200 p-3 rounded-md my-2"
                    >
                      <p className="font-semibold text-gray-800">
                        Example {i + 1}:
                      </p>
                      <pre className="bg-transparent p-0 m-0">
                        <code className="text-sm text-gray-800">
                          Input: {ex.input}
                          <br />
                          Output: {ex.output}
                        </code>
                      </pre>
                    </div>
                  ))}
                  <h4 className="font-semibold">Constraints:</h4>
                  <ul className="list-disc pl-5">
                    {problem.constraints.map((c, i) => (
                      <li
                        key={i}
                        dangerouslySetInnerHTML={{__html: md.render(c)}}
                      />
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg shadow-md flex flex-col overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-white">
                    Your Solution
                  </h2>
                  <div className="relative">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-md pl-3 pr-8 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      {languageOptions.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="flex-grow rounded-md overflow-hidden min-h-0">
                  <CodeMirror
                    value={userCode}
                    height="100%"
                    theme={vscodeDark}
                    extensions={[languageExtension]}
                    onChange={(value) => setUserCode(value)}
                    basicSetup={{
                      lineNumbers: true,
                      autocompletion: true,
                      highlightActiveLine: true,
                      bracketMatching: true,
                      indentOnInput: true,
                    }}
                  />
                </div>
                <button
                  onClick={handleEvaluateCode}
                  disabled={isLoadingFeedback}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoadingFeedback ? (
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  ) : (
                    <span>Evaluate My Code</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Feedback & Solution Display */}
          {isLoadingFeedback && (
            <div className="mt-8 text-center text-gray-500">
              <p>Our AI Tutor is analyzing your code... Please wait.</p>
            </div>
          )}
          {feedback && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                AI Feedback
              </h2>
              <div
                className="prose max-w-none text-gray-700 prose-headings:text-gray-800 prose-strong:text-gray-800 prose-code:bg-gray-200 prose-code:p-1 prose-code:rounded-md prose-pre:bg-gray-100 prose-pre:p-4"
                dangerouslySetInnerHTML={{__html: feedback}}
              />

              {!solution && (
                <div className="mt-6 border-t pt-4">
                  <button
                    onClick={handleRequestSolution}
                    disabled={isLoadingSolution}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center gap-2 disabled:bg-gray-400"
                  >
                    {isLoadingSolution ? (
                      <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Code size={18} />
                        <span>Show Optimal Solution</span>
                      </>
                    )}
                  </button>
                </div>
              )}
              {solution && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-700">
                    Optimal Solution ({language})
                  </h3>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{__html: md.render(solution)}}
                  />
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DSAPrepPage;
