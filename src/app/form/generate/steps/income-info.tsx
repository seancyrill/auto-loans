"use client"

import { useApplication } from "@/app/context/form-context"
import {
  INCOME_SOURCE_OPTIONS,
  IncomeSourceType,
  NATURE_OF_WORK_OPTIONS,
  NatureOfWork,
} from "@/app/context/form-context-types"
import { Input } from "@/app/ui/input"
import { SelectionMenuMultiple } from "@/app/ui/selection"

export default function IncomeInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <>
      <SelectionMenuMultiple
        label="Source of Income / Funds"
        columns={2}
        className="w-full"
        value={applicationData.incomeSources}
        onChange={(val) => updateApplicationData("incomeSources", val as IncomeSourceType[])}
        options={INCOME_SOURCE_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
      />

      {(applicationData.incomeSources.includes("business") || applicationData.incomeSources.includes("employment")) && (
        <div className="flex w-full flex-col">
          <SelectionMenuMultiple
            label="Nature of Work / Business"
            columns={2}
            value={applicationData.natureOfWork}
            onChange={(val) => updateApplicationData("natureOfWork", val as NatureOfWork[])}
            options={NATURE_OF_WORK_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
          />
          {applicationData.natureOfWork.includes("others") && (
            <span className="bg-negative rounded-tl-4xl rounded-b-2xl px-1 pb-0.5">
              <Input
                value={applicationData.natureOfWorkOther}
                onChange={(e) => updateApplicationData("natureOfWorkOther", e.target.value)}
                placeholder="Please specify"
                label="Nature of Work (Other)"
                className="rounded-xl"
                labelClassName="text-primary text-right"
              />
            </span>
          )}
        </div>
      )}

      {/* TIN / SSS / GSIS */}
      <Input
        value={applicationData.tin}
        onChange={(e) => updateApplicationData("tin", e.target.value)}
        type="number"
        label="TIN"
      />
      <Input
        value={applicationData.sssNumber}
        onChange={(e) => updateApplicationData("sssNumber", e.target.value)}
        type="number"
        label="SSS Number"
      />
      <Input
        value={applicationData.gsisNumber}
        onChange={(e) => updateApplicationData("gsisNumber", e.target.value)}
        type="number"
        label="GSIS Number"
      />

      <Input
        value={applicationData.prcLicenseNumber}
        onChange={(e) => updateApplicationData("prcLicenseNumber", e.target.value)}
        type="number"
        label="PRC License No. (if applicable)"
      />
    </>
  )
}
