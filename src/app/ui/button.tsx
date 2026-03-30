"use client"

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
  "inline-flex items-center justify-center rounded-md font-medium cursor-pointer transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60 hover:brightness-90",
  {
    variants: {
      variant: {
        default: "text-primary bg-secondary",
        yellow: "text-primary bg-accent",
        subtle: "border bg-primary",
        ghost: "bg-primary text-negative",
        link: "bg-transparent underline-offset-4 hover:underline px-0",
        red: "text-primary bg-error",
      },
      size: {
        default: "h-10 px-4 py-2 text-base",
        xs: "h-7 px-2 text-xs",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

// 2. Define Props Interface for Autocomplete
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    leftIcon?: LucideIcon
    rightIcon?: LucideIcon
  }

// 3. The Component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, leftIcon: LeftIcon, rightIcon: RightIcon, children, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props}>
        {LeftIcon && <LeftIcon className="mr-2 h-4 w-4" />}

        {children}

        {RightIcon && <RightIcon className="ml-2 h-4 w-4" />}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button, buttonVariants }
