"use client"

import LoadingSpinner from "@/app/components/loading-spinner"
import { useApplication } from "@/app/context/form-context"
import { useStepper } from "@/app/context/stepper-context"
import { Button } from "@/app/ui/button"

export default function GenerateForm() {
  const { currentStep, stepError, goNext, goPrev, hasPrev, isLastStep } = useStepper()
  const { applicationData, applicationLoading } = useApplication()
  const StepComponent = currentStep.component

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

    alert("submtted")
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
      <div className="flex justify-between">
        {hasPrev && (
          <Button onClick={goPrev} variant={"subtle"}>
            Back
          </Button>
        )}

        {isLastStep ? (
          <Button className="mt-4" type="submit" disabled={!!applicationLoading.loading}>
            Submit
          </Button>
        ) : (
          <Button onClick={() => goNext(applicationData)}>Next</Button>
        )}
      </div>
    </form>
  )
}
