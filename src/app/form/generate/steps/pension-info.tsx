import { useApplication } from "@/app/context/form-context"
import { Input } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function PensionInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <StepContainer>
      <Input
        value={applicationData.pensionIncome}
        onChange={(e) => updateApplicationData("pensionIncome", e.target.value)}
        placeholder="25000"
        label="Monthly Pension"
      />
    </StepContainer>
  )
}
