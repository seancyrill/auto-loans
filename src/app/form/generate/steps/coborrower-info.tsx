"use client"
import { useApplication } from "@/app/context/form-context"
import { Citizenship, CITIZENSHIP_OPTIONS, Gender, GENDER_OPTIONS } from "@/app/context/form-context-types"
import { DateInput } from "@/app/ui/date-input"
import { Input } from "@/app/ui/input"
import { SelectionMenu } from "@/app/ui/selection"
import { formatPhone } from "@/app/utils/format-phone"
import { useEffect, useRef } from "react"
import { StepContainer } from "./components/step-container"

export default function CoborrowerInformation() {
  const { applicationData, updateApplicationData } = useApplication()

  const otherRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (applicationData.citizenship === "others") {
      otherRef.current?.focus()
    }
  }, [applicationData.citizenship])

  return (
    <StepContainer>
      <div className="flex w-full gap-1">
        <Input
          value={applicationData.coFirstName}
          onChange={(e) => updateApplicationData("coFirstName", e.target.value)}
          placeholder="Maria"
          label="First Name"
        />
        <Input
          value={applicationData.coMiddleName}
          onChange={(e) => updateApplicationData("coMiddleName", e.target.value)}
          placeholder="Santos"
          label="Middle Name"
        />
        <Input
          value={applicationData.coLastName}
          onChange={(e) => updateApplicationData("coLastName", e.target.value)}
          placeholder="Dela Cruz"
          label="Last Name"
        />
        <span className="w-10">
          <Input
            value={applicationData.coNameSuffix}
            onChange={(e) => updateApplicationData("coNameSuffix", e.target.value)}
            placeholder="Jr."
            label="Suffix"
          />
        </span>
      </div>

      <DateInput
        value={applicationData.coBirthDate}
        onChange={(e) => updateApplicationData("coBirthDate", e.target.value)}
        placeholder="MM/DD/YYYY"
        label="Date of Birth"
      />
      <Input
        value={applicationData.coBirthPlace}
        onChange={(e) => updateApplicationData("coBirthPlace", e.target.value)}
        placeholder="Cabanatuan"
        label="Place of Birth"
      />
      <SelectionMenu
        label="Gender"
        columns={2}
        value={applicationData.coGender}
        onChange={(val) => updateApplicationData("coGender", val as Gender)}
        options={GENDER_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
      />

      <Input
        value={formatPhone(applicationData.coMobile)}
        onChange={(e) => {
          const value = e.target.value.replace(/\s/g, "")
          if (value === "" || /^\d+$/.test(value) || value.length > 12) {
            updateApplicationData("coMobile", value)
          }
        }}
        maxLength={12}
        minLength={12}
        label="Mobile Number"
        mobile
      />

      <div className="flex w-full flex-col">
        <SelectionMenu
          label="Citizenship"
          columns={2}
          value={applicationData.coCitizenship}
          onChange={(val) => updateApplicationData("coCitizenship", val as Citizenship)}
          options={CITIZENSHIP_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
        />
        {applicationData.coCitizenship === "others" && (
          <span className="bg-negative rounded-tl-4xl rounded-b-2xl px-1 pb-0.5">
            <Input
              value={applicationData.coCitizenshipOther}
              onChange={(e) => updateApplicationData("coCitizenshipOther", e.target.value)}
              placeholder="e.g. American"
              sizeVariant="sm"
              label="Please specify citizenship"
              className="rounded-xl"
              labelClassName="text-primary text-right"
            />
          </span>
        )}
      </div>

      <Input
        value={applicationData.coSchoolName}
        onChange={(e) => updateApplicationData("coSchoolName", e.target.value)}
        label="School Name"
      />
      <Input
        value={applicationData.coSchoolGradeLevel}
        onChange={(e) => updateApplicationData("coSchoolGradeLevel", e.target.value)}
        placeholder="Bachelor of Science"
        label="Grade / Level / College Course"
      />
      <Input
        value={applicationData.coSchoolYearGraduated}
        onChange={(e) => updateApplicationData("coSchoolYearGraduated", e.target.value)}
        placeholder="2020"
        label="Year Graduated / Last Year of Stay"
      />
    </StepContainer>
  )
}
