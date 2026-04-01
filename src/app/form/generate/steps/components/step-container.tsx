"use client"

import { clsx, type ClassValue } from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const StepContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex w-full max-w-120 flex-col items-center justify-center gap-4", className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)

StepContainer.displayName = "StepContainer"
