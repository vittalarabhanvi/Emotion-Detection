"use client"

import type React from "react"

interface InputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder, disabled = false, className = "" }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`input ${className}`}
    />
  )
}

export default Input
