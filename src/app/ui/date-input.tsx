import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const inputVariants = cva(
  "flex w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-off focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 user-invalid:border-error invalid:focus:border-none",
  {
    variants: {
      variant: {
        default: "border-off focus-visible:ring-secondary",
        ghost: "border-transparent bg-gray-50 focus-visible:bg-white",
      },
      size: {
        default: "h-10",
        sm: "h-8 px-2 text-xs",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export type DateInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> &
  VariantProps<typeof inputVariants> & {
    label?: string
    value?: string
    onChange?: (e: { target: { value: string } }) => void
  }

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, variant, size, label, value, onChange, ...props }, ref) => {
    const parseDate = (str?: string) => {
      if (!str) return null
      const d = new Date(str) // "Jan 15, 2024" is natively parseable by Date
      return isNaN(d.getTime()) ? null : d
    }

    const formatDate = (date: Date | null) => {
      if (!date) return ""
      const month = date.toLocaleString("default", { month: "short" }) // "Jan", "Feb", etc.
      const dd = String(date.getDate()).padStart(2, "0")
      const yyyy = date.getFullYear()
      return `${month} ${dd}, ${yyyy}` // "Jan 15, 2024"
    }

    return (
      <div className="text-sm">
        {!!label?.length && <label>{label}</label>}
        <div className="flex gap-1">
          <DatePicker
            selected={parseDate(value)}
            onChange={(date: Date | null) => onChange?.({ target: { value: formatDate(date) } })}
            placeholderText={props.placeholder ?? "MM/DD/YYYY"}
            dateFormat="MMM dd, yyyy"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            disabled={props.disabled}
            required={props.required}
            customInput={<input ref={ref} className={cn(inputVariants({ variant, size, className }))} {...props} />}
          />
        </div>
      </div>
    )
  },
)
DateInput.displayName = "DateInput"

export { DateInput }
