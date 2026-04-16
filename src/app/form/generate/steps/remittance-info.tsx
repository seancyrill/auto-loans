import { useApplication } from "@/app/context/form-context"
import { ImageFieldMultiple } from "@/app/ui/image-field"
import { InputAmount } from "@/app/ui/input"

export default function RemittanceInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  const remittanceFieldName = "remittance"

  return (
    <>
      <InputAmount
        currency="PHP"
        value={applicationData.remittanceIncome}
        onChange={(e) => updateApplicationData("remittanceIncome", e)}
        label="Monthly Remittance"
      />

      <ImageFieldMultiple label="Proof of remittance" name={remittanceFieldName} limit={3} />
    </>
  )
}
