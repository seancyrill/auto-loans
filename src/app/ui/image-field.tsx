"use client"
import { cva } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const dropzoneVariants = cva(
  "flex flex-col items-center justify-center gap-2 w-full rounded-md border border-off bg-primary px-4 py-6 text-sm text-secondary transition-colors cursor-pointer hover:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
  {
    variants: {
      isDragging: {
        true: "border-accent ring-2 ring-accent bg-primary/80",
        false: "",
      },
      hasPreview: {
        true: "border-accent",
        false: "",
      },
    },
    defaultVariants: {
      isDragging: false,
      hasPreview: false,
    },
  },
)

interface ImageFieldProps {
  name: string
  label: string
  onChange: (base64: string | null) => void
  labelClassName?: string
}

export function ImageField({ name, label, onChange, labelClassName }: ImageFieldProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreview(result)
      onChange(result)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) handleFile(file)
  }

  return (
    <div className="flex w-full flex-col text-sm">
      {label && <label className={cn("text-negative text-nowrap", labelClassName)}>{label}</label>}

      <div
        className={dropzoneVariants({ isDragging, hasPreview: !!preview })}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />

        {preview ? (
          <img src={preview} alt={label} className="max-h-48 w-full rounded-sm object-contain" />
        ) : (
          <>
            {/* Upload icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-off h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <span className="text-off">Click or drag an image here</span>
          </>
        )}
      </div>

      {preview && (
        <button
          type="button"
          className="border-off text-negative hover:border-error hover:text-error mt-1 self-start rounded-md border px-3 py-1.5 text-xs transition-colors"
          onClick={() => {
            setPreview(null)
            onChange(null)
            if (inputRef.current) inputRef.current.value = ""
          }}
        >
          Remove
        </button>
      )}
    </div>
  )
}
