import React, { useState } from "react"
import { signInAnonymously } from "firebase/auth"
import { getAuthInstance } from "../../utils/firebase"
import { useAuth } from "./AuthProvider"

interface StudentLoginProps {
  onSuccess?: () => void
}

export const StudentLogin: React.FC<StudentLoginProps> = ({ onSuccess }) => {
  const [name, setName] = useState("")
  const [classCode, setClassCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { dispatch } = useAuth()

  const validateForm = () => {
    if (!name.trim()) {
      setError("Name is required")
      return false
    }
    if (!classCode.trim()) {
      setError("Class code is required")
      return false
    }
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters")
      return false
    }
    if (classCode.trim().length < 3) {
      setError("Class code must be at least 3 characters")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Sign in anonymously
      const result = await signInAnonymously(getAuthInstance())

      // Create student user object
      const student = {
        id: result.user.uid,
        name: name.trim(),
        classCode: classCode.trim().toUpperCase(),
        grade: 1, // Default grade, can be updated later
        coins: 0,
        streak: 0,
        totalXP: 0,
        level: 1,
        lastLogin: new Date(),
        completedQuests: [],
        classes: [],
      }

      // Update auth context
      dispatch({ type: "SET_USER", payload: student })

      // Call success callback
      onSuccess?.()
    } catch (err) {
      console.error("Login error:", err)
      setError("Failed to start adventure. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>🎮 Numberland Adventures</h1>
          <p className='text-gray-600'>Start your math adventure today!</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
              What's your name?
            </label>
            <input
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg'
              placeholder='Enter your name'
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor='classCode' className='block text-sm font-medium text-gray-700 mb-2'>
              Class Code
            </label>
            <input
              id='classCode'
              type='text'
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg'
              placeholder='Enter class code'
              disabled={loading}
            />
          </div>

          {error && (
            <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
              <p className='text-red-600 text-sm'>{error}</p>
            </div>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg text-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
          >
            {loading ? (
              <span className='flex items-center justify-center'>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Starting Adventure...
              </span>
            ) : (
              "🚀 Start Adventure!"
            )}
          </button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-500'>Ask your teacher for the class code</p>
        </div>
      </div>
    </div>
  )
}
