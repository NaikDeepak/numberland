import React from "react"
import { motion } from "framer-motion"

export interface ProgressBarProps {
  currentValue: number
  maxValue: number
  label?: string
  variant?: "xp" | "level" | "quest"
  showPercentage?: boolean
  showStars?: boolean
  className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentValue,
  maxValue,
  label,
  variant = "xp",
  showPercentage = false,
  showStars = false,
  className = "",
}) => {
  const percentage = Math.min((currentValue / maxValue) * 100, 100)

  const getBarColors = () => {
    switch (variant) {
      case "xp":
        return {
          background: "bg-gray-200",
          fill: "bg-gradient-to-r from-blue-500 to-green-500",
        }
      case "level":
        return {
          background: "bg-gray-200",
          fill: "bg-gradient-to-r from-yellow-400 to-orange-500",
        }
      case "quest":
        return {
          background: "bg-gray-200",
          fill: "bg-gradient-to-r from-purple-500 to-pink-500",
        }
      default:
        return {
          background: "bg-gray-200",
          fill: "bg-gradient-to-r from-blue-500 to-green-500",
        }
    }
  }

  const getLabelColor = () => {
    switch (variant) {
      case "xp":
        return "text-gray-600"
      case "level":
        return "text-gray-800"
      case "quest":
        return "text-gray-700"
      default:
        return "text-gray-600"
    }
  }

  const colors = getBarColors()
  const labelColor = getLabelColor()

  return (
    <div className={`w-full ${className}`}>
      {/* Label and Value */}
      <div className='flex justify-between items-center mb-2'>
        {label && <span className={`text-sm font-semibold ${labelColor}`}>{label}</span>}
        <div className='flex items-center gap-2'>
          {showPercentage && <span className={`text-sm font-semibold ${labelColor}`}>{Math.round(percentage)}%</span>}
          <span className={`text-sm font-semibold ${labelColor}`}>
            {currentValue} / {maxValue}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`relative h-4 rounded-full overflow-hidden ${colors.background}`}>
        <motion.div
          className={`h-full ${colors.fill} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      {/* Stars for XP bars */}
      {showStars && variant === "xp" && (
        <div className='flex justify-between items-center mt-2'>
          <span className='text-sm font-semibold text-gray-600'>Level {Math.floor(currentValue / 100) + 1}</span>
          <div className='flex gap-1'>
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${i < Math.floor(percentage / 20) ? "text-yellow-400" : "text-gray-300"}`}
              >
                ⭐
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgressBar
