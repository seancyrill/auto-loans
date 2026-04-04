import { useApplication } from "@/app/context/form-context"
import { InputAmount } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function CommissionsInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <StepContainer>
      <InputAmount
        currency="PHP"
        value={applicationData.commissionsIncome}
        onChange={(e) => updateApplicationData("commissionsIncome", e)}
        label="Monthly Commissions Income"
      />
    </StepContainer>
  )
}
