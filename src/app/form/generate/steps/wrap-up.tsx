import { useApplication } from "@/app/context/form-context"
import { SignaturePad } from "@/app/ui/signature"

export default function WrapUp() {
  const { updateApplicationData, applicationData, updateCoBorrower } = useApplication()

  return (
    <>
      <SignaturePad
        initialValue={applicationData?.signature?.full || null}
        onSave={(val) => updateApplicationData("signature", val)}
        onClear={() => updateApplicationData("signature", null)}
      />
      <SignaturePad
        initialValue={applicationData?.coBorrower?.signature?.full || null}
        onSave={(val) => updateCoBorrower("signature", val)}
        onClear={() => updateCoBorrower("signature", null)}
      />
    </>
  )
}
