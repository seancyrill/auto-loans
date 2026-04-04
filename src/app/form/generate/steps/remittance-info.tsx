import { useApplication } from "@/app/context/form-context"
import { InputAmount } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function RemittanceInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <StepContainer>
      <InputAmount
        currency="PHP"
        value={applicationData.remittanceIncome}
        onChange={(e) => updateApplicationData("remittanceIncome", e)}
        label="Monthly Remittance"
      />
    </StepContainer>
  )
}
