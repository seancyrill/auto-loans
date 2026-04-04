"use client"

import LoadingSpinner from "@/app/components/loading-spinner"
import { useApplication } from "@/app/context/form-context"
import { useStepper } from "@/app/context/stepper-context"
import { Button } from "@/app/ui/button"

export default function GenerateForm() {
  const { currentStep, stepError, goNext, goPrev, hasPrev, isLastStep } = useStepper()
  const { applicationData, applicationLoading, resetApplication } = useApplication()
  const StepComponent = currentStep.component

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

    if (!isLastStep) {
      return goNext(applicationData)
    }

    // const res = await fetch("/api/submit/generate", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ applicationData, lender: "gdfi" }),
    // })

    // const data = await res.json()
    // if (data.success) {
    alert("Submitted successfully!")
    // resetApplication()
    // }
  }

  if (applicationLoading.loading) {
    return <LoadingSpinner loadingText={applicationLoading.text ?? ""} />
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold">{currentStep.title}</h1>
        <h2 className="text-xl">{currentStep.description}</h2>
      </div>

      <StepComponent />

      {/* Error from failed validation */}
      {stepError && <p className="text-error">{stepError}</p>}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {hasPrev && (
          <Button type="button" onClick={goPrev} variant={"subtle"}>
            Back
          </Button>
        )}

        <Button type="submit" disabled={!!applicationLoading.loading} variant={isLastStep ? "yellow" : "default"}>
          {isLastStep ? "Submit" : "Next"}
        </Button>
      </div>
    </form>
  )
}
