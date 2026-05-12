import { useApplication } from "@/app/context/form-context"
import { SignaturePad } from "@/app/ui/signature"

export default function WrapUp() {
  const { updateApplicationData, applicationData } = useApplication()

  return (
    <>
      <SignaturePad
        initialValue={applicationData.signature}
        onSave={(url) => updateApplicationData("signature", url)}
        onClear={() => updateApplicationData("signature", null)}
      />
    </>
  )
}
