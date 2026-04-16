"use client"

import { createContext, ReactNode, useCallback, useContext, useState } from "react"
import AddressInformation from "../form/generate/steps/address-info"
import BankAccounts from "../form/generate/steps/bank-accounts"
import BasicRequirements from "../form/generate/steps/basic-requirements"
import BusinessInfo from "../form/generate/steps/business-info"
import CharacterReferences from "../form/generate/steps/character-references"
import CoborrowerAddressInformation from "../form/generate/steps/coborrower-address-info"
import CoborrowerIncomeInfo from "../form/generate/steps/coborrower-income-info"
import CoborrowerInformation from "../form/generate/steps/coborrower-info"
import CommissionsInfo from "../form/generate/steps/commissions-info"
import Dependents from "../form/generate/steps/dependents"
import IncomeInfo from "../form/generate/steps/income-info"
import InterestIncomeInfo from "../form/generate/steps/interest-income-info"
import LoanOptions from "../form/generate/steps/loan-options"
import MotorVehicle from "../form/generate/steps/motor-vehicle"
import PensionInfo from "../form/generate/steps/pension-info"
import PersonalInformation from "../form/generate/steps/personal-information"
import RemittanceInfo from "../form/generate/steps/remittance-info"
import SaleOfAssetsInfo from "../form/generate/steps/sale-of-assets-info"
import TradeReferences from "../form/generate/steps/trade-references"
import WorkInfo from "../form/generate/steps/work-info"
import { useApplication } from "./form-context"
import { useStatus } from "./status-provider"

export type StepConfig = {
  component: React.ComponentType
  title: string
  description?: string
  validate?: (formData: Record<string, unknown>) => boolean
}

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

export function StepperProvider({ children }: StepperProviderProps) {
  const { applicationData } = useApplication()
  const steps: StepConfig[] = [
    {
      component: LoanOptions,
      title: "Select Loan Type",
      description: "Choose your preferred loan product",
    },
    {
      component: PersonalInformation,
      title: "Personal Information",
      description: "Basic identity and contact details",
    },
    {
      component: Dependents,
      title: "Dependents",
      description: "Not married or employed",
    },
    {
      component: AddressInformation,
      title: "Address",
      description: "Your current place of residence",
    },
    {
      component: BasicRequirements,
      title: "Basic Requirements",
      description: "Essential documents for verification",
    },
    {
      component: IncomeInfo,
      title: "Income Information",
      description: "Overview of your monthly earnings",
    },
    ...(applicationData.incomeSources.includes("employment")
      ? [
          {
            component: WorkInfo,
            title: "Employment Information",
            description: "Current job and employer details",
          },
        ]
      : []),
    ...(applicationData.incomeSources.includes("business")
      ? [
          {
            component: BusinessInfo,
            title: "Business Information",
            description: "Details regarding your business operations",
          },
        ]
      : []),
    ...(applicationData.incomeSources.includes("remittance")
      ? [
          {
            component: RemittanceInfo,
            title: "Remittance",
            description: "Funds received from family or abroad",
          },
        ]
      : []),
    ...(applicationData.incomeSources.includes("pension")
      ? [
          {
            component: PensionInfo,
            title: "Pension",
            description: "Regular retirement or social benefits",
          },
        ]
      : []),
    ...(applicationData.incomeSources.includes("commissions")
      ? [
          {
            component: CommissionsInfo,
            title: "Commissions",
            description: "Performance-based or variable pay",
          },
        ]
      : []),
    ...(applicationData.incomeSources.includes("interest Income")
      ? [
          {
            component: InterestIncomeInfo,
            title: "Interest Income",
            description: "Earnings from investments or savings",
          },
        ]
      : []),
    ...(applicationData.incomeSources.includes("sale Of Assets")
      ? [
          {
            component: SaleOfAssetsInfo,
            title: "Sale of Assets",
            description: "Proceeds from sold property or goods",
          },
        ]
      : []),
    ...(applicationData.motorVehicle !== null
      ? [
          {
            component: MotorVehicle,
            title: "Owned Vehicle Information",
            description: "Details of vehicles in your name",
          },
        ]
      : []),
    {
      component: BankAccounts,
      title: "Bank Accounts",
      description: "Your active banking relationships",
    },
    {
      component: CoborrowerInformation,
      title: "Coborrower",
      description: "Basic details of your loan partner",
    },
    {
      component: CoborrowerAddressInformation,
      title: "Coborrower Address",
      description: "Coborrower's current residence",
    },
    {
      component: CoborrowerIncomeInfo,
      title: "Coborrower Income",
      description: "Earnings details of your coborrower",
    },
    {
      component: CharacterReferences,
      title: "Character References",
      description: "Contacts not living in your household",
    },
    {
      component: TradeReferences,
      title: "Trade References",
      description: "Business clients or major suppliers",
    },
  ]

  const { showStatus } = useStatus()

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const currentStep = steps[currentStepIndex]
  const hasNext = currentStepIndex < steps.length - 1
  const hasPrev = currentStepIndex > 0
  const isLastStep = currentStepIndex === steps.length - 1

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

      setCompletedSteps((prev) => new Set(prev).add(currentStepIndex))

      if (hasNext) {
        setCurrentStepIndex((i) => i + 1)
        window.scrollTo({ top: 0 })
      }

      return true
    },
    [currentStep, currentStepIndex, hasNext, showStatus],
  )

  const goPrev = useCallback(() => {
    if (hasPrev) {
      setCurrentStepIndex((i) => i - 1)
      window.scrollTo({ top: 0 })
    }
  }, [hasPrev])

  const goToStep = useCallback(
    (index: number, force = false) => {
      const isVisitable = force || index < currentStepIndex || completedSteps.has(index)

      if (index < 0 || index >= steps.length) return
      if (!isVisitable) return

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
      }}
    >
      {children}
    </StepperContext.Provider>
  )
}
