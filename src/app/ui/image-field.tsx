"use client"
import { cva } from "class-variance-authority"
import { Upload } from "lucide-react"
import { useRef, useState } from "react"
import { useApplication } from "../context/form-context"
import { cn } from "../utils/cn"
import { Button } from "./button"

const dropzoneVariants = cva(
  "flex flex-col items-center h-full max-h-32 justify-center gap-2 w-full rounded-md border border-off bg-primary text-sm text-secondary transition-colors cursor-pointer hover:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
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
  labelClassName?: string
}

export function ImageField({ name, label, labelClassName }: ImageFieldProps) {
  const { updateImages, applicationImages } = useApplication()
  const onChange = (base64: string | null) => updateImages(name, base64 ? [base64] : [])
  const initialPreview = applicationImages.find((img) => img.name === name)?.image ?? null

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
          <img src={preview} alt={label} className="h-full w-full rounded-sm object-contain" />
        ) : (
          <div className="grid place-content-center gap-1 px-4 py-6">
            <Upload className="text-off mx-auto" />
            <span className="text-off">Click or drag an image here</span>
          </div>
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

  limit?: number
  labelClassName?: string
}

export function ImageFieldMultiple({
  name,
  label,

  limit = 5,
  labelClassName,
}: ImageFieldMultipleProps) {
  const { updateImages, applicationImages } = useApplication()
  const onChange = (base64s: string[]) => updateImages(name, base64s)
  const initialPreviews = applicationImages.filter((img) => img.name === name).map((img) => img.image)

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
          <div className="grid place-content-center gap-1 px-4 py-6">
            <Upload className="text-off mx-auto" />
            <span className="text-off">
              Click or drag images here{" "}
              <span className="text-xs">
                ({previews.length}/{limit})
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Previews grid */}
      {previews.length > 0 && (
        <div className="mt-2 grid grid-cols-3 gap-2">
          {previews.map((src, i) => (
            <div key={i} className="relative">
              <img src={src} alt={`${label} ${i + 1}`} className="h-full w-full rounded-sm object-contain" />
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
