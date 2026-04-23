import { ImageField, ImageFieldMultiple } from "@/app/ui/image-field"

export default function BasicRequirements() {
  return (
    <>
      <ImageFieldMultiple label="2 Government-issued IDs" name="id" limit={2} />
      <ImageField label="Proof of Billing" name="billing-proof" />
    </>
  )
}
