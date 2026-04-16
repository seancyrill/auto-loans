import { useApplication } from "@/app/context/form-context"
import { InputAmount } from "@/app/ui/input"

export default function CommissionsInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <>
      <InputAmount
        currency="PHP"
        value={applicationData.commissionsIncome}
        onChange={(e) => updateApplicationData("commissionsIncome", e)}
        label="Monthly Commissions Income"
      />
    </>
  )
}
