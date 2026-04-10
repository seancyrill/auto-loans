"use client"

import { cva, type VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "../utils/cn"

const selectionItemVariants = cva(
  "relative flex cursor-pointer select-none items-center gap-3 rounded-md border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: [
          "border-off text-gray-700",
          "data-[checked=true]:border-secondary data-[checked=true]:bg-secondary/5 data-[checked=true]:text-secondary",
          "hover:border-secondary/50",
          "focus-visible:ring-secondary",
        ],
        ghost: [
          "border-transparent bg-gray-50 text-gray-700",
          "data-[checked=true]:bg-secondary/10 data-[checked=true]:text-secondary",
          "hover:bg-gray-100",
          "focus-visible:ring-secondary",
        ],
      },
      size: {
        default: "min-h-10",
        sm: "min-h-8 px-2 text-xs",
        lg: "min-h-12 px-4 text-base",
      },
      layout: {
        list: "w-full",
        grid: "flex-row items-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      layout: "list",
    },
  },
)

export type SelectionOption = {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export type SelectionMenuProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> &
  VariantProps<typeof selectionItemVariants> & {
    label?: string
    options: SelectionOption[]
    value?: string
    onChange?: (value: string) => void
    name?: string
    columns?: 1 | 2 | 3
  }

const RadioDot = ({ checked }: { checked: boolean }) => (
  <span
    className={cn(
      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
      checked ? "border-secondary bg-secondary" : "border-off bg-transparent",
    )}
    aria-hidden="true"
  >
    {checked && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
  </span>
)

const SelectionMenu = React.forwardRef<HTMLDivElement, SelectionMenuProps>(
  ({ className, variant, size, label, options, value, onChange, name, columns = 1, ...props }, ref) => {
    const gridClass =
      columns === 2 ? "grid grid-cols-2 gap-2" : columns === 3 ? "grid grid-cols-3 gap-2" : "flex flex-col gap-2"

    const resolvedLayout = columns > 1 ? "grid" : "list"

    return (
      <div ref={ref} className={cn("w-full", className)} role="radiogroup" aria-label={label} {...props}>
        {!!label?.length && <label className="mb-2 block text-sm text-gray-700">{label}</label>}
        <div className={gridClass}>
          {options.map((option) => {
            const checked = value === option.value
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={checked}
                aria-disabled={option.disabled}
                data-checked={checked}
                disabled={option.disabled}
                tabIndex={0}
                onClick={() => !option.disabled && onChange?.(option.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    if (!option.disabled) onChange?.(option.value)
                  }
                }}
                className={cn(
                  selectionItemVariants({
                    variant,
                    size,
                    layout: resolvedLayout as "list" | "grid",
                  }),
                )}
              >
                <RadioDot checked={checked} />
                <span className={cn("flex min-w-0 flex-col gap-0.5 text-left capitalize", columns > 1)}>
                  <span className="leading-snug font-medium">{option.label}</span>
                  {option.description && (
                    <span className={cn("text-xs leading-snug text-gray-400", checked && "text-secondary/70")}>
                      {option.description}
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>

        {/* Hidden native radio inputs for form compatibility */}
        {name &&
          options.map((option) => (
            <input
              key={option.value}
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange?.(option.value)}
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
            />
          ))}
      </div>
    )
  },
)

SelectionMenu.displayName = "SelectionMenu"

const CheckDot = ({ checked }: { checked: boolean }) => (
  <span
    className={cn(
      "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
      checked ? "border-secondary bg-secondary" : "border-off bg-transparent",
    )}
    aria-hidden="true"
  >
    {checked && (
      <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 10 10" fill="none">
        <path
          d="M1.5 5L4 7.5L8.5 2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </span>
)

export type SelectionMenuMultipleProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> &
  VariantProps<typeof selectionItemVariants> & {
    label?: string
    options: SelectionOption[]
    value?: string[]
    onChange?: (value: string[]) => void
    name?: string
    columns?: 1 | 2 | 3
  }

const SelectionMenuMultiple = React.forwardRef<HTMLDivElement, SelectionMenuMultipleProps>(
  ({ className, variant, size, label, options, value = [], onChange, name, columns = 1, ...props }, ref) => {
    const gridClass =
      columns === 2 ? "grid grid-cols-2 gap-2" : columns === 3 ? "grid grid-cols-3 gap-2" : "flex flex-col gap-2"

    const resolvedLayout = columns > 1 ? "grid" : "list"

    const toggle = (optionValue: string) => {
      const next = value.includes(optionValue) ? value.filter((v) => v !== optionValue) : [...value, optionValue]
      onChange?.(next)
    }

    return (
      <div ref={ref} className={cn("w-full", className)} role="group" aria-label={label} {...props}>
        {!!label?.length && <label className="mb-2 block text-sm text-gray-700">{label}</label>}
        <div className={gridClass}>
          {options.map((option) => {
            const checked = value.includes(option.value)
            return (
              <button
                key={option.value}
                type="button"
                role="checkbox"
                aria-checked={checked}
                aria-disabled={option.disabled}
                data-checked={checked}
                disabled={option.disabled}
                tabIndex={0}
                onClick={() => !option.disabled && toggle(option.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    if (!option.disabled) toggle(option.value)
                  }
                }}
                className={cn(
                  selectionItemVariants({
                    variant,
                    size,
                    layout: resolvedLayout as "list" | "grid",
                  }),
                )}
              >
                <CheckDot checked={checked} />
                <span className={cn("flex min-w-0 flex-col gap-0.5 text-left", columns > 1)}>
                  <span className="leading-snug font-medium capitalize">{option.label}</span>
                  {option.description && (
                    <span
                      className={cn("text-xs leading-snug text-gray-400 capitalize", checked && "text-secondary/70")}
                    >
                      {option.description}
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>

        {/* Hidden native checkbox inputs for form compatibility */}
        {name &&
          options.map((option) => (
            <input
              key={option.value}
              type="checkbox"
              name={name}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={() => toggle(option.value)}
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
            />
          ))}
      </div>
    )
  },
)

SelectionMenuMultiple.displayName = "SelectionMenuMultiple"

export { selectionItemVariants, SelectionMenu, SelectionMenuMultiple }
