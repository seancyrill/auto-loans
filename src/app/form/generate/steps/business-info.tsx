import { useApplication } from "@/app/context/form-context"
import { ImageField, ImageFieldMultiple } from "@/app/ui/image-field"
import { Input, InputAmount } from "@/app/ui/input"

export default function BusinessInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <>
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

      <ImageField label="DTI Permit" name="dti" />
      <ImageField label="Mayor's/Barangay Permit" name="myr-bgry-permit" />
      <ImageFieldMultiple label="Proof of Transaction/s (Reciept / Logbook)" name="business-proof" limit={3} />
      <ImageField label="Bank Statement" name="bank-statement" />
    </>
  )
}
