import React from "react"
import { motion } from "framer-motion"

export interface PlayfulButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: "primary" | "secondary" | "success" | "error"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  className?: string
  type?: "button" | "submit" | "reset"
  "aria-label"?: string
}

const PlayfulButton: React.FC<PlayfulButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "lg",
  disabled = false,
  className = "",
  type = "button",
  "aria-label": ariaLabel,
}) => {
  const baseClasses = `
    rounded-2xl font-bold transition-all duration-200
    transform hover:scale-105 active:scale-95
    focus:outline-none focus:ring-4 focus:ring-opacity-50
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `

  const sizeClasses = {
    sm: "px-4 py-2 text-base",
    md: "px-6 py-3 text-lg",
    lg: "px-8 py-4 text-xl",
  }

  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary: "bg-yellow-400 text-gray-800 hover:bg-yellow-500 focus:ring-yellow-500",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
    error: "bg-red-400 text-white hover:bg-red-500 focus:ring-red-500",
  }

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim()

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={buttonClasses}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  )
}

export default PlayfulButton
