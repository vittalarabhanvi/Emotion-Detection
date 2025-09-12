import type React from "react"

interface ProgressProps {
  value: number
  className?: string
}

const Progress: React.FC<ProgressProps> = ({ value, className = "" }) => {
  return (
    <div className={`progress ${className}`}>
      <div className="progress-bar" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  )
}

export default Progress
