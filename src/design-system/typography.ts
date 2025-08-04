// Numberland Adventures Design System - Typography
// Kid-friendly typography with large, readable text

export const typography = {
  // Heading styles for different hierarchy levels
  heading: {
    h1: "text-4xl font-bold text-gray-800 leading-tight",
    h2: "text-3xl font-bold text-gray-800 leading-tight",
    h3: "text-2xl font-semibold text-gray-700 leading-tight",
    h4: "text-xl font-semibold text-gray-700 leading-tight",
  },

  // Body text styles
  body: {
    large: "text-lg text-gray-600 leading-relaxed",
    medium: "text-base text-gray-600 leading-relaxed",
    small: "text-sm text-gray-500 leading-relaxed",
  },

  // Interactive text styles
  interactive: {
    button: {
      large: "text-xl font-bold",
      medium: "text-lg font-semibold",
      small: "text-base font-semibold",
    },
    link: "text-blue-600 hover:text-blue-800 underline",
  },

  // Special text styles for the adventure theme
  adventure: {
    quest: "text-2xl font-bold text-gray-800 text-center",
    problem: "text-4xl font-bold text-gray-800 text-center",
    answer: "text-xl font-semibold text-gray-700",
    reward: "text-lg font-bold text-yellow-600",
    level: "text-sm font-semibold text-gray-600",
  },

  // Feedback and status text
  feedback: {
    success: "text-lg font-semibold text-green-600",
    error: "text-lg font-semibold text-red-600",
    warning: "text-lg font-semibold text-yellow-600",
    info: "text-lg font-semibold text-blue-600",
  },

  // Progress and achievement text
  progress: {
    xp: "text-sm font-semibold text-gray-600",
    level: "text-sm font-bold text-gray-800",
    coin: "text-lg font-bold text-yellow-600",
    star: "text-lg font-bold text-yellow-500",
  },
}

// Typography utility functions
export const getTypography = (path: string) => {
  const keys = path.split(".")
  let current: any = typography

  for (const key of keys) {
    if (current[key] === undefined) {
      console.warn(`Typography path "${path}" not found`)
      return "text-base text-gray-600"
    }
    current = current[key]
  }

  return current
}

// Responsive typography classes
export const responsiveTypography = {
  heading: {
    h1: "text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800",
    h2: "text-xl md:text-2xl lg:text-3xl font-bold text-gray-800",
    h3: "text-lg md:text-xl lg:text-2xl font-semibold text-gray-700",
    h4: "text-base md:text-lg lg:text-xl font-semibold text-gray-700",
  },
  body: {
    large: "text-base md:text-lg lg:text-xl text-gray-600",
    medium: "text-sm md:text-base lg:text-lg text-gray-600",
    small: "text-xs md:text-sm lg:text-base text-gray-500",
  },
  problem: {
    large: "text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center",
    medium: "text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 text-center",
    small: "text-lg md:text-xl lg:text-2xl font-bold text-gray-800 text-center",
  },
}

// Font weight utilities
export const fontWeights = {
  thin: "font-thin",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
}

// Text alignment utilities
export const textAlign = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
}

// Line height utilities for better readability
export const lineHeight = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
}

export default typography
