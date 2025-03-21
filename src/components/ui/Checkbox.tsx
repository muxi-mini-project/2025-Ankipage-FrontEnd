"use client"

import type React from "react"
import { forwardRef, useId } from "react"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, id, ...props }, ref) => {
    const generatedId = useId()
    const checkboxId = id || generatedId
    return (
      <div className="flex items-center">
        <input
          type="checkbox"
          ref={ref}
          id={checkboxId}
          className={`h-4 w-4 cursor-pointer appearance-none rounded-md border border-gray-300 bg-white transition duration-200 ease-in-out checked:border-blue-600 checked:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className} `}
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className="ml-2 cursor-pointer text-sm leading-none text-gray-700">
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"
