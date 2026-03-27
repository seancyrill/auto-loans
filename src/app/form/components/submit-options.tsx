"use client"

import { useApplication } from "@/app/context/form-context"
import { Button } from "@/app/ui/button"
import { ArrowRight, Check, FileInput, Send } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

type SubmitModalProps = {
  open: boolean
  onClose: () => void
}

export function SubmitModal({ open, onClose }: SubmitModalProps) {
  const { resetApplication, applicationData, setApplicationLoading, applicationLoading } = useApplication()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [open])

  // Let the native ESC key trigger onClose
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

  // Close when clicking the ::backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect()
    if (!rect) return
    const outside = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom
    if (outside) onClose()
  }

  const quickSubmit = async () => {
    setApplicationLoading({ loading: true })

    // const res = await fetch("/api/submit", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ applicationData, lender: "gdfi" }),
    // })

    // const data = await res.json()
    // if (data.success) {
    //   // alert("Submitted successfully!")
    //   // resetApplication()
    // }

    setApplicationLoading({ loading: false })
    onClose()
  }

  return (
    <>
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="m-auto w-full max-w-2xl rounded-2xl border p-0 shadow-2xl outline-none backdrop:bg-[#182134]/80 backdrop:backdrop-blur-sm"
      >
        <div className="bg-primary flex flex-col gap-6 p-8">
          {/* ── Header ── */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Ready to Submit?</h2>
              <p className="mt-1 text-sm">You have two options — pick what works best for you.</p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="hover: flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-xs transition-colors"
            >
              ✕
            </button>
          </div>

          {/* ── Divider ── */}
          <hr />

          {/* ── Options ── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Option A — Submit As Is */}
            <div className="flex flex-col gap-3 rounded-xl border p-5">
              <div className="flex items-center justify-between">
                <span className="grid w-fit place-content-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase">
                  Quick
                </span>
                <Send />
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <h3 className="font-semibold">Submit As Is</h3>
                <p className="text-sm leading-relaxed">
                  You will be contacted by our agents and guide you how to proceed next.
                </p>
              </div>

              <Button onClick={quickSubmit}>Submit Now</Button>
            </div>

            {/* Option B — Auto-Generate */}
            <div className="bg-accent/15 text flex flex-col gap-3 rounded-xl border p-5">
              <div className="flex items-center justify-between">
                <span className="text-primary bg-accent w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase">
                  Recommended
                </span>
                <FileInput className="text-accent" />
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <h3 className="font-semibold">Auto-Generate Documents</h3>
                <p className="text-sm leading-relaxed">
                  {
                    "Fill in a few more details and we'll automatically prepare all required documents for you — saving hours of manual work."
                  }
                </p>

                <ul className="mt-2 flex flex-col gap-1.5">
                  {["Required forms pre-filled", "Instant document generation", "Fewer follow-up requests"].map(
                    (perk) => (
                      <li key={perk} className="flex items-center gap-2 text-xs">
                        <Check size={14} />
                        {perk}
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <Button onClick={onClose} variant={"yellow"} rightIcon={ArrowRight}>
                <Link href={"/generate"}>Generate Documents</Link>
              </Button>
            </div>
          </div>
        </div>
      </dialog>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: translateY(14px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        dialog[open] {
          animation: modal-in 0.25s cubic-bezier(0.34, 1.4, 0.64, 1) both;
        }
      `}</style>
    </>
  )
}
