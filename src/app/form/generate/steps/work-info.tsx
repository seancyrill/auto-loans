import { useApplication } from "@/app/context/form-context"
import { ImageField, ImageFieldMultiple } from "@/app/ui/image-field"
import { Input, InputAmount } from "@/app/ui/input"

export default function WorkInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <>
      <div className="flex w-full gap-1">
        <Input
          value={applicationData.employerName}
          onChange={(e) => updateApplicationData("employerName", e.target.value)}
          placeholder="ACME Corporation"
          label="Employer Name"
        />
        <div className="flex max-w-22 gap-1">
          <Input
            value={applicationData.employmentYears}
            onChange={(e) => updateApplicationData("employmentYears", e.target.value)}
            placeholder="0"
            type="number"
            label="for Yrs"
          />
          <Input
            value={applicationData.employmentMonths}
            onChange={(e) => updateApplicationData("employmentMonths", e.target.value)}
            placeholder="0"
            type="number"
            label="& Mos"
          />
        </div>
      </div>
      <Input
        value={applicationData.employerBusinessAddress}
        onChange={(e) => updateApplicationData("employerBusinessAddress", e.target.value)}
        placeholder="456 Business Ave, Makati"
        label="Employer / Business Address"
      />
      <InputAmount
        currency="PHP"
        value={applicationData.employmentIncome}
        onChange={(e) => updateApplicationData("employmentIncome", e)}
        label="Monthly Salary"
      />

      <ImageField label="COE / Proof of Employment" name="coe" />
      <ImageFieldMultiple label="Latest 3 months payslip" name="payslip" limit={3} />
    </>
  )
}
