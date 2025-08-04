import { initializeApp, getApps, FirebaseApp } from "firebase/app"
import { getAuth, Auth } from "firebase/auth"
import { getFirestore, Firestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "placeholder-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "placeholder.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "placeholder-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "placeholder.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "placeholder-app-id",
}

// Initialize Firebase only if we have valid configuration
let app: FirebaseApp | undefined
let auth: Auth | undefined
let db: Firestore | undefined

// Only initialize Firebase if we're not in test environment and have valid config
const shouldInitializeFirebase = () => {
  // Skip initialization in test environment
  if (process.env.NODE_ENV === "test") {
    return false
  }

  // Skip if using placeholder values (development without proper config)
  if (firebaseConfig.apiKey === "placeholder-api-key") {
    console.warn("Firebase not properly configured. Using placeholder values for development.")
    return false
  }

  return true
}

if (shouldInitializeFirebase()) {
  try {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }

    // Initialize Firebase services
    if (app) {
      auth = getAuth(app)
      db = getFirestore(app)
    }
  } catch (error) {
    console.warn("Firebase initialization failed:", error)
    // In development, we might not have Firebase configured yet
    if (process.env.NODE_ENV === "development") {
      console.log("Firebase not configured. Please set up your .env.local file with Firebase credentials.")
    }
  }
}

// Helper function to get auth with proper error handling
export const getAuthInstance = (): Auth => {
  if (!auth) {
    throw new Error("Firebase Auth is not initialized. Please check your Firebase configuration.")
  }
  return auth
}

// Helper function to get firestore with proper error handling
export const getFirestoreInstance = (): Firestore => {
  if (!db) {
    throw new Error("Firebase Firestore is not initialized. Please check your Firebase configuration.")
  }
  return db
}

export { auth, db }
export default app
