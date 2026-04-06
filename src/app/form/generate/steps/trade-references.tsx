"use client"
import { useApplication } from "@/app/context/form-context"
import { Input } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function TradeReferences() {
  const { applicationData, updateArrayItem } = useApplication()

  const tradeRefs = applicationData.tradeReferences ?? []

  return (
    <StepContainer className="gap-8">
      {[0, 1, 2].map((i) => (
        <div key={`trade-ref-${i}`} className="flex w-full flex-col">
          <Input
            value={tradeRefs[i]?.businessName ?? ""}
            onChange={(e) => updateArrayItem("tradeReferences", i, { businessName: e.target.value })}
            placeholder="Business Name"
          />
          <Input
            value={tradeRefs[i]?.address ?? ""}
            onChange={(e) => updateArrayItem("tradeReferences", i, { address: e.target.value })}
            placeholder="Address"
          />
          <Input
            value={tradeRefs[i]?.contactNumber ?? ""}
            onChange={(e) => updateArrayItem("tradeReferences", i, { contactNumber: e.target.value })}
            placeholder="09XX XXX XXXX"
          />
        </div>
      ))}
    </StepContainer>
  )
}
