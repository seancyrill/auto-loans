"use client"
import { useApplication } from "@/app/context/form-context"
import { Button } from "@/app/ui/button"
import { Input } from "@/app/ui/input"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function Dependents() {
  const { applicationData, updateArrayItem } = useApplication()
  const depRefs = applicationData.dependents ?? []

  const initRows = applicationData.dependents?.length ? applicationData.dependents.map((_, i) => i) : [0]
  const [rows, setRows] = useState(initRows)

  const addRow = () => {
    setRows((prev) => [...prev, prev.length])
  }

  const nameOnChange = (val: string, i: number) => {
    // auto fill child
    if (val && !applicationData?.dependents?.[i]?.name && !applicationData?.dependents?.[i]?.relationship) {
      updateArrayItem("dependents", i, { relationship: "Child" })
    }

    updateArrayItem("dependents", i, { name: val })
  }

  return (
    <>
      {rows.map((i) => (
        <div key={`trade-ref-${i}`} className={`border-off flex w-full flex-col rounded-lg border p-4`}>
          <h3 className="text-center font-bold">{i + 1}</h3>
          <Input
            value={depRefs[i]?.name ?? ""}
            onChange={(e) => nameOnChange(e.target.value, i)}
            placeholder="Name"
            label="Name"
          />
          <Input
            value={depRefs[i]?.age ?? ""}
            onChange={(e) => updateArrayItem("dependents", i, { age: e.target.value })}
            placeholder="8"
            label="Age"
          />
          <Input
            value={depRefs[i]?.schoolLastAttended ?? ""}
            onChange={(e) => updateArrayItem("dependents", i, { schoolLastAttended: e.target.value })}
            placeholder="NEUST"
            label="School Last Attended"
          />
          <Input
            value={depRefs[i]?.relationship ?? ""}
            onChange={(e) => updateArrayItem("dependents", i, { relationship: e.target.value })}
            placeholder="Child"
            label="Relationship"
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
