import { useApplication } from "@/app/context/form-context"
import { Input } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function RemittanceInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <StepContainer>
      <Input
        value={applicationData.remittanceIncome}
        onChange={(e) => updateApplicationData("remittanceIncome", e.target.value)}
        placeholder="25000"
        label="Monthly Remittance"
      />
    </StepContainer>
  )
}
