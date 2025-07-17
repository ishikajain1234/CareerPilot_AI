"use client";

import {useState, useEffect} from "react";
import Head from "next/head";
import * as pdfjsLib from "pdfjs-dist";
import {
  UploadCloud,
  Target,
  Sparkles,
  TrendingUp,
  CheckCircle,
  FileText,
} from "lucide-react";

// --- Sub-components for a cleaner structure ---

// A more engaging loading indicator
const LoadingIndicator = ({text}) => (
  <div className="mt-8 w-full flex flex-col items-center justify-center space-y-4">
    <svg
      className="animate-spin h-10 w-10 text-blue-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <p className="text-lg font-medium text-gray-600 animate-pulse">{text}</p>
  </div>
);

// A beautifully styled results display
const ResultsDisplay = ({score, tips}) => {
  const getIconForTip = (tip) => {
    if (tip.toLowerCase().startsWith("keyword"))
      return <Target className="h-6 w-6 text-indigo-500 mt-1 flex-shrink-0" />;
    if (tip.toLowerCase().startsWith("action verb"))
      return (
        <TrendingUp className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
      );
    if (tip.toLowerCase().startsWith("quantification"))
      return <Sparkles className="h-6 w-6 text-amber-500 mt-1 flex-shrink-0" />;
    return <CheckCircle className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />;
  };

  return (
    <div className="mt-8 w-full text-left animate-fadeIn space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <Target className="h-12 w-12 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Your ATS Score
            </h3>
            <p className="text-5xl font-bold text-blue-600">{score}%</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Sparkles className="h-6 w-6 mr-2 text-purple-500" /> Actionable Tips
        </h4>
        <ul className="space-y-4">
          {tips.map((tip, index) => {
            const [type, ...rest] = tip.split(": ");
            const content = rest.join(": ");
            return (
              <li key={index} className="flex items-start space-x-3">
                {getIconForTip(tip)}
                <div>
                  <span className="font-bold text-gray-700">{type}:</span>
                  <span className="text-gray-600 ml-1">{content}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

// --- Main Component ---

export default function ATSChecker() {
  const [atsScore, setAtsScore] = useState(null);
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [loadingText, setLoadingText] = useState("Preparing analysis...");

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
  }, []);

  // Effect to cycle through loading messages
  useEffect(() => {
    let interval;
    if (isLoading) {
      const messages = [
        "Scanning for keywords...",
        "Evaluating action verbs...",
        "Checking formatting rules...",
        "Quantifying achievements...",
        "Finalizing your score...",
      ];
      let messageIndex = 0;
      setLoadingText(messages[messageIndex]); // Set initial message immediately
      interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        setLoadingText(messages[messageIndex]);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const getTextFromPdf = async (file) => {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onload = async (event) => {
        try {
          const typedarray = new Uint8Array(event.target.result);
          const pdf = await pdfjsLib.getDocument(typedarray).promise;
          let textContent = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const text = await page.getTextContent();
            textContent += text.items.map((s) => s.str).join(" ");
          }
          resolve(textContent);
        } catch (error) {
          reject(
            "Failed to parse PDF file. It might be corrupted or in an unsupported format."
          );
        }
      };
      fileReader.readAsArrayBuffer(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Unsupported file type. Please upload a .pdf file.");
      return;
    }
    setFileName(file.name);
    setIsLoading(true);
    setError("");
    setAtsScore(null);
    setTips([]);
    try {
      const resumeText = await getTextFromPdf(file);
      if (!resumeText || resumeText.trim() === "") {
        throw new Error(
          "Could not extract any text from the PDF. Please ensure it's a text-based PDF and not an image."
        );
      }
      await analyzeResume(resumeText);
    } catch (err) {
      setError(typeof err === "string" ? err : err.message);
      setIsLoading(false);
    }
  };

  const analyzeResume = async (text) => {
    try {
      const response = await fetch("/api/ats/analyze", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({resumeText: text}),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to analyze resume.");
      }
      const data = await response.json();
      setAtsScore(data.atsScore);
      setTips(data.tips);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 font-sans">
      <Head>
        <title>ATS Resume Analyzer</title>
      </Head>

      <main className="w-full max-w-4xl mx-auto p-4 sm:p-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/5 p-8 lg:p-12 bg-blue-600 text-white rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-3">ATS Analyzer</h1>
            <div className="border-2 w-10 border-white inline-block mb-4"></div>
            <p className="text-blue-100">
              Get instant, AI-powered feedback to optimize your resume and get
              past the bots.
            </p>
          </div>

          <div className="w-full lg:w-3/5 p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Upload Your Resume
            </h2>
            <div className="flex flex-col items-center">
              <label
                htmlFor="resume-upload"
                className="w-full max-w-md p-6 text-center bg-white border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors group"
              >
                <UploadCloud className="w-12 h-12 mx-auto text-blue-500 group-hover:text-blue-600 transition-colors" />
                <span className="mt-4 block text-sm font-semibold text-blue-700">
                  {fileName ? (
                    <span className="flex items-center justify-center">
                      <FileText className="h-4 w-4 mr-2" /> {fileName}
                    </span>
                  ) : (
                    "Click to upload a PDF file"
                  )}
                </span>
              </label>
              <input
                id="resume-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf"
              />

              {isLoading && <LoadingIndicator text={loadingText} />}
              {error && (
                <p className="mt-6 text-red-600 font-semibold bg-red-100 p-3 rounded-lg">
                  {error}
                </p>
              )}
              {atsScore !== null && (
                <ResultsDisplay score={atsScore} tips={tips} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
