import React, { useState } from "react"
import { StudentLogin } from "../components/auth/StudentLogin"
import { TeacherLogin } from "../components/auth/TeacherLogin"
import { useAuth } from "../components/auth/AuthProvider"

export default function HomePage() {
  const [userType, setUserType] = useState<"student" | "teacher" | null>(null)
  const { state } = useAuth()

  // If user is already authenticated, redirect to appropriate dashboard
  if (state.user) {
    // For now, just show a simple message
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center p-4'>
        <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center'>
          <h1 className='text-3xl font-bold text-gray-800 mb-4'>Welcome back, {state.user.name}! 🎉</h1>
          <p className='text-gray-600 mb-6'>You're already signed in. Dashboard coming soon!</p>
          <button
            onClick={() => window.location.reload()}
            className='bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors'
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  // Show login type selection
  if (!userType) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center p-4'>
        <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>🎮 Numberland Adventures</h1>
            <p className='text-gray-600 text-lg'>Choose your adventure!</p>
          </div>

          <div className='space-y-4'>
            <button
              onClick={() => setUserType("student")}
              className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-6 px-8 rounded-xl text-xl hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-105'
            >
              🚀 I'm a Student
              <div className='text-sm font-normal mt-1 opacity-90'>Start your math adventure</div>
            </button>

            <button
              onClick={() => setUserType("teacher")}
              className='w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-6 px-8 rounded-xl text-xl hover:from-green-600 hover:to-blue-700 focus:ring-4 focus:ring-green-300 transition-all duration-200 transform hover:scale-105'
            >
              👨‍🏫 I'm a Teacher
              <div className='text-sm font-normal mt-1 opacity-90'>Manage your class</div>
            </button>
          </div>

          <div className='mt-8 text-center'>
            <p className='text-sm text-gray-500'>Fun math learning for kids aged 5-10</p>
          </div>
        </div>
      </div>
    )
  }

  // Show appropriate login form
  return (
    <div>
      {userType === "student" ? (
        <StudentLogin
          onSuccess={() => {
            // Handle successful student login
            console.log("Student logged in successfully")
          }}
        />
      ) : (
        <TeacherLogin
          onSuccess={() => {
            // Handle successful teacher login
            console.log("Teacher logged in successfully")
          }}
        />
      )}

      {/* Back button */}
      <button
        onClick={() => setUserType(null)}
        className='fixed top-4 left-4 bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all duration-200'
      >
        ← Back
      </button>
    </div>
  )
}
