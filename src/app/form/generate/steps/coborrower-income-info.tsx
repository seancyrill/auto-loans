"use client"

import { useApplication } from "@/app/context/form-context"
import { Input, InputAmount } from "@/app/ui/input"
import { SelectionMenu } from "@/app/ui/selection"
import { useState } from "react"

export default function CoborrowerIncomeInfo() {
  const { updateCoBorrower, applicationData } = useApplication()
  const [incomeSource, setIncomeSource] = useState<IncomeOption>("employed")
  const INCOME_OPTIONS = ["employed", "business"] as const
  type IncomeOption = (typeof INCOME_OPTIONS)[number]

  const co = applicationData.coBorrower

  return (
    <>
      <SelectionMenu
        label="Income Source"
        columns={2}
        value={incomeSource}
        onChange={(e) => setIncomeSource(e as IncomeOption)}
        options={INCOME_OPTIONS.map((src) => ({ label: src, value: src }))}
      />
      <div className="flex w-full gap-1">
        {incomeSource === "employed" ? (
          <Input
            value={co.employerName}
            onChange={(e) => updateCoBorrower("employerName", e.target.value)}
            placeholder="Employer Name"
            label="Name of Employer"
          />
        ) : (
          <Input
            value={co.businessName}
            onChange={(e) => updateCoBorrower("businessName", e.target.value)}
            placeholder="Business Name"
            label="Name of Business"
          />
        )}
        <div className="flex max-w-22 gap-1">
          <Input
            value={co.employmentYears}
            onChange={(e) => updateCoBorrower("employmentYears", e.target.value)}
            placeholder="0"
            type="number"
            label="for Yrs"
          />
          <Input
            value={co.employmentMonths}
            onChange={(e) => updateCoBorrower("employmentMonths", e.target.value)}
            placeholder="0"
            type="number"
            label="& Mos"
          />
        </div>
      </div>
      <Input
        value={co.employerBusinessAddress}
        onChange={(e) => updateCoBorrower("employerBusinessAddress", e.target.value)}
        placeholder={incomeSource === "employed" ? "Employer Address" : "Business Address"}
        label={incomeSource === "employed" ? "Employer Address" : "Business Address"}
      />
      <InputAmount
        currency="PHP"
        value={co.monthlyIncome}
        onChange={(e) => updateCoBorrower("monthlyIncome", e)}
        label="Monthly Income"
      />
      <Input
        value={co.businessTelNumber}
        onChange={(e) => updateCoBorrower("businessTelNumber", e.target.value)}
        label="Business Tel. No."
      />
      <Input value={co.tin} onChange={(e) => updateCoBorrower("tin", e.target.value)} type="number" label="TIN" />
      <Input
        value={co.sssNumber}
        onChange={(e) => updateCoBorrower("sssNumber", e.target.value)}
        type="number"
        label="SSS No."
      />
      <Input
        value={co.gsisNumber}
        onChange={(e) => updateCoBorrower("gsisNumber", e.target.value)}
        type="number"
        label="GSIS No."
      />
    </>
  )
}
