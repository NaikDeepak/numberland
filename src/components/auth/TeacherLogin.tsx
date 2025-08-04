import React, { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { getAuthInstance } from "../../utils/firebase"
import { useAuth } from "./AuthProvider"

interface TeacherLoginProps {
  onSuccess?: () => void
}

export const TeacherLogin: React.FC<TeacherLoginProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { dispatch } = useAuth()

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required")
      return false
    }
    if (!password.trim()) {
      setError("Password is required")
      return false
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      return false
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
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
      // Sign in with email and password
      const result = await signInWithEmailAndPassword(getAuthInstance(), email.trim(), password)

      // Create teacher user object
      const teacher = {
        id: result.user.uid,
        name: result.user.displayName || "Teacher",
        email: result.user.email || email,
        classes: [],
      }

      // Update auth context
      dispatch({ type: "SET_USER", payload: teacher })

      // Call success callback
      onSuccess?.()
    } catch (err: any) {
      console.error("Login error:", err)

      // Handle specific Firebase auth errors
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email address")
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password")
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address")
      } else {
        setError("Failed to sign in. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>👨‍🏫 Teacher Portal</h1>
          <p className='text-gray-600'>Sign in to manage your class</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
              Email Address
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg'
              placeholder='Enter your email'
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg'
              placeholder='Enter your password'
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
            className='w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-4 px-6 rounded-lg text-lg hover:from-green-600 hover:to-blue-700 focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
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
                Signing In...
              </span>
            ) : (
              "🔐 Sign In"
            )}
          </button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-500'>Contact your administrator to create an account</p>
        </div>
      </div>
    </div>
  )
}
