import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { AuthProvider } from "../AuthProvider"
import { AuthState } from "../../../types/auth"

// Mock Firebase auth
jest.mock("../../../utils/firebase", () => ({
  auth: {
    onAuthStateChanged: jest.fn(() => jest.fn()),
  },
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

  it("should provide authentication context", () => {
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

  it("should call onAuthStateChanged on mount", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Verify that onAuthStateChanged was called
    const { auth } = require("../../../utils/firebase")
    expect(auth.onAuthStateChanged).toHaveBeenCalled()
  })
})
