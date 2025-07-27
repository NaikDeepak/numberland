import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Mock Firebase modules
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
}))

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}))

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}))

describe("Firebase Configuration", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  it("should initialize Firebase app when no apps exist", () => {
    // Mock getApps to return empty array
    ;(getApps as jest.Mock).mockReturnValue([])

    // Import the module (this will trigger initialization)
    require("../firebase")

    expect(initializeApp).toHaveBeenCalledWith({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    })
  })

  it("should not initialize Firebase app when apps already exist", () => {
    // Mock getApps to return existing apps
    ;(getApps as jest.Mock).mockReturnValue([{ name: "existing-app" }])

    // Import the module
    require("../firebase")

    expect(initializeApp).not.toHaveBeenCalled()
  })

  it("should initialize Firebase Auth", () => {
    const mockApp = { name: "test-app" }
    ;(getApps as jest.Mock).mockReturnValue([mockApp])

    require("../firebase")

    expect(getAuth).toHaveBeenCalledWith(mockApp)
  })

  it("should initialize Firestore", () => {
    const mockApp = { name: "test-app" }
    ;(getApps as jest.Mock).mockReturnValue([mockApp])

    require("../firebase")

    expect(getFirestore).toHaveBeenCalledWith(mockApp)
  })
})
