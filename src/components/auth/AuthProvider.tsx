import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react"
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth"
import { auth } from "../../utils/firebase"
import { AuthState, AuthAction, User } from "../../types/auth"

// Initial state
const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
}

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      }
    default:
      return state
  }
}

// Create context
const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
} | null>(null)

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Handle authenticated user
        // For now, we'll just set a basic user object
        const user: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email || "",
          classCode: "",
          grade: 1,
          coins: 0,
          streak: 0,
          totalXP: 0,
          level: 1,
          lastLogin: new Date(),
          completedQuests: [],
          classes: [],
        }
        dispatch({ type: "SET_USER", payload: user })
      } else {
        // Handle unauthenticated user
        dispatch({ type: "SET_USER", payload: null as User | null })
      }
    })

    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
