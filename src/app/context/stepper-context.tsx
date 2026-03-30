"use client"

import { createContext, ReactNode, useCallback, useContext, useState } from "react"
import LoanOptions from "../form/generate/steps/loan-options"
import { useStatus } from "./status-provider"

export type StepConfig = {
  component: React.ComponentType
  title: string
  description?: string
  validate?: (formData: Record<string, unknown>) => boolean
}

export const STEPS: StepConfig[] = [
  {
    component: LoanOptions,
    title: "Personal Information",
    description: "Tell us a bit about yourself.",
    validate: (formData) => Boolean(formData.firstName && formData.lastName && formData.email),
  },
]

interface StepperContextValue {
  steps: StepConfig[]
  currentStepIndex: number
  currentStep: StepConfig
  hasNext: boolean
  hasPrev: boolean
  isLastStep: boolean
  goNext: (formData: Record<string, unknown>) => boolean
  goPrev: () => void
  goToStep: (index: number, force?: boolean) => void
  completedSteps: Set<number>
  stepError: string | null
  clearStepError: () => void
}

const StepperContext = createContext<StepperContextValue | null>(null)

export function useStepper(): StepperContextValue {
  const ctx = useContext(StepperContext)
  if (!ctx) {
    throw new Error("useStepper must be used within a <StepperProvider>")
  }
  return ctx
}

interface StepperProviderProps {
  children: ReactNode
  steps?: StepConfig[]
}

export function StepperProvider({ children, steps = STEPS }: StepperProviderProps) {
  const { showStatus } = useStatus()

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [stepError, setStepError] = useState<string | null>(null)

  const currentStep = steps[currentStepIndex]
  const hasNext = currentStepIndex < steps.length - 1
  const hasPrev = currentStepIndex > 0
  const isLastStep = currentStepIndex === steps.length - 1

  const clearStepError = useCallback(() => setStepError(null), [])

  const goNext = useCallback(
    (formData: Record<string, unknown>): boolean => {
      const validator = currentStep.validate

      if (validator && !validator(formData)) {
        showStatus({
          message: `Please complete all required fields in "${currentStep.title}" before continuing.`,
          isError: true,
        })
        return false
      }

      setStepError(null)
      setCompletedSteps((prev) => new Set(prev).add(currentStepIndex))

      if (hasNext) {
        setCurrentStepIndex((i) => i + 1)
      }

      return true
    },
    [currentStep, currentStepIndex, hasNext, showStatus],
  )

  const goPrev = useCallback(() => {
    setStepError(null)
    if (hasPrev) {
      setCurrentStepIndex((i) => i - 1)
    }
  }, [hasPrev])

  const goToStep = useCallback(
    (index: number, force = false) => {
      const isVisitable = force || index < currentStepIndex || completedSteps.has(index)

      if (index < 0 || index >= steps.length) return
      if (!isVisitable) return

      setStepError(null)
      setCurrentStepIndex(index)
    },
    [currentStepIndex, completedSteps, steps.length],
  )

  return (
    <StepperContext.Provider
      value={{
        steps,
        currentStepIndex,
        currentStep,
        hasNext,
        hasPrev,
        isLastStep,
        goNext,
        goPrev,
        goToStep,
        completedSteps,
        stepError,
        clearStepError,
      }}
    >
      {children}
    </StepperContext.Provider>
  )
}
