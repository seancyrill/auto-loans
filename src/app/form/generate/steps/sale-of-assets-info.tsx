import { useApplication } from "@/app/context/form-context"
import { Input } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function SaleOfAssetsInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <StepContainer>
      <Input
        value={applicationData.saleOfAssetsIncome}
        onChange={(e) => updateApplicationData("saleOfAssetsIncome", e.target.value)}
        placeholder="25000"
        label="Monthly Sales Income"
      />
    </StepContainer>
  )
}
