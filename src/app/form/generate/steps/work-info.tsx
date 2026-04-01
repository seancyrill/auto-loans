import { useApplication } from "@/app/context/form-context"
import { Input } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function WorkInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <StepContainer>
      <Input
        value={applicationData.employerName}
        onChange={(e) => updateApplicationData("employerName", e.target.value)}
        placeholder="ACME Corporation"
        label="Employer Name"
      />
      <Input
        value={applicationData.employmentYears}
        onChange={(e) => updateApplicationData("employmentYears", e.target.value)}
        placeholder="0"
        label="Years of Employment / Business"
      />
      <Input
        value={applicationData.employmentMonths}
        onChange={(e) => updateApplicationData("employmentMonths", e.target.value)}
        placeholder="0"
        label="Months of Employment / Business"
      />
      <Input
        value={applicationData.employerBusinessAddress}
        onChange={(e) => updateApplicationData("employerBusinessAddress", e.target.value)}
        placeholder="456 Business Ave, Makati"
        label="Employer / Business Address"
      />
      <Input
        value={applicationData.employmentIncome}
        onChange={(e) => updateApplicationData("employmentIncome", e.target.value)}
        placeholder="25000"
        label="Monthly Salary"
      />
    </StepContainer>
  )
}
