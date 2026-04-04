import { useApplication } from "@/app/context/form-context"
import { InputAmount } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function SaleOfAssetsInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <StepContainer>
      <InputAmount
        currency="PHP"
        value={applicationData.saleOfAssetsIncome}
        onChange={(e) => updateApplicationData("saleOfAssetsIncome", e)}
        label="Monthly Sales Income"
      />
    </StepContainer>
  )
}
