import { useApplication } from "@/app/context/form-context"
import { ImageFieldMultiple } from "@/app/ui/image-field"
import { Input, InputAmount } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function WorkInfo() {
  const { updateApplicationData, applicationData, applicationImages, updateImages } = useApplication()

  const payslipFieldName = "payslip"

  return (
    <StepContainer>
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
            label="for Yrs"
          />
          <Input
            value={applicationData.employmentMonths}
            onChange={(e) => updateApplicationData("employmentMonths", e.target.value)}
            placeholder="0"
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

      <ImageFieldMultiple
        label="Latest 3 months payslip"
        name={payslipFieldName}
        initialPreviews={applicationImages.filter((img) => img.name === payslipFieldName).map((img) => img.image)}
        limit={3}
        onChange={(base64s) => updateImages(payslipFieldName, base64s)}
      />
    </StepContainer>
  )
}
