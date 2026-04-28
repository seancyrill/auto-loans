"use client"
import { useApplication } from "@/app/context/form-context"
import { Citizenship, CITIZENSHIP_OPTIONS, Gender, GENDER_OPTIONS } from "@/app/context/form-context-types"
import { DateInput } from "@/app/ui/date-input"
import { Input } from "@/app/ui/input"
import { SelectionMenu } from "@/app/ui/selection"
import { formatPhone } from "@/app/utils/format-phone"
import { useEffect, useRef } from "react"

export default function CoborrowerInformation() {
  const { applicationData, updateCoBorrower } = useApplication()
  const co = applicationData.coBorrower

  const otherRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (applicationData.citizenship === "others") {
      otherRef.current?.focus()
    }
  }, [applicationData.citizenship])

  return (
    <>
      <div className="flex w-full gap-1">
        <Input
          value={co.firstName}
          onChange={(e) => updateCoBorrower("firstName", e.target.value)}
          placeholder="Maria"
          label="First Name"
        />
        <Input
          value={co.middleName}
          onChange={(e) => updateCoBorrower("middleName", e.target.value)}
          placeholder="Santos"
          label="Middle Name"
        />
        <Input
          value={co.lastName}
          onChange={(e) => updateCoBorrower("lastName", e.target.value)}
          placeholder="Dela Cruz"
          label="Last Name"
        />
        <span className="w-10">
          <Input
            value={co.nameSuffix}
            onChange={(e) => updateCoBorrower("nameSuffix", e.target.value)}
            placeholder="Jr."
            label="Suffix"
          />
        </span>
      </div>

      <DateInput
        value={co.birthDate}
        onChange={(e) => updateCoBorrower("birthDate", e.target.value)}
        placeholder="MM/DD/YYYY"
        label="Date of Birth"
      />
      <Input
        value={co.birthPlace}
        onChange={(e) => updateCoBorrower("birthPlace", e.target.value)}
        placeholder="Cabanatuan"
        label="Place of Birth"
      />
      <SelectionMenu
        label="Gender"
        columns={2}
        value={co.gender}
        onChange={(val) => updateCoBorrower("gender", val as Gender)}
        options={GENDER_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
      />

      <Input
        value={formatPhone(co.mobile)}
        onChange={(e) => {
          const value = e.target.value.replace(/\s/g, "")
          if (value === "" || /^\d+$/.test(value) || value.length > 12) {
            updateCoBorrower("mobile", value)
          }
        }}
        maxLength={12}
        minLength={12}
        type="tel"
        label="Mobile Number"
        placeholder="9XX XXX XXXX"
        mobile
      />

      <div className="flex w-full flex-col">
        <SelectionMenu
          label="Citizenship"
          columns={2}
          value={co.citizenship}
          onChange={(val) => updateCoBorrower("citizenship", val as Citizenship)}
          options={CITIZENSHIP_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
        />
        {co.citizenship === "others" && (
          <span className="bg-negative rounded-tl-4xl rounded-b-2xl px-1 pb-0.5">
            <Input
              value={co.citizenshipOther}
              onChange={(e) => updateCoBorrower("citizenshipOther", e.target.value)}
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
        value={co.schoolName}
        onChange={(e) => updateCoBorrower("schoolName", e.target.value)}
        label="School Name"
      />
      <Input
        value={co.schoolGradeLevel}
        onChange={(e) => updateCoBorrower("schoolGradeLevel", e.target.value)}
        placeholder="Bachelor of Science"
        label="Grade / Level / College Course"
      />
      <Input
        value={co.schoolYearGraduated}
        onChange={(e) => updateCoBorrower("schoolYearGraduated", e.target.value)}
        placeholder="2020"
        label="Year Graduated / Last Year of Stay"
      />
    </>
  )
}
