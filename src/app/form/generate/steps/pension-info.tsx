import { useApplication } from "@/app/context/form-context"
import { InputAmount } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function PensionInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <StepContainer>
      <InputAmount
        currency="PHP"
        value={applicationData.pensionIncome}
        onChange={(e) => updateApplicationData("pensionIncome", e)}
        label="Monthly Pension"
      />
    </StepContainer>
  )
}
