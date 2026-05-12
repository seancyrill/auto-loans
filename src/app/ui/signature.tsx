"use client"

import { cva, type VariantProps } from "class-variance-authority"
import React, { useEffect, useImperativeHandle, useRef, useState } from "react"
import SignatureCanvas from "react-signature-canvas"
import { cn } from "../utils/cn"
import { Button } from "./button"

const signaturePadVariants = cva("relative w-full rounded-md border bg-transparent transition-colors overflow-hidden", {
  variants: {
    variant: {
      default: "border-off focus-within:ring-2 focus-within:ring-secondary",
      ghost: "border-transparent bg-gray-50",
    },
    sizeVariant: {
      default: "h-36",
      sm: "h-24",
      lg: "h-48",
    },
  },
  defaultVariants: {
    variant: "default",
    sizeVariant: "default",
  },
})

export interface SignaturePadRef {
  clear: () => void
  isEmpty: () => boolean
  toDataURL: () => string | null
}

export type SignaturePadProps = VariantProps<typeof signaturePadVariants> & {
  label?: string
  labelClassName?: string
  className?: string
  canvasClassName?: string
  penColor?: string
  onSave?: (dataURL: string) => void
  onClear?: () => void
  disabled?: boolean
  initialValue?: string | null
}

const SignaturePad = React.forwardRef<SignaturePadRef, SignaturePadProps>(
  (
    {
      className,
      canvasClassName,
      variant,
      sizeVariant,
      label,
      labelClassName,
      penColor = "black",
      onSave,
      onClear,
      disabled = false,
      initialValue,
    },
    ref,
  ) => {
    const sigRef = useRef<SignatureCanvas>(null)
    const [isEmpty, setIsEmpty] = useState(!initialValue)

    useEffect(() => {
      if (!initialValue || !sigRef.current) return

      const canvas = sigRef.current.getCanvas()
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
      }

      img.src = initialValue
    }, [])

    const handleEnd = () => {
      if (!sigRef.current || sigRef.current.isEmpty()) return
      const dataURL = sigRef.current.getTrimmedCanvas().toDataURL("image/png")
      onSave?.(dataURL)
      setIsEmpty(false)
    }

    const handleClear = () => {
      sigRef.current?.clear()
      setIsEmpty(true)
      onClear?.()
    }

    useImperativeHandle(ref, () => ({
      clear: handleClear,
      isEmpty: () => sigRef.current?.isEmpty() ?? true,
      toDataURL: () =>
        sigRef.current && !sigRef.current.isEmpty() ? sigRef.current.getTrimmedCanvas().toDataURL("image/png") : null,
    }))

    return (
      <div className="flex w-full flex-col gap-1 text-sm">
        {!!label?.length && <label className={cn("text-nowrap", labelClassName)}>{label}</label>}

        <div className={cn(signaturePadVariants({ variant, sizeVariant, className }))}>
          <SignatureCanvas
            ref={sigRef}
            penColor={penColor}
            onEnd={handleEnd}
            canvasProps={{
              className: cn("w-full h-full", canvasClassName),
            }}
          />

          {isEmpty && (
            <span className="text-off pointer-events-none absolute inset-0 flex items-center justify-center text-sm select-none">
              Sign here
            </span>
          )}

          {disabled && <div className="absolute inset-0 cursor-not-allowed bg-transparent opacity-50" />}
        </div>

        <div className="mt-1 flex justify-end gap-2">
          <Button onClick={handleClear} disabled={disabled || isEmpty} variant={"subtle"} size={"xs"}>
            Clear
          </Button>
        </div>
      </div>
    )
  },
)

SignaturePad.displayName = "SignaturePad"

export { SignaturePad, signaturePadVariants }
