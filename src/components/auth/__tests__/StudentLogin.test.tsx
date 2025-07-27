import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { StudentLogin } from "../StudentLogin"

// Mock Firebase auth
jest.mock("../../../utils/firebase", () => ({
  auth: {},
}))

// Mock signInAnonymously
jest.mock("firebase/auth", () => ({
  signInAnonymously: jest.fn(),
}))

// Mock AuthProvider
jest.mock("../AuthProvider", () => ({
  useAuth: () => ({
    dispatch: jest.fn(),
  }),
}))

describe("StudentLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should render the login form", () => {
    render(<StudentLogin />)

    expect(screen.getByText("🎮 Numberland Adventures")).toBeInTheDocument()
    expect(screen.getByText("Start your math adventure today!")).toBeInTheDocument()
    expect(screen.getByLabelText("What's your name?")).toBeInTheDocument()
    expect(screen.getByLabelText("Class Code")).toBeInTheDocument()
    expect(screen.getByText("🚀 Start Adventure!")).toBeInTheDocument()
  })

  it("should validate required fields", () => {
    render(<StudentLogin />)

    // Try to submit without filling fields
    fireEvent.click(screen.getByText("🚀 Start Adventure!"))

    expect(screen.getByText("Name is required")).toBeInTheDocument()
  })

  it("should validate name length", () => {
    render(<StudentLogin />)

    // Enter a short name
    fireEvent.change(screen.getByLabelText("What's your name?"), { target: { value: "A" } })
    fireEvent.change(screen.getByLabelText("Class Code"), { target: { value: "ABC123" } })
    fireEvent.click(screen.getByText("🚀 Start Adventure!"))

    expect(screen.getByText("Name must be at least 2 characters")).toBeInTheDocument()
  })

  it("should validate class code length", () => {
    render(<StudentLogin />)

    // Enter a short class code
    fireEvent.change(screen.getByLabelText("What's your name?"), { target: { value: "Alice" } })
    fireEvent.change(screen.getByLabelText("Class Code"), { target: { value: "AB" } })
    fireEvent.click(screen.getByText("🚀 Start Adventure!"))

    expect(screen.getByText("Class code must be at least 3 characters")).toBeInTheDocument()
  })

  it("should show loading state when submitting", () => {
    render(<StudentLogin />)

    // Fill in valid form
    fireEvent.change(screen.getByLabelText("What's your name?"), { target: { value: "Alice" } })
    fireEvent.change(screen.getByLabelText("Class Code"), { target: { value: "ABC123" } })

    // Submit form
    fireEvent.click(screen.getByText("🚀 Start Adventure!"))

    // Should show loading state
    expect(screen.getByText("Starting Adventure...")).toBeInTheDocument()
  })
})
