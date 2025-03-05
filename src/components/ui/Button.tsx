import type React from "react"
import { forwardRef } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  fullWidth?: boolean
  size?: "sm" | "md" | "lg"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
      primary:
        "bg-[#0052FF] text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg shadow-[36px_37px_33.9px_4px_rgba(72,97,157,0.53)]",
      secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300",
      outline:
        "border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100"
    }

    const sizes = {
      sm: "text-sm px-4 py-2 rounded-full",
      md: "text-base px-6 py-3 rounded-full",
      lg: "text-lg px-8 py-4 rounded-full"
    }

    return (
      <button
        ref={ref}
        className={` ${baseStyles} ${variants[variant]} ${sizes[size]} ${className} `}
        {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
