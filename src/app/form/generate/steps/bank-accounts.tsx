"use client"
import { useApplication } from "@/app/context/form-context"
import { AccountType } from "@/app/context/form-context-types"
import { Button } from "@/app/ui/button"
import { Input } from "@/app/ui/input"
import { Plus } from "lucide-react"
import { FocusEvent, useState } from "react"

export default function BankAccounts() {
  const { applicationData, updateArrayItem, fullName } = useApplication()
  const accountRefs = applicationData.bankAccounts ?? []

  const initRows = applicationData.bankAccounts?.length ? applicationData.bankAccounts.map((_, i) => i) : [0]
  const [rows, setRows] = useState(initRows)

  const addRow = () => {
    setRows((prev) => [...prev, prev.length])
  }

  const autoFillEmptyName = (e: FocusEvent<HTMLInputElement, Element>, i: number) => {
    if (e.target.value === "") {
      updateArrayItem("bankAccounts", i, { accountName: fullName })
    }
  }

  return (
    <>
      {rows.map((i) => (
        <div key={`char-ref-${i}`} className={`border-off flex w-full flex-col rounded-lg border p-4`}>
          <h3 className="text-center font-bold">{i + 1}</h3>
          <Input
            value={accountRefs[i]?.accountName ?? ""}
            onChange={(e) => updateArrayItem("bankAccounts", i, { accountName: e.target.value })}
            placeholder={fullName}
            label={"Account Name"}
            onFocus={(e) => autoFillEmptyName(e, i)}
          />
          <Input
            value={accountRefs[i]?.accountNumber ?? ""}
            onChange={(e) => updateArrayItem("bankAccounts", i, { accountNumber: e.target.value })}
            label={"Account Number"}
          />
          <div className="flex gap-1">
            <Input
              value={accountRefs[i]?.accountType ?? ""}
              onChange={(e) => updateArrayItem("bankAccounts", i, { accountType: e.target.value as AccountType })}
              label={"Account Type"}
              placeholder="Savings"
            />
            <Input
              value={accountRefs[i]?.bankBranch ?? ""}
              onChange={(e) => updateArrayItem("bankAccounts", i, { bankBranch: e.target.value })}
              label={"Bank Branch"}
              placeholder="BDO Sangitan"
            />
          </div>
        </div>
      ))}
      <Button variant={"ghost"} onClick={addRow} type="button" className={`${rows.length >= 3 ? "hidden" : ""}`}>
        <Plus />
        Add More
      </Button>
    </>
  )
}
