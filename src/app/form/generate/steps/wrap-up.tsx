import { useApplication } from "@/app/context/form-context"
import { SignaturePad } from "@/app/ui/signature"

export default function WrapUp() {
  const { updateApplicationData, applicationData, updateCoBorrower } = useApplication()

  return (
    <>
      <div className="text-secondary/80 text-xs">
        <h3 className="mb-2">By signing below, you confirm that you have read and agree to the following:</h3>
        <ul className="list-disc px-4">
          <li>
            Authorize your selected lender to collect, use, and share my personal and financial information for the
            purpose of evaluating my loan application.
          </li>
          <li>Certify that all the information is true, correct, and complete.</li>
          <li>Signatures affixed are true and genuine.</li>
        </ul>
      </div>

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
