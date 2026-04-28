"use client"

import { useApplication } from "@/app/context/form-context"
import { useStatus } from "@/app/context/status-provider"
import { Button } from "@/app/ui/button"
import { ArrowRight, Check, FileInput, Send } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

type SubmitModalProps = {
  open: boolean
  onClose: () => void
}

export function SubmitModal({ open, onClose }: SubmitModalProps) {
  const router = useRouter()
  const { resetApplication, applicationData, setApplicationLoading } = useApplication()
  const { showStatus, clearStatus } = useStatus()
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

  // ESC key trigger onClose
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
    setApplicationLoading({ loading: true, text: "Submitting" })

    const res = await fetch("/api/submit/quick", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationData, lender: "gdfi" }),
    })

    setApplicationLoading({ loading: false, text: "" })

    const data = await res.json()
    if (data.success) {
      onClose()
      setApplicationLoading({ loading: false, text: "" })

      showStatus({
        message:
          "Your application is successfully sent to your Loan Consultant. Please wait for them to contact and guide you. ",
        note: "The entire application process is FREE from start to finish. Beware of scammers.",
        closeRunsButtonFn: true,
        button: {
          text: "OK",
          function: () => {
            router.push("/")
            clearStatus()
            resetApplication()
          },
        },
      })
    } else {
      console.error(data.error)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="backdrop:bg-negative/50 animate-modal-in absolute top-1/2 left-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-transparent p-4 backdrop:backdrop-blur-xl"
    >
      <div className="bg-primary flex flex-col gap-6 rounded-2xl p-4 shadow-md outline-none sm:p-8">
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Ready to Submit?</h2>
            <p className="mt-1 text-sm">You have two options — pick what works best for you.</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="hover: border-off flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border text-xs transition-colors"
          >
            ✕
          </button>
        </div>
        {/* ── Divider ── */}
        <div className="border-off border-b" />
        {/* ── Options ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Option A — Submit As Is */}
          <div
            onClick={quickSubmit}
            className="border-off hover:bg-off/20 flex cursor-pointer flex-col gap-3 rounded-xl border p-5 hover:opacity-90"
          >
            <div className="flex items-center justify-between">
              <span className="border-off grid w-fit place-content-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase">
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
            <Button>Submit Now</Button>
          </div>
          {/* Option B — Auto-Generate */}
          <Link href={"/form/generate"}>
            <div className="bg-accent/15 text border-off flex cursor-pointer flex-col gap-3 rounded-xl border p-5 hover:opacity-80">
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
                        <Check size={14} className="text-accent" />
                        {perk}
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <Button variant={"yellow"} rightIcon={ArrowRight} className="font-bold">
                Generate
              </Button>
            </div>
          </Link>
        </div>
        <p className="text-secondary/50 w-full text-center text-xs">
          By choosing either options, you agree to our{" "}
          <Link
            target="_blank"
            href={"/privacy-policy"}
            className="cursor-pointer py-1 italic underline hover:opacity-80"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </dialog>
  )
}
