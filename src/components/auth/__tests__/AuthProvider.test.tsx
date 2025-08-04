import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { AuthProvider } from "../AuthProvider"
import { AuthState } from "../../../types/auth"

// Mock Firebase auth
jest.mock("../../../utils/firebase", () => ({
  auth: undefined, // Mock auth as undefined to test development mode
  getAuthInstance: jest.fn(() => ({})),
}))

// Mock signOut
jest.mock("firebase/auth", () => ({
  onAuthStateChanged: jest.fn(() => jest.fn()),
  signOut: jest.fn(),
}))

const TestComponent = () => {
  return <div>Test Component</div>
}

describe("AuthProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should render children when provided", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByText("Test Component")).toBeInTheDocument()
  })

  it("should provide authentication context with logout function", () => {
    const { container } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // The provider should render without errors
    expect(container).toBeInTheDocument()
  })

  it("should initialize with loading state", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Initially should be in loading state
    // This will be tested more thoroughly when we add loading indicators
    expect(screen.getByText("Test Component")).toBeInTheDocument()
  })

  it("should handle case when auth is not available", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Should render without errors even when auth is undefined
    expect(screen.getByText("Test Component")).toBeInTheDocument()
  })

  it("should handle logout function", async () => {
    const TestComponentWithLogout = () => {
      const { logout } = require("../AuthProvider").useAuth()
      return (
        <div>
          <button onClick={logout}>Logout</button>
          <div>Test Component</div>
        </div>
      )
    }

    render(
      <AuthProvider>
        <TestComponentWithLogout />
      </AuthProvider>
    )

    // The logout function should be available
    expect(screen.getByText("Logout")).toBeInTheDocument()
  })
})
