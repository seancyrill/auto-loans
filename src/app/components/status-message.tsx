"use client"

import { Check, TriangleAlert, X } from "lucide-react"
import { useEffect, useRef } from "react"
import { StatusMessageState } from "../context/status-provider"
import { Button } from "../ui/button"

interface StatusMessageModalProps extends StatusMessageState {
  onClose: () => void
}

export function StatusMessageModal({ open, message, isError, button, onClose }: StatusMessageModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Drive open/close via native dialog API
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [open])

  // Wire ESC key to onClose
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleCancel = (e: Event) => {
      e.preventDefault()
      onClose()
    }
    dialog.addEventListener("cancel", handleCancel)
    return () => dialog.removeEventListener("cancel", handleCancel)
  }, [onClose])

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect()
    if (!rect) return
    const outside = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom
    if (outside) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="backdrop:bg-negative/50 animate-modal-in m-auto max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl outline-none backdrop:backdrop-blur-sm"
      style={{
        borderColor: isError
          ? "color-mix(in srgb, var(--error) 40%, transparent)"
          : "color-mix(in srgb, var(--accent) 30%, transparent)",
      }}
    >
      <div className="bg-primary flex max-w-sm min-w-80 flex-col gap-4 p-6">
        <div className="flex items-center gap-4">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
            style={{
              background: isError
                ? "color-mix(in srgb, var(--error) 15%, transparent)"
                : "color-mix(in srgb, var(--accent) 15%, transparent)",
              color: isError ? "var(--error)" : "var(--accent)",
            }}
          >
            {isError ? <TriangleAlert /> : <Check />}
          </div>

          <h2 className="flex-1 font-semibold">{isError ? "Error" : "Success"}</h2>

          <Button variant={"ghost"} onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <p className="mt-1 text-sm leading-relaxed">{message}</p>

        {/* ── Actions ── */}
        {button && (
          <Button className="mx-auto w-fit text-sm" size={"sm"} onClick={button.function}>
            {button.text}
          </Button>
        )}
      </div>
    </dialog>
  )
}
