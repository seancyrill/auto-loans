import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const inputVariants = cva(
  "flex w-full rounded-md border bg-transparent px-3 py-2 text-sm bg-primary transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-off focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 user-invalid:border-error invalid:focus:border-none",
  {
    variants: {
      variant: {
        default: "border-off focus-visible:ring-secondary",
        ghost: "border-transparent bg-gray-50 focus-visible:bg-white",
      },
      sizeVariant: {
        default: "h-10",
        sm: "h-8 px-2 text-xs",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      sizeVariant: "default",
    },
  },
)

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & { label?: string; mobile?: boolean; labelClassName?: string }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, sizeVariant, label, mobile, labelClassName, ...props }, ref) => {
    return (
      <div className={cn("flex w-full flex-col text-sm")}>
        {!!label?.length && <label className={cn("text-nowrap", labelClassName)}>{label}</label>}

        <div className="flex gap-1">
          {mobile && <span className="grid place-content-center">+63</span>}
          <input ref={ref} className={cn(inputVariants({ variant, sizeVariant, className }))} {...props} />
        </div>
      </div>
    )
  },
)

Input.displayName = "Input"

export { Input, inputVariants }
