"use client"
import { useApplication } from "@/app/context/form-context"
import { LOAN_OPTIONS, LoanOption } from "@/app/context/form-context-types"
import { SelectionMenu } from "@/app/ui/selection"

export default function LoanOptions() {
  const { applicationData, updateApplicationData } = useApplication()

  return (
    <>
      <SelectionMenu
        label="Loan Options"
        value={applicationData.loanOption}
        onChange={(val) => updateApplicationData("loanOption", val as LoanOption)}
        options={LOAN_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
      />
    </>
  )
}
