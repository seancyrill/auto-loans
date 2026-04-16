import { useApplication } from "@/app/context/form-context"
import { ImageField, ImageFieldMultiple } from "@/app/ui/image-field"

export default function BasicRequirements() {
  const { applicationData } = useApplication()
  return (
    <>
      {applicationData.loanOption === "Sangla ORCR" && (
        <div className="grid w-full grid-cols-2 gap-1">
          <ImageField label="OR" name="OR" />
          <ImageField label="CR" name="CR" />
        </div>
      )}

      <ImageFieldMultiple label="2 Government-issued IDs" name="id" limit={2} />
      <ImageField label="Proof of Billing" name="billing-proof" />
    </>
  )
}
