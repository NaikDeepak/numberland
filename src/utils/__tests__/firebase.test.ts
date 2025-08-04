import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import "@testing-library/jest-dom"

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
    // Mock NODE_ENV to be 'development' for these tests
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "development",
      writable: true,
    })
  })

  it("should not initialize Firebase in test environment", () => {
    // Mock the environment check by mocking the module
    jest.doMock("../firebase", () => {
      const originalModule = jest.requireActual("../firebase")
      return {
        ...originalModule,
        shouldInitializeFirebase: () => false,
      }
    })

    require("../firebase")

    expect(initializeApp).not.toHaveBeenCalled()
    expect(getAuth).not.toHaveBeenCalled()
    expect(getFirestore).not.toHaveBeenCalled()
  })

  it("should not initialize Firebase with placeholder values", () => {
    // Mock environment variables to be undefined
    delete process.env.NEXT_PUBLIC_FIREBASE_API_KEY

    require("../firebase")

    expect(initializeApp).not.toHaveBeenCalled()
    expect(getAuth).not.toHaveBeenCalled()
    expect(getFirestore).not.toHaveBeenCalled()
  })

  it("should handle initialization errors gracefully", () => {
    // Mock environment variables BEFORE requiring the module
    const originalEnv = process.env
    process.env = {
      ...originalEnv,
      NODE_ENV: "development",
      NEXT_PUBLIC_FIREBASE_API_KEY: "test-api-key",
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "test.firebaseapp.com",
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: "test-project",
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "test.appspot.com",
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "123456789",
      NEXT_PUBLIC_FIREBASE_APP_ID: "test-app-id",
    }

    // Mock initializeApp to throw an error
    ;(initializeApp as jest.Mock).mockImplementation(() => {
      throw new Error("Firebase initialization failed")
    })

    // Reset modules to ensure fresh import
    jest.resetModules()

    // Should not throw an error
    expect(() => {
      require("../firebase")
    }).not.toThrow()

    // Restore original environment
    process.env = originalEnv
  })
})
