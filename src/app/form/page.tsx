"use client"

import { useState } from "react"
import LoadingSpinner from "../components/loading-spinner"
import { useApplication } from "../context/form-context"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { formatPhone } from "../utils/format-number"
import { SubmitModal } from "./components/submit-options"

export default function Form() {
  const { applicationData, updateApplicationData, applicationLoading } = useApplication()
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setOpen(true)
  }

  if (applicationLoading.loading) {
    return (
      <div className="bg-primary fixed top-0 left-0 grid h-full w-full place-content-center">
        <p>{applicationLoading.text ?? "Initializing..."}</p>
      </div>
    )
  }

  if (applicationLoading.loading) {
    return <LoadingSpinner loadingText={applicationLoading.text ?? ""} />
  }

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <form
        className="border-off flex max-w-md flex-col gap-1.5 rounded-md border p-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex gap-1.5">
          <Input
            value={applicationData.lastName}
            required
            onChange={(e) => updateApplicationData("lastName", e.target.value)}
            placeholder="Dela Cruz"
            label="Last Name"
          />
          <Input
            value={applicationData.firstName}
            required
            onChange={(e) => updateApplicationData("firstName", e.target.value)}
            placeholder="Juan"
            label="First Name"
          />
          <Input
            value={applicationData.middleName}
            onChange={(e) => updateApplicationData("middleName", e.target.value)}
            placeholder="Pangilinan"
            label="Middle Name"
          />
          <Input
            value={applicationData.nameSuffix}
            className="w-10"
            onChange={(e) => updateApplicationData("nameSuffix", e.target.value)}
            placeholder="II"
            label="Suffix"
          />
        </div>

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

        <Button className="mt-4" disabled={applicationLoading.loading}>
          Submit
        </Button>
      </form>
      <SubmitModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
