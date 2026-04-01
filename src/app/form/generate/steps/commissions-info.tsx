import { useApplication } from "@/app/context/form-context"
import { Input } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function CommissionsInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <StepContainer>
      <Input
        value={applicationData.commissionsIncome}
        onChange={(e) => updateApplicationData("commissionsIncome", e.target.value)}
        placeholder="25000"
        label="Monthly Commissions Income"
      />
    </StepContainer>
  )
}
