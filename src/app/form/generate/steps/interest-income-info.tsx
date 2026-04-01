import { useApplication } from "@/app/context/form-context"
import { Input } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function InterestIncomeInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <StepContainer>
      <Input
        value={applicationData.interestIncome}
        onChange={(e) => updateApplicationData("interestIncome", e.target.value)}
        placeholder="25000"
        label="Monthly Interest Income"
      />
    </StepContainer>
  )
}
