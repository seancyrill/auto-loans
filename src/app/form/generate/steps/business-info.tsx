import { useApplication } from "@/app/context/form-context"
import { Input } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function BusinessInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <StepContainer>
      <Input
        value={applicationData.businessName}
        onChange={(e) => updateApplicationData("businessName", e.target.value)}
        placeholder="Juan's Bakery"
        label="Business Name"
      />

      <Input
        value={applicationData.businessTelNumber}
        onChange={(e) => updateApplicationData("businessTelNumber", e.target.value)}
        placeholder="02 XXXX XXXX"
        label="Business Tel. No."
      />
      <Input
        value={applicationData.businessIncome}
        onChange={(e) => updateApplicationData("businessIncome", e.target.value)}
        placeholder="25000"
        label="Monthly Business Income"
      />
    </StepContainer>
  )
}
