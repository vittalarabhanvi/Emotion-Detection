"use client"

import type React from "react"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: "primary" | "outline" | "ghost"
  type?: "button" | "submit"
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
  className = "",
}) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`button button-${variant} ${className}`}>
      {children}
    </button>
  )
}

export default Button
