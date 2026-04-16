import { useStepper } from "@/app/context/stepper-context"

export default function ProgressBar() {
  const { steps, currentStepIndex, goToStep } = useStepper()

  return (
    <div className="flex h-1 w-full overflow-hidden rounded-b-full px-4">
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex
        const isCurrent = index === currentStepIndex

        return (
          <span
            key={`${index}${step}`}
            className={`h-full w-full overflow-hidden rounded-b-full ${isCurrent ? "bg-secondary" : isCompleted ? "bg-off" : "bg-primary"}`}
          />
        )
      })}
    </div>
  )
}
