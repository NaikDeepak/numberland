// Numberland Adventures Design System - Color Palette
// Bright, playful colors for a kid-friendly math adventure app

export const colors = {
  // Primary Colors
  primary: {
    blue: "#4A90E2", // Bright Blue - trust, friendly
    yellow: "#FFD93D", // Sunny Yellow - fun, cheerful
    green: "#6BCB77", // Fresh Green - success, progress
    red: "#FF6B6B", // Soft Red - playful, not scary
  },

  // Background Colors
  background: {
    primary: "#F7F9FC", // Light Sky/Off-White
    secondary: "#FFFFFF", // Pure White
    card: "#FFFFFF", // Card backgrounds
    overlay: "rgba(0, 0, 0, 0.5)", // Modal overlays
  },

  // Text Colors
  text: {
    primary: "#2D3748", // Dark gray for main text
    secondary: "#718096", // Light gray for secondary text
    light: "#FFFFFF", // White text on dark backgrounds
    muted: "#A0AEC0", // Muted text for disabled states
  },

  // Interactive States
  interactive: {
    hover: {
      primary: "#357ABD", // Darker blue on hover
      secondary: "#E6B800", // Darker yellow on hover
      success: "#5A9F65", // Darker green on hover
      error: "#E55A5A", // Darker red on hover
    },
    active: {
      primary: "#2D5F9E", // Even darker for active state
      secondary: "#CC9900", // Even darker yellow for active
      success: "#4A8A54", // Even darker green for active
      error: "#CC4D4D", // Even darker red for active
    },
    disabled: {
      background: "#E2E8F0", // Light gray for disabled
      text: "#A0AEC0", // Muted text for disabled
    },
  },

  // Status Colors
  status: {
    success: "#6BCB77", // Green for success states
    warning: "#FFD93D", // Yellow for warnings
    error: "#FF6B6B", // Red for errors
    info: "#4A90E2", // Blue for info
  },

  // Progress and Achievement Colors
  progress: {
    xpBar: {
      background: "#E2E8F0",
      fill: "#4A90E2",
      gradient: "linear-gradient(90deg, #4A90E2 0%, #6BCB77 100%)",
    },
    level: {
      background: "#FFD93D",
      text: "#2D3748",
    },
    star: "#FFD93D", // Gold for stars
    coin: "#FFD700", // Bright gold for coins
  },

  // Adventure Theme Colors
  adventure: {
    treasure: "#FFD700", // Gold for treasure chests
    forest: "#6BCB77", // Green for jungle/forest elements
    sky: "#4A90E2", // Blue for sky elements
    earth: "#8B4513", // Brown for earth elements
  },
}

// Color utility functions
export const getColor = (path: string) => {
  const keys = path.split(".")
  let current: any = colors

  for (const key of keys) {
    if (current[key] === undefined) {
      console.warn(`Color path "${path}" not found`)
      return "#000000"
    }
    current = current[key]
  }

  return current
}

// Tailwind CSS color classes mapping
export const tailwindColors = {
  "bg-primary-blue": "bg-[#4A90E2]",
  "bg-primary-yellow": "bg-[#FFD93D]",
  "bg-primary-green": "bg-[#6BCB77]",
  "bg-primary-red": "bg-[#FF6B6B]",
  "bg-background": "bg-[#F7F9FC]",
  "text-primary": "text-[#2D3748]",
  "text-secondary": "text-[#718096]",
  "text-light": "text-[#FFFFFF]",
  "border-primary-blue": "border-[#4A90E2]",
  "border-primary-yellow": "border-[#FFD93D]",
  "border-primary-green": "border-[#6BCB77]",
  "border-primary-red": "border-[#FF6B6B]",
}

export default colors
