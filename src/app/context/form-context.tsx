"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import LoadingSpinner from "../components/loading-spinner"

type ApplicationFormType = {
  income: IncomeOption
  firstName: string
  middleName: string
  lastName: string
  birthdDay: string
  mobile: string
  email: string
}

export const INCOME_OPTIONS = ["employed", "business", "remittance", "allotment", "own clinic"] as const
export type IncomeOption = (typeof INCOME_OPTIONS)[number]

type ApplicationLoadingType = {
  loading: boolean
  text?: string
}

type ApplicationContextType = {
  applicationData: ApplicationFormType
  updateApplicationData: <K extends keyof ApplicationFormType>(field: K, value: ApplicationFormType[K]) => void
  resetApplication: (setInto?: ApplicationFormType) => void
  applicationLoading: ApplicationLoadingType
  setApplicationLoading: Dispatch<SetStateAction<ApplicationLoadingType>>
}

const initApplicationData: ApplicationFormType = {
  income: "employed",
  firstName: "",
  middleName: "",
  lastName: "",
  birthdDay: "",
  email: "",
  mobile: "",
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined)

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [applicationData, setApplicationData] = useState<ApplicationFormType>(initApplicationData)
  const [applicationLoading, setApplicationLoading] = useState<ApplicationLoadingType>({ loading: true, text: "" })

  // Load from localStorage on mount
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        setApplicationLoading({ loading: true, text: "Checking for unfinished application" })
        const saved = localStorage.getItem("aideoApplicationData")

        if (saved) {
          const parsed: { applicationData: ApplicationFormType } = JSON.parse(saved)

          setApplicationData(parsed?.applicationData ?? initApplicationData)
        }
      } catch (error) {
        console.error("Error loading application data from storage:", error)
      } finally {
        setApplicationLoading({ loading: false, text: "" })
      }
    }

    loadFromStorage()
  }, [])

  // Save to localStorage whenever applicationData changes
  useEffect(() => {
    if (applicationData && !applicationLoading.loading) {
      try {
        localStorage.setItem("aideoApplicationData", JSON.stringify({ applicationData }))
      } catch (error) {
        console.error("Error saving application data to storage:", error)
      }
    }
  }, [applicationData])

  const updateApplicationData = <K extends keyof ApplicationFormType>(field: K, value: ApplicationFormType[K]) => {
    setApplicationData((prev) => {
      return { ...prev, [field]: value }
    })
  }

  const resetApplication = (setInto?: ApplicationFormType) => {
    setApplicationData(setInto ?? initApplicationData)
  }

  return (
    <ApplicationContext.Provider
      value={{
        applicationData,
        updateApplicationData,
        resetApplication,
        applicationLoading,
        setApplicationLoading,
      }}
    >
      {applicationLoading.loading && <LoadingSpinner loadingText={applicationLoading.text ?? ""} />}
      {children}
    </ApplicationContext.Provider>
  )
}

export const useApplication = () => {
  const context = useContext(ApplicationContext)
  if (!context) {
    throw new Error("useApplication must be used within a ApplicationProvider")
  }
  return context
}
