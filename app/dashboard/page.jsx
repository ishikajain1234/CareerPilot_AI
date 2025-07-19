"use client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {UserButton} from "@clerk/nextjs";
import AddNewInterview from "./_components/AddNewInterview";
import InerviewList from "./_components/InerviewList";
// --- NEW: Added BrainCircuit icon ---
import {
  Home,
  ClipboardList,
  BookOpen,
  FileCheck,
  BrainCircuit,
} from "lucide-react";

const Dashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab) => {
    if (tab === "course") {
      router.push("/workspace");
    } else if (tab === "ats") {
      router.push("/ats");
    } else if (tab === "dsa-prep") {
      // --- NEW: Handle navigation to DSA Prep page ---
      router.push("/dsa-prep");
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 font-sans text-gray-800">
      <main className="p-8 container mx-auto">
        {activeTab === "home" && (
          // --- UPDATED: Changed grid to better accommodate 4 cards on large screens ---
          <section className="animate-fadeIn mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            {/* Practice AI Mock Interview Card */}
            <div className="bg-white shadow-2xl rounded-2xl p-8 transform hover:scale-105 transition duration-500 ease-in-out group flex flex-col">
              <div className="relative h-60 rounded-lg overflow-hidden mb-6">
                <img
                  src="/bgImg.webp"
                  alt="Mock Interview Illustration"
                  className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
                Practice AI Mock Interviews 🚀
              </h3>
              <p className="text-gray-600 mb-6 text-lg flex-grow">
                Hone your interview skills with AI-powered simulations and
                receive instant feedback to boost your confidence.
              </p>
              <button
                onClick={() => handleTabClick("interview")}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 rounded-lg shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out text-lg tracking-wide"
              >
                Start Your Interview Journey
              </button>
            </div>

            {/* Craft Your Own Learning Modules Card */}
            <div className="bg-white shadow-2xl rounded-2xl p-8 transform hover:scale-105 transition duration-500 ease-in-out group flex flex-col">
              <div className="relative h-60 rounded-lg overflow-hidden mb-6">
                <img
                  src="/course.webp"
                  alt="Course Creation Illustration"
                  className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
                Craft Your Own Learning Modules 📚
              </h3>
              <p className="text-gray-600 mb-6 text-lg flex-grow">
                Design and share your expertise by building custom learning
                courses and empowering others.
              </p>
              <button
                onClick={() => handleTabClick("course")}
                className="w-full bg-gradient-to-r from-green-600 to-teal-700 hover:from-green-700 hover:to-teal-800 text-white font-bold py-3 rounded-lg shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out text-lg tracking-wide"
              >
                Create a New Course
              </button>
            </div>

            {/* Check ATS Score Card */}
            <div className="bg-white shadow-2xl rounded-2xl p-8 transform hover:scale-105 transition duration-500 ease-in-out group flex flex-col">
              <div className="relative h-60 rounded-lg overflow-hidden mb-6">
                <img
                  src="/ats.jpeg" // --- FIXED: Changed to .png extension ---
                  alt="ATS Score Check Illustration"
                  className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
                Check ATS Score 📄
              </h3>
              <p className="text-gray-600 mb-6 text-lg flex-grow">
                Optimize your resume for Applicant Tracking Systems to increase
                your chances of getting noticed by recruiters.
              </p>
              <button
                onClick={() => handleTabClick("ats")}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-3 rounded-lg shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out text-lg tracking-wide"
              >
                Analyze My Resume
              </button>
            </div>

            {/* --- NEW: Smart DSA Prep Card --- */}
            <div className="bg-white shadow-2xl rounded-2xl p-8 transform hover:scale-105 transition duration-500 ease-in-out group flex flex-col">
              <div className="relative h-60 rounded-lg overflow-hidden mb-6">
                <img
                  src="/dsa.avif" // --- UPDATED: Changed to .png for consistency ---
                  alt="DSA Prep Illustration"
                  className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight flex items-center gap-x-2">
                Smart DSA Prep <BrainCircuit className="text-orange-500" />
              </h3>
              <p className="text-gray-600 mb-6 text-lg flex-grow">
                Get AI-generated problems, write code, and receive instant,
                intelligent feedback to master data structures.
              </p>
              <button
                onClick={() => handleTabClick("dsa-prep")}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 rounded-lg shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out text-lg tracking-wide"
              >
                Start Prepping
              </button>
            </div>
          </section>
        )}

        {activeTab === "interview" && (
          <section className="animate-fadeIn mt-10">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center gap-x-3">
              <ClipboardList size={32} className="text-blue-600" /> Your
              Interview Dashboard
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start a new mock interview or review your past attempts to track
              your progress.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              <AddNewInterview />
            </div>
            <InerviewList />
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
