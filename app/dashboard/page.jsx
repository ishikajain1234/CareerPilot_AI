"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import AddNewInterview from './_components/AddNewInterview'
import InerviewList from './_components/InerviewList'

const Dashboard = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('home')

  const handleTabClick = (tab) => {
    if (tab === 'course') {
      router.push('/workspace') // Redirect to the new page
    } else {
      setActiveTab(tab)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      {/* Sticky Navbar */}
     
      <div className="p-6">
        {activeTab === 'home' && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Add Mock Interview Card */}
            <div className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition duration-300">
              <img
                src="./bgImg.webp"
                alt="Interview"
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Mock Interviews</h3>
              <p className="text-gray-600 mb-4">
                Practice AI-based mock interviews and improve your confidence.
              </p>
              <button
                onClick={() => handleTabClick('interview')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
              >
                Start Interview
              </button>
            </div>

            {/* Create Course Card */}
            <div className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition duration-300">
              <img
                src="./course.webp"
                alt="Course"
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Create Your Course</h3>
              <p className="text-gray-600 mb-4">
                Build your own learning modules and share knowledge with others.
              </p>
              <button
                onClick={() => handleTabClick('course')}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
              >
                Create Course
              </button>
            </div>
          </div>
        )}

        {activeTab === 'interview' && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">📋 Add Mock Interview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <AddNewInterview />
            </div>
            <InerviewList />
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard;