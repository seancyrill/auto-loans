"use client"
import { useApplication } from "@/app/context/form-context"
import {
  Citizenship,
  CITIZENSHIP_OPTIONS,
  CIVIL_STATUS_OPTIONS,
  CivilStatus,
  Gender,
  GENDER_OPTIONS,
} from "@/app/context/form-context-types"
import { DateInput } from "@/app/ui/date-input"
import { Input } from "@/app/ui/input"
import { SelectionMenu } from "@/app/ui/selection"
import { formatPhone } from "@/app/utils/format-number"
import { StepContainer } from "./components/step-container"

export default function PersonalInformation() {
  const { applicationData, updateApplicationData } = useApplication()

  return (
    <StepContainer>
      <div className="flex w-full gap-1">
        <Input
          value={applicationData.firstName}
          onChange={(e) => updateApplicationData("firstName", e.target.value)}
          required
          placeholder="Juan"
          label="First Name"
        />
        <Input
          value={applicationData.middleName}
          onChange={(e) => updateApplicationData("middleName", e.target.value)}
          placeholder="Santos"
          label="Middle Name"
        />
        <Input
          value={applicationData.lastName}
          onChange={(e) => updateApplicationData("lastName", e.target.value)}
          required
          placeholder="Dela Cruz"
          label="Last Name"
        />
        <span className="w-10">
          <Input
            value={applicationData.nameSuffix}
            onChange={(e) => updateApplicationData("nameSuffix", e.target.value)}
            placeholder="Jr."
            label="Suffix"
          />
        </span>
      </div>

      <DateInput
        value={applicationData.birthDate}
        onChange={(e) => updateApplicationData("birthDate", e.target.value)}
        placeholder="MM/DD/YYYY"
        label="Date of Birth"
      />
      <Input
        value={applicationData.birthPlace}
        onChange={(e) => updateApplicationData("birthPlace", e.target.value)}
        placeholder="Cabanatuan"
        label="Place of Birth"
      />
      <SelectionMenu
        label="Gender"
        columns={2}
        value={applicationData.gender}
        onChange={(val) => updateApplicationData("gender", val as Gender)}
        options={GENDER_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
      />
      <SelectionMenu
        label="Civil Status"
        columns={2}
        value={applicationData.civilStatus}
        onChange={(val) => updateApplicationData("civilStatus", val as CivilStatus)}
        options={CIVIL_STATUS_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
      />

      <Input
        value={formatPhone(applicationData.mobile)}
        onChange={(e) => {
          const value = e.target.value.replace(/\s/g, "")
          if (value === "" || /^\d+$/.test(value) || value.length > 12) {
            updateApplicationData("mobile", value)
          }
        }}
        required
        maxLength={12}
        minLength={12}
        placeholder="9XX XXX XXXX"
        label="Mobile Number"
        mobile
      />

      <div className="flex w-full flex-col">
        <SelectionMenu
          label="Citizenship"
          columns={2}
          value={applicationData.citizenship}
          onChange={(val) => updateApplicationData("citizenship", val as Citizenship)}
          options={CITIZENSHIP_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
        />
        {applicationData.citizenship === "others" && (
          <span className="bg-negative rounded-tl-4xl rounded-b-2xl px-1 pb-0.5">
            <Input
              value={applicationData.citizenshipOther}
              onChange={(e) => updateApplicationData("citizenshipOther", e.target.value)}
              placeholder="e.g. American"
              sizeVariant={"sm"}
              label="Please specify citizenship"
              className="rounded-xl"
              labelClassName="text-primary text-right"
            />
          </span>
        )}
      </div>

      <Input
        value={applicationData.schoolName}
        onChange={(e) => updateApplicationData("schoolName", e.target.value)}
        label="School Name"
      />
      <Input
        value={applicationData.schoolGradeLevel}
        onChange={(e) => updateApplicationData("schoolGradeLevel", e.target.value)}
        placeholder="Bachelor of Science"
        label="Grade / Level / College Course"
      />
      <Input
        value={applicationData.schoolYearGraduated}
        onChange={(e) => updateApplicationData("schoolYearGraduated", e.target.value)}
        placeholder="2020"
        label="Year Graduated / Last Year of Stay"
      />
    </StepContainer>
  )
}
