"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { LucideIcon } from "lucide-react"
import React from "react"
import { cn } from "../utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium cursor-pointer transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "rounded-md text-primary bg-secondary hover:bg-secondary/80 hover:text-neutral",
        yellow: "rounded-md text-primary bg-accent hover:bg-secondary/80",
        subtle: "rounded-md border bg-primary hover:bg-secondary/80 hover:text-neutral",
        ghost: "rounded-md bg-primary text-negative hover:border hover:text-secondary/80",
        link: "rounded-md bg-transparent underline-offset-4 hover:underline px-0",
        red: "rounded-md text-primary bg-error",
        hero1:
          "bg-secondary text-primary mt-1 flex gap-3 border-none font-semibold tracking-widest uppercase hover:bg-accent hover:text-secondary",
        hero2:
          "bg-accent hover:bg-secondary hover:text-accent font-semibold tracking-widest uppercase no-underline transition-colors duration-200",
        herolink:
          "hover:text-accent after:bg-accent relative tracking-widest uppercase no-underline after:absolute after:right-0 after:bottom-[-3px] after:left-0 after:h-px after:origin-left after:scale-x-0 after:duration-300 hover:after:scale-x-100",
      },
      size: {
        default: "h-10 px-6 py-2 text-base",
        xs: "h-7 px-4 text-xs",
        sm: "h-9 px-5 text-sm",
        lg: "h-11 px-7 text-lg",
        hero: "px-8 py-4 text-sm",
        herosm: "px-5 py-2.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    leftIcon?: LucideIcon
    rightIcon?: LucideIcon
  }

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
