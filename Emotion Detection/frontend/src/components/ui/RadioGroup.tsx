"use client"

import type React from "react"

interface RadioOption {
  value: string
  label: string
  score?: number
}

interface RadioGroupProps {
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  name: string
  className?: string
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onChange, name, className = "" }) => {
  return (
    <div className={`radio-group ${className}`}>
      {options.map((option) => (
        <div key={option.value} className="radio-option">
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="radio-input"
          />
          <label htmlFor={`${name}-${option.value}`} className="radio-label">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export default RadioGroup
