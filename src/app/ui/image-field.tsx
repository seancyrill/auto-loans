"use client"
import { cva } from "class-variance-authority"
import { Upload } from "lucide-react"
import { useRef, useState } from "react"
import { cn } from "../utils/cn"
import { Button } from "./button"

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

type ImageFieldProps = {
  name: string
  label: string
  onChange: (base64: string | null) => void
  labelClassName?: string
  initialPreview?: string | null
}

export function ImageField({ name, label, onChange, labelClassName, initialPreview = null }: ImageFieldProps) {
  const [preview, setPreview] = useState<string | null>(initialPreview)
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
            <Upload className="text-off" />
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

type ImageFieldMultipleProps = {
  name: string
  label: string
  onChange: (base64s: string[]) => void
  limit?: number
  labelClassName?: string
  initialPreviews?: string[]
}

export function ImageFieldMultiple({
  name,
  label,
  onChange,
  limit = 5,
  labelClassName,
  initialPreviews = [],
}: ImageFieldMultipleProps) {
  const [previews, setPreviews] = useState<string[]>(initialPreviews)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | File[]) => {
    const remaining = limit - previews.length
    const toProcess = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, remaining)

    toProcess.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        const updated = [...previews, result]
        setPreviews(updated)
        onChange(updated)
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemove = (index: number) => {
    const updated = previews.filter((_, i) => i !== index)
    setPreviews(updated)
    onChange(updated)
    if (inputRef.current) inputRef.current.value = ""
  }

  const atLimit = previews.length >= limit

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (!atLimit) handleFiles(e.dataTransfer.files)
  }

  return (
    <div className="flex w-full flex-col text-sm">
      {label && <label className={cn("text-negative text-nowrap", labelClassName)}>{label}</label>}

      {/* Dropzone — hidden when at limit */}
      {!atLimit && (
        <div
          className={dropzoneVariants({ isDragging, hasPreview: false })}
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
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) handleFiles(e.target.files)
            }}
          />
          <Upload className="text-off" />

          <span className="text-off">
            Click or drag images here{" "}
            <span className="text-xs">
              ({previews.length}/{limit})
            </span>
          </span>
        </div>
      )}

      {/* Previews grid */}
      {previews.length > 0 && (
        <div className="mt-2 grid grid-cols-3 gap-2">
          {previews.map((src, i) => (
            <div key={i} className="relative">
              <img src={src} alt={`${label} ${i + 1}`} className="h-24 w-full rounded-sm object-cover" />
              <Button
                type="button"
                onClick={() => handleRemove(i)}
                className="hover:text-error absolute right-1 bottom-1"
                size={"xs"}
                variant={"ghost"}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Re-show dropzone hint when at limit */}
      {atLimit && <p className="text-off mt-1 text-xs">Limit of {limit} images reached.</p>}
    </div>
  )
}
