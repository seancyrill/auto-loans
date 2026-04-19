"use client"

import { useMemo, useState } from "react"
import LoadingSpinner from "../components/loading-spinner"
import { useApplication } from "../context/form-context"
import { LENDER_OPTIONS, LenderOption } from "../context/form-context-types"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { SelectionMenu } from "../ui/selection"
import { formatPhone } from "../utils/format-phone"
import NameFields from "./components/name-fields"
import { SubmitModal } from "./components/submit-options"

const lenderLogos: { val: LenderOption; logo: string }[] = [
  { val: "Global Dominion Financing Inc.", logo: "/gdfi-logo.png" },
]

export default function Form() {
  const { applicationData, updateApplicationData, applicationLoading } = useApplication()
  const [open, setOpen] = useState(false)

  const lender = useMemo(() => lenderLogos.find((ldr) => ldr.val === applicationData.lender), [applicationData.lender])

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setOpen(true)
  }

  if (applicationLoading.loading) {
    return <LoadingSpinner loadingText={applicationLoading.text ?? ""} />
  }

  return (
    <main className="bg-off flex flex-1 flex-col items-center justify-center p-2">
      <form
        className="border-off bg-primary flex max-w-120 flex-col gap-6 rounded-xl border p-8 shadow-md"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <h1 className="text-xl font-bold">Apply for a loan</h1>
          <h3 className="">{`Please provide the basic information.`}</h3>
        </div>

        <div className="flex flex-col gap-2">
          <NameFields />
          <Input
            value={formatPhone(applicationData.mobile)}
            required
            onChange={(e) => {
              const value = e.target.value.replace(/\s/g, "")
              if (value === "" || /^\d+$/.test(value) || value.length > 12) {
                updateApplicationData("mobile", value)
              }
            }}
            maxLength={12}
            minLength={12}
            placeholder="9XX XXX XXXX"
            label="Mobile Number"
            mobile
          />

          <div className="flex w-full flex-col items-start">
            <div className="flex items-center gap-1">
              <label className="text-sm">Preferred Lender</label>
              <p className="text-secondary/50 text-[0.6rem]">{`(More options coming soon)`}</p>
            </div>
            {lender && <img src={lender.logo} alt="lender logo" className="mt-1 mb-2 h-8 object-contain" />}
            <SelectionMenu
              value={applicationData.lender}
              onChange={(val) => updateApplicationData("lender", val as LenderOption)}
              options={LENDER_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
            />
          </div>
        </div>

        <Button disabled={applicationLoading.loading}>Next</Button>
      </form>
      <SubmitModal open={open} onClose={() => setOpen(false)} />
    </main>
  )
}
