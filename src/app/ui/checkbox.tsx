import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const sizeOptions = {
  default: "h-4 w-4",
  sm: "h-3 w-3",
  lg: "h-5 w-5",
  xl: "h-7 w-7",
}

const checkboxVariants = cva(
  "peer shrink-0 rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer appearance-none checked:bg-secondary checked:border-secondary",
  {
    variants: {
      variant: {
        default: "border-off focus-visible:ring-secondary",
        ghost: "border-transparent bg-gray-50",
      },
      size: sizeOptions,
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const checkmarkVariants = cva("pointer-events-none absolute inset-0 hidden peer-checked:block text-white", {
  variants: {
    size: sizeOptions,
  },
  defaultVariants: {
    size: "default",
  },
})

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof checkboxVariants> & {
    label?: string
  }

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, variant, size, label, id, ...props }, ref) => {
    const checkboxId = id ?? label?.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="flex items-center gap-2 text-sm">
        <div className={cn("relative flex shrink-0 items-center", sizeOptions)}>
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            className={cn(checkboxVariants({ variant, size, className }))}
            {...props}
          />
          <svg
            className={cn(checkmarkVariants({ size }))}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 8L6.5 11.5L13 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {!!label?.length && (
          <label htmlFor={checkboxId} className="cursor-pointer text-gray-700 select-none">
            {label}
          </label>
        )}
      </div>
    )
  },
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
