"use client"

import { useApplication } from "@/app/context/form-context"
import { Input, InputAmount } from "@/app/ui/input"
import { SelectionMenu } from "@/app/ui/selection"
import { useState } from "react"
import { StepContainer } from "./components/step-container"

export default function CoborrowerIncomeInfo() {
  const { updateApplicationData, applicationData } = useApplication()
  const [incomeSource, setIncomeSource] = useState<IncomeOption>("employed")
  const INCOME_OPTIONS = ["employed", "business"] as const
  type IncomeOption = (typeof INCOME_OPTIONS)[number]

  return (
    <StepContainer>
      <SelectionMenu
        label="Income Source"
        columns={2}
        value={incomeSource}
        onChange={(e) => setIncomeSource(e as IncomeOption)}
        options={INCOME_OPTIONS.map((src) => ({ label: src, value: src }))}
      />

      <div className="flex w-full gap-1">
        {incomeSource === "employed" ? (
          <>
            <Input
              value={applicationData.coEmployerName}
              onChange={(e) => updateApplicationData("coEmployerName", e.target.value)}
              placeholder="Employer Name"
              label="Name of Employer"
            />
          </>
        ) : (
          <>
            <Input
              value={applicationData.coBusinessName}
              onChange={(e) => updateApplicationData("coBusinessName", e.target.value)}
              placeholder="Business Name"
              label="Name of Business"
            />
          </>
        )}
        <div className="flex max-w-22 gap-1">
          <Input
            value={applicationData.coEmploymentYears}
            onChange={(e) => updateApplicationData("coEmploymentYears", e.target.value)}
            placeholder="0"
            label="for Yrs"
          />
          <Input
            value={applicationData.coEmploymentMonths}
            onChange={(e) => updateApplicationData("coEmploymentMonths", e.target.value)}
            placeholder="0"
            label="& Mos"
          />
        </div>
      </div>

      <Input
        value={applicationData.coEmployerBusinessAddress}
        onChange={(e) => updateApplicationData("coEmployerBusinessAddress", e.target.value)}
        placeholder={incomeSource === "employed" ? "Employer Address" : "Business Address"}
        label={incomeSource === "employed" ? "Employer Address" : "Business Address"}
      />

      <InputAmount
        currency="PHP"
        value={applicationData.coMonthlyIncome}
        onChange={(e) => updateApplicationData("coMonthlyIncome", e)}
        label="Monthly Income"
      />
      <Input
        value={applicationData.coBusinessTelNumber}
        onChange={(e) => updateApplicationData("coBusinessTelNumber", e.target.value)}
        label="Business Tel. No."
      />

      <Input
        value={applicationData.coTin}
        onChange={(e) => updateApplicationData("coTin", e.target.value)}
        label="TIN"
      />
      <Input
        value={applicationData.coSssNumber}
        onChange={(e) => updateApplicationData("coSssNumber", e.target.value)}
        label="SSS No."
      />
      <Input
        value={applicationData.coGsisNumber}
        onChange={(e) => updateApplicationData("coGsisNumber", e.target.value)}
        label="GSIS No."
      />
    </StepContainer>
  )
}
