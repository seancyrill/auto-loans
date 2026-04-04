import { useApplication } from "@/app/context/form-context"
import { InputAmount } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function InterestIncomeInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <StepContainer>
      <InputAmount
        currency="PHP"
        value={applicationData.interestIncome}
        onChange={(e) => updateApplicationData("interestIncome", e)}
        label="Monthly Interest Income"
      />
    </StepContainer>
  )
}
