"use client"

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react"
import {
  ApplicationContextType,
  ApplicationFormType,
  ApplicationLoadingType,
  CoBorrowerType,
  FormArrayFields,
  initialApplicationData,
} from "./form-context-types"

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined)

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [applicationData, setApplicationData] = useState<ApplicationFormType>(initialApplicationData)
  const [applicationLoading, setApplicationLoading] = useState<ApplicationLoadingType>({ loading: true, text: "" })
  const [applicationImages, setApplicationImages] = useState<{ name: string; image: string }[]>([])

  const { firstName, middleName, lastName, nameSuffix } = applicationData
  const fullName = useMemo(
    () =>
      `${firstName}${
        middleName
          ? ` ${middleName
              .split(" ")
              .map((mn) => `${mn[0]}.`)
              .join("")}`
          : ""
      } ${lastName}
      ${nameSuffix ? ` ${nameSuffix.toUpperCase()}` : ""}`,
    [firstName, middleName, lastName, nameSuffix],
  )

  // Load from localStorage on mount
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        setApplicationLoading({ loading: true, text: "Checking for unfinished application" })
        const saved = localStorage.getItem("aideoApplicationData")

        if (saved) {
          const parsed: { applicationData: ApplicationFormType } = JSON.parse(saved)

          setApplicationData(parsed?.applicationData ?? initialApplicationData)
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
  }, [applicationData, applicationLoading.loading])

  // works for all flat fields
  const updateApplicationData = <K extends keyof ApplicationFormType>(field: K, value: ApplicationFormType[K]) => {
    setApplicationData((prev) => ({ ...prev, [field]: value }))
  }

  // For co-borrower fields
  const updateCoBorrower = <K extends keyof CoBorrowerType>(field: K, value: CoBorrowerType[K]) => {
    setApplicationData((prev) => ({
      ...prev,
      coBorrower: { ...prev.coBorrower, [field]: value },
    }))
  }

  const updateArrayItem = <K extends FormArrayFields>(
    field: K,
    index: number,
    value: Partial<ApplicationFormType[K][number]>,
  ) => {
    setApplicationData((prev) => {
      const updated = [...(prev[field] ?? [])] as Record<string, unknown>[]
      updated[index] = { ...updated[index], ...value }
      return { ...prev, [field]: updated }
    })
  }

  const addArrayItem = <K extends FormArrayFields>(field: K, item: ApplicationFormType[K][number]) => {
    setApplicationData((prev) => ({
      ...prev,
      [field]: [...prev[field], item],
    }))
  }

  const removeArrayItem = <K extends FormArrayFields>(field: K, index: number) => {
    setApplicationData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const updateImages = (name: string, images: string[]) => {
    setApplicationImages((prev) => [
      ...prev.filter((i) => i.name !== name),
      ...images.map((image) => ({ name, image })),
    ])
  }

  const resetApplication = (setInto?: ApplicationFormType) => {
    setApplicationData(setInto ?? initialApplicationData)
    setApplicationImages([])
  }

  return (
    <ApplicationContext.Provider
      value={{
        fullName,
        applicationData,
        updateApplicationData,
        updateCoBorrower,
        addArrayItem,
        removeArrayItem,
        resetApplication,
        updateArrayItem,
        applicationLoading,
        setApplicationLoading,
        applicationImages,
        updateImages,
      }}
    >
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
