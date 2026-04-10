import { useApplication } from "@/app/context/form-context"
import { ImageField } from "@/app/ui/image-field"
import { Input, InputAmount } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function BusinessInfo() {
  const { updateApplicationData, applicationData, applicationImages, updateImages } = useApplication()

  const dtiFieldName = "dti"
  const dtiImg = applicationImages.find((img) => img.name === dtiFieldName)?.image ?? null

  return (
    <StepContainer>
      <Input
        value={applicationData.businessName}
        onChange={(e) => updateApplicationData("businessName", e.target.value)}
        placeholder="Juan's Bakery"
        label="Business Name"
      />

      <Input
        value={applicationData.businessTelNumber}
        onChange={(e) => updateApplicationData("businessTelNumber", e.target.value)}
        label="Business Tel. No."
      />
      <InputAmount
        currency="PHP"
        value={applicationData.businessIncome}
        onChange={(e) => updateApplicationData("businessIncome", e)}
        label="Monthly Business Income"
      />

      <ImageField
        label="Latest 3 months payslip"
        name={dtiFieldName}
        initialPreview={dtiImg}
        onChange={(base64) => updateImages(dtiFieldName, base64 ? [base64] : [])}
      />
    </StepContainer>
  )
}
