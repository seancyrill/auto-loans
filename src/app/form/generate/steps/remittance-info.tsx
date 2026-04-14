import { useApplication } from "@/app/context/form-context"
import { ImageFieldMultiple } from "@/app/ui/image-field"
import { InputAmount } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function RemittanceInfo() {
  const { updateApplicationData, applicationData, applicationImages, updateImages } = useApplication()

  const remittanceFieldName = "remittance"

  return (
    <StepContainer>
      <InputAmount
        currency="PHP"
        value={applicationData.remittanceIncome}
        onChange={(e) => updateApplicationData("remittanceIncome", e)}
        label="Monthly Remittance"
      />

      <ImageFieldMultiple
        label="Proof of remittance"
        name={remittanceFieldName}
        initialPreviews={applicationImages.filter((img) => img.name === remittanceFieldName).map((img) => img.image)}
        limit={3}
        onChange={(base64s) => updateImages(remittanceFieldName, base64s)}
      />
    </StepContainer>
  )
}
