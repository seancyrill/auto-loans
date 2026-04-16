import { useApplication } from "@/app/context/form-context"
import { InputAmount } from "@/app/ui/input"

export default function PensionInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <>
      <InputAmount
        currency="PHP"
        value={applicationData.pensionIncome}
        onChange={(e) => updateApplicationData("pensionIncome", e)}
        label="Monthly Pension"
      />
    </>
  )
}
