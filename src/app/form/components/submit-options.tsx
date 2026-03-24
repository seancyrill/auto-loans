"use client"

import { useEffect, useRef } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────
interface SubmitModalProps {
  open: boolean
  onSubmitAsIs: () => void
  onFillMoreForms: () => void
  onClose: () => void
}

// ─── Modal Component ──────────────────────────────────────────────────────────
export function SubmitModal({ open, onSubmitAsIs, onFillMoreForms, onClose }: SubmitModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Open / close via the native dialog API
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

  return (
    <>
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="m-auto w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-[#1f2839] p-0 text-[#f5f5ef] shadow-2xl outline-none backdrop:bg-[#182134]/80 backdrop:backdrop-blur-sm"
      >
        <div className="flex flex-col gap-6 p-8">
          {/* ── Header ── */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[#f5f5ef]">Ready to Submit?</h2>
              <p className="mt-1 text-sm text-[#cccccc]">You have two options — pick what works best for you.</p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.05] text-xs text-[#cccccc] transition-colors hover:bg-white/[0.12] hover:text-[#f5f5ef]"
            >
              ✕
            </button>
          </div>

          {/* ── Divider ── */}
          <hr className="border-white/[0.08]" />

          {/* ── Options ── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Option A — Submit As Is */}
            <div className="flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
              <span className="w-fit rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] font-semibold tracking-widest text-[#cccccc] uppercase">
                Quick
              </span>

              {/* ↓ Drop your icon here */}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-[#cccccc]">
                {/* <YourIcon /> */}
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <h3 className="font-semibold text-[#f5f5ef]">Submit As Is</h3>
                <p className="text-sm leading-relaxed text-[#cccccc]">
                  Send your current submission without any additional information. You can always update it later.
                </p>
              </div>

              <button
                onClick={onSubmitAsIs}
                className="mt-auto w-full cursor-pointer rounded-lg border border-white/[0.08] bg-white/[0.06] py-2.5 text-sm font-medium text-[#f5f5ef] transition-colors hover:bg-white/[0.12]"
              >
                Submit Now
              </button>
            </div>

            {/* Option B — Auto-Generate */}
            <div className="flex flex-col gap-3 rounded-xl border border-[#b69e74]/30 bg-[#b69e74]/[0.07] p-5">
              <span className="w-fit rounded-full bg-[#b69e74]/[0.12] px-2.5 py-0.5 text-[10px] font-semibold tracking-widest text-[#b69e74] uppercase">
                Recommended
              </span>

              {/* ↓ Drop your icon here */}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#b69e74]/[0.15] text-[#b69e74]">
                {/* <YourIcon /> */}
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <h3 className="font-semibold text-[#f5f5ef]">Auto-Generate Documents</h3>
                <p className="text-sm leading-relaxed text-[#cccccc]">
                  {"Fill in a few more details and we'll "}
                  <strong className="font-medium text-[#f5f5ef]">automatically prepare all required documents</strong>
                  {" for you — saving hours of manual work."}
                </p>

                <ul className="mt-2 flex flex-col gap-1.5">
                  {["Required forms pre-filled", "Instant document generation", "Fewer follow-up requests"].map(
                    (perk) => (
                      <li key={perk} className="flex items-center gap-2 text-xs text-[#cccccc]">
                        {/* ↓ Drop your checkmark icon here */}
                        <span className="shrink-0 text-[#b69e74]">{/* <CheckIcon /> */}✓</span>
                        {perk}
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <button
                onClick={onFillMoreForms}
                className="mt-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#b69e74] py-2.5 text-sm font-medium text-[#182134] transition-colors hover:bg-[#c9b48a]"
              >
                Fill More &amp; Auto-Generate
                {/* ↓ Drop your arrow icon here */}
                <span>{/* <ArrowIcon /> */}→</span>
              </button>
            </div>
          </div>

          {/* ── Footer note ── */}
          <p className="text-center text-xs text-white/20">
            🔒 Your data is saved either way. You can return and upgrade your submission at any time.
          </p>
        </div>
      </dialog>

      {/* Entry animation — Tailwind JIT can't generate keyframes so we use a style tag */}
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
