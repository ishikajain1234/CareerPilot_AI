import Link from "next/link";
import Header from "../app/dashboard/_components/Header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100">
      <Header />
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-6 py-10 max-w-7xl mx-auto">
        {/* Left - Text */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 backdrop-blur-lg bg-white/70 rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
            Welcome to <span className="text-blue-600">CareerPilot-AI</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Ace your interviews with smart mock interview preparation powered by AI.
            Practice confidently, get instant feedback, and sharpen your skills — all in one place.
          </p>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg transition-all duration-200 rounded-full shadow-md">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Right - Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="/bgImg.webp"
            alt="Mock Interview AI"
            className="rounded-xl shadow-xl w-full max-w-md lg:max-w-full transition-transform hover:scale-105 duration-300"
          />
        </div>
      </div>
    </div>
  );
}
