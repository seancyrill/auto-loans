import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { LucideIcon } from "lucide-react"
import React from "react"
import { twMerge } from "tailwind-merge"

// Helper for Tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 1. Define Variants
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "text-white",
        subtle: "",
        ghost: "bg-white",
        link: "bg-transparent underline-offset-4 hover:underline px-0",
      },
      color: {
        primary: "",
        red: "",
        neutral: "",
      },
      size: {
        default: "h-10 px-4 py-2 text-base",
        xs: "h-7 px-2 text-xs",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-5 text-lg",
      },
    },
    compoundVariants: [
      // Primary logic
      { variant: "default", color: "primary", className: "bg-blue-600 hover:bg-blue-700" },
      { variant: "subtle", color: "primary", className: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
      // Red logic
      { variant: "default", color: "red", className: "bg-red-600 hover:bg-red-700" },
      { variant: "ghost", color: "red", className: "text-red-600 hover:bg-red-50" },
    ],
    defaultVariants: {
      variant: "default",
      color: "primary",
      size: "default",
    },
  },
)

// 2. Define Props Interface for Autocomplete
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    leftIcon?: LucideIcon
    rightIcon?: LucideIcon
    isLoading?: boolean
  }

// 3. The Component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, color, size, leftIcon: LeftIcon, rightIcon: RightIcon, isLoading, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, color, size, className }))}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          LeftIcon && <LeftIcon className="mr-2 h-4 w-4" />
        )}

        {children}

        {!isLoading && RightIcon && <RightIcon className="ml-2 h-4 w-4" />}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button, buttonVariants }
