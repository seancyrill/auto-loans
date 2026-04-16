"use client"

import { useState } from "react"
import LoadingSpinner from "../components/loading-spinner"
import { useApplication } from "../context/form-context"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { formatPhone } from "../utils/format-phone"
import NameFields from "./components/name-fields"
import { SubmitModal } from "./components/submit-options"

export default function Form() {
  const { applicationData, updateApplicationData, applicationLoading } = useApplication()
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setOpen(true)
  }

  if (applicationLoading.loading) {
    return <LoadingSpinner loadingText={applicationLoading.text ?? ""} />
  }

  return (
    <div className="bg-off flex flex-1 flex-col items-center justify-center p-2">
      <form
        className="border-off bg-primary flex max-w-120 flex-col gap-6 rounded-xl border p-8 shadow-md"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <h1 className="text-xl font-bold">Apply for a loan</h1>
          <h3 className="">{`First things first, let's get this out of the way.`}</h3>
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
        </div>

        <Button disabled={applicationLoading.loading}>Next</Button>
      </form>
      <SubmitModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
