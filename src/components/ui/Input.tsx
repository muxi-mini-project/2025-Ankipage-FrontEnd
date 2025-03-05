import {
  forwardRef,
  useState,
  type ComponentProps,
  type ElementType
} from "react"

import { cn } from "~utils"

interface InputProps extends ComponentProps<"input"> {
  leftIcon?: ElementType
  rightIcon?: ElementType
  onRightIconClick?: () => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type: inputType,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      onRightIconClick: providedRightIconClick,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    const type =
      inputType === "password"
        ? showPassword
          ? "text"
          : "password"
        : inputType

    const handleRightIconClick = () => {
      if (inputType === "password") {
        setShowPassword(!showPassword)
      }
      providedRightIconClick?.()
    }

    return (
      <div className="relative flex w-full justify-center rounded-3xl">
        {LeftIcon && (
          <div className="text-muted-foreground absolute left-[7%] top-1/2 -translate-y-1/2">
            <LeftIcon className="h-6 w-6" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "placeholder:text-muted-foreground focus-visible:ring-ring flex h-8 w-[90%] rounded-3xl border-none bg-[#EFF4FA] text-base font-semibold shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm [&[type='password']]:[-webkit-text-security:disc]",
            !LeftIcon && !RightIcon && "px-2",
            LeftIcon && "pl-8",
            RightIcon && "pr-8",
            className
          )}
          ref={ref}
          {...props}
        />
        {RightIcon && (
          <button
            type="button"
            onClick={handleRightIconClick}
            className="text-muted-foreground hover:text-foreground absolute right-[7%] top-1/2 -translate-y-1/2">
            <RightIcon className="h-6 w-6" />
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
