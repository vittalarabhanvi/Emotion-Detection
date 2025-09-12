import type React from "react"

interface BadgeProps {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  className?: string
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "primary", className = "" }) => {
  return <span className={`badge badge-${variant} ${className}`}>{children}</span>
}

export default Badge
