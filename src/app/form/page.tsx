"use client"

import { useState } from "react"
import { useApplication } from "../context/form-context"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { formatPhone } from "../utils/format-number"
import { SubmitModal } from "./components/submit-options"

export default function Form() {
  const { applicationData, updateApplicationData, resetApplication } = useApplication()
  const [open, setOpen] = useState(false)
  const [isLoaidng, setIsLoaidng] = useState(false)

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setIsLoaidng(true)

    // const res = await fetch("/api/submit", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ applicationData, lender: "gdfi" }),
    // })

    // const data = await res.json()
    // if (data.success) {
    alert("Submitted successfully!")
    resetApplication()
    // }

    setIsLoaidng(false)
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
          placeholder="912 123 1234"
          label="Mobile Number"
          mobile
        />

        <Button type="submit" className="mt-4" disabled={isLoaidng}>
          Submit
        </Button>

        <SubmitModal
          open={open}
          onSubmitAsIs={() => {
            alert("Submitted as is!")
            setOpen(false)
          }}
          onFillMoreForms={() => {
            alert("Redirecting to extended form...")
            setOpen(false)
          }}
          onClose={() => setOpen(false)}
        />
      </form>
    </div>
  )
}
