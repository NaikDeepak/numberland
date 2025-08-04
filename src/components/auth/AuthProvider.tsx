import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react"
import { onAuthStateChanged, User as FirebaseUser, signOut } from "firebase/auth"
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
interface AuthContextType {
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Logout function
  const logout = async () => {
    try {
      if (auth) {
        await signOut(auth)
      }
      dispatch({ type: "LOGOUT" })
    } catch (error) {
      console.error("Logout error:", error)
      // Even if Firebase logout fails, clear local state
      dispatch({ type: "LOGOUT" })
    }
  }

  useEffect(() => {
    // Only set up auth listener if Firebase auth is available
    if (!auth) {
      console.warn("Firebase auth not available - using development mode")
      dispatch({ type: "SET_LOADING", payload: false })
      return
    }

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

    return () => {
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe()
      }
    }
  }, [])

  return <AuthContext.Provider value={{ state, dispatch, logout }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
