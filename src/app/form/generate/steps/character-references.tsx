"use client"
import { useApplication } from "@/app/context/form-context"
import { Button } from "@/app/ui/button"
import { Input } from "@/app/ui/input"
import { formatPhone } from "@/app/utils/format-phone"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function CharacterReferences() {
  const { applicationData, updateArrayItem } = useApplication()
  const charRefs = applicationData.characterReferences ?? []

  const initRows = applicationData.characterReferences?.length
    ? applicationData.characterReferences.map((_, i) => i)
    : [0]
  const [rows, setRows] = useState(initRows)

  const addRow = () => {
    setRows((prev) => [...prev, prev.length])
  }

  return (
    <>
      {rows.map((i) => (
        <div key={`char-ref-${i}`} className={`border-off flex w-full flex-col rounded-lg border p-4`}>
          <h3 className="text-center font-bold">{i + 1}</h3>
          <Input
            value={charRefs[i]?.name ?? ""}
            onChange={(e) => updateArrayItem("characterReferences", i, { name: e.target.value })}
            placeholder="Juan S. Dela Cruz"
            label={"Full Name"}
          />
          <Input
            value={charRefs[i]?.address ?? ""}
            onChange={(e) => updateArrayItem("characterReferences", i, { address: e.target.value })}
            placeholder="123 Main St, Quezon City"
            label={"Address"}
          />
          <Input
            value={formatPhone(charRefs[i]?.contactNumber ?? "")}
            onChange={(e) => {
              const value = e.target.value.replace(/\s/g, "")
              if (value === "" || /^\d+$/.test(value) || value.length > 12) {
                updateArrayItem("characterReferences", i, { contactNumber: e.target.value })
              }
            }}
            maxLength={12}
            minLength={12}
            placeholder="9XX XXX XXXX"
            label="Mobile Number"
            mobile
          />
        </div>
      ))}

      <Button variant={"ghost"} onClick={addRow} type="button" className={`${rows.length >= 3 ? "hidden" : ""}`}>
        <Plus />
        Add More
      </Button>
    </>
  )
}
