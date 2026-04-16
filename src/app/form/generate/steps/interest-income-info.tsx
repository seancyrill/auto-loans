import { useApplication } from "@/app/context/form-context"
import { InputAmount } from "@/app/ui/input"

export default function InterestIncomeInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <>
      <InputAmount
        currency="PHP"
        value={applicationData.interestIncome}
        onChange={(e) => updateApplicationData("interestIncome", e)}
        label="Monthly Interest Income"
      />
    </>
  )
}
