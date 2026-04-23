"use client"

import LoadingSpinner from "@/app/components/loading-spinner"
import { useApplication } from "@/app/context/form-context"
import { useStatus } from "@/app/context/status-provider"
import { useStepper } from "@/app/context/stepper-context"
import { Button } from "@/app/ui/button"
import { useRouter } from "next/navigation"
import ProgressBar from "../components/progress-bar"

export default function GenerateForm() {
  const router = useRouter()
  const { currentStep, goNext, goPrev, hasPrev, isLastStep } = useStepper()
  const { applicationData, applicationImages, applicationLoading, resetApplication, setApplicationLoading } =
    useApplication()
  const { showStatus, clearStatus } = useStatus()
  const StepComponent = currentStep?.component

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

    if (!isLastStep) {
      return goNext(applicationData)
    }

    setApplicationLoading({ loading: true, text: "Submitting" })

    const res = await fetch("/api/submit/generate", {
      method: "POST",
      body: JSON.stringify({ applicationData, applicationImages }),
    })

    const data = await res.json()
    if (data.success) {
      showStatus({
        message:
          "Your application is successfully sent to your Loan Consultant. They will review everything to give you the best chance of approval. Wait for them to contact you.",
        note: "The entire application process is FREE from start to finish. Beware of scammers.",
        button: {
          text: "OK",
          function: () => {
            router.push("/")
            clearStatus()
            resetApplication()
          },
        },
      })

      setApplicationLoading({ loading: false, text: "" })
    } else {
      console.error(data.error)
    }
  }

  if (applicationLoading.loading) {
    return <LoadingSpinner loadingText={applicationLoading.text ?? ""} />
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="relative flex flex-1 flex-col items-center overflow-clip">
      <div className="bg-primary sticky top-0 z-10 w-full pt-17">
        <ProgressBar />

        <div className="border-off flex w-full flex-col items-center border-b pt-1 pb-3 shadow-sm sm:gap-2 sm:p-6">
          {currentStep && (
            <>
              <h1 className="text-xl font-bold sm:text-3xl">{currentStep.title}</h1>
              <h2 className="text-lg sm:text-xl">{currentStep.description}</h2>
            </>
          )}
        </div>
      </div>

      <div className="flex w-full max-w-120 flex-1 flex-col items-center gap-4 overflow-scroll p-4 pt-6 pb-18.5">
        {!!StepComponent ? <StepComponent /> : <p>No fields to show.</p>}
        <div className="text-secondary/50 text-center text-xs">
          <p>You can always skip a field</p>
          <p>Your progress is saved on your device, come back anytime</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-off/50 bg-primary fixed bottom-0 left-0 flex w-full flex-col items-center justify-center border-t p-2 sm:p-4">
        <div className={`flex w-full max-w-120 items-center gap-4 px-4 ${hasPrev ? "justify-between" : "justify-end"}`}>
          <Button type="button" onClick={goPrev} variant={"subtle"} className={hasPrev ? "" : "hidden"}>
            Back
          </Button>

          <Button
            type="submit"
            disabled={!!applicationLoading.loading}
            variant={isLastStep ? "yellow" : "default"}
            className="w-full"
          >
            {isLastStep ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </form>
  )
}
