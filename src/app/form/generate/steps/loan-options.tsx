"use client"
import { useApplication } from "@/app/context/form-context"
import { INCOME_OPTIONS, IncomeSource } from "@/app/context/form-context-types"
import { SelectionMenuMultiple } from "@/app/ui/selection"

export default function LoanOptions() {
  const { applicationData, updateApplicationData } = useApplication()

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <SelectionMenuMultiple
        label="Source of income"
        name="incomeSource"
        value={applicationData.incomeSources}
        onChange={(val) => updateApplicationData("incomeSources", val as IncomeSource[])}
        options={INCOME_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
      />
    </div>
  )
}
