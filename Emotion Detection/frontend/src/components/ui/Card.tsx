"use client"

import type React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => {
  return (
    <div className={`card ${className}`} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      {children}
    </div>
  )
}

export default Card
