"use client"
import { useApplication } from "@/app/context/form-context"
import { Input } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function CharacterReferences() {
  const { applicationData, updateArrayItem } = useApplication()

  const charRefs = applicationData.characterReferences ?? []

  return (
    <StepContainer className="gap-8">
      {[0, 1, 2].map((i) => (
        <div key={`char-ref-${i}`} className="flex w-full flex-col">
          <Input
            value={charRefs[i]?.name ?? ""}
            onChange={(e) => updateArrayItem("characterReferences", i, { name: e.target.value })}
            placeholder="Full Name"
            label={"Full Name"}
          />
          <Input
            value={charRefs[i]?.address ?? ""}
            onChange={(e) => updateArrayItem("characterReferences", i, { address: e.target.value })}
            placeholder="Address"
            label={"Address"}
          />
          <Input
            value={charRefs[i]?.contactNumber ?? ""}
            onChange={(e) => updateArrayItem("characterReferences", i, { contactNumber: e.target.value })}
            placeholder="09XX XXX XXXX"
            label={"Mobile"}
          />
        </div>
      ))}
    </StepContainer>
  )
}
