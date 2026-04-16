import { useApplication } from "@/app/context/form-context"
import { InputAmount } from "@/app/ui/input"

export default function SaleOfAssetsInfo() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <>
      <InputAmount
        currency="PHP"
        value={applicationData.saleOfAssetsIncome}
        onChange={(e) => updateApplicationData("saleOfAssetsIncome", e)}
        label="Monthly Sales Income"
      />
    </>
  )
}
