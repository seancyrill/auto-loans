"use client"

import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { ApplicationContextType, ApplicationFormType, ApplicationLoadingType } from "./form-context-types"

const initApplicationData: ApplicationFormType = {
  // Personal Information
  firstName: "",
  middleName: "",
  lastName: "",
  nameSuffix: "",
  civilStatus: "",
  birthDate: "",
  birthPlace: "",
  gender: "",
  presentAddress: "",
  addressPresYears: "",
  addressPresMonths: "",
  permanentAddress: "",
  addressPermYears: "",
  addressPermMonths: "",
  provincialAddress: "",
  addressProvYears: "",
  addressProvMonths: "",
  primaryPhone: "",
  mobile: "",
  email: "",
  citizenship: "",
  citizenshipOther: "",
  tin: "",
  sssNumber: "",
  gsisNumber: "",
  schoolName: "",
  schoolGradeLevel: "",
  schoolYearGraduated: "",
  houseOwnership: "",
  houseRentMonthly: "",
  houseMortgageMonthly: "",
  houseOwnedBy: "",
  dependents: [],

  // Income Information
  employerName: "",
  businessName: "",
  incomeNotApplicable: false,
  monthlyIncome: "",
  employmentYears: "",
  employmentMonths: "",
  employerBusinessAddress: "",
  prcLicenseNumber: "",
  businessTelNumber: "",
  incomeSources: [],
  natureOfWork: "",
  natureOfWorkOther: "",

  // How did you learn about GDFI
  gdfiSources: [],
  gdfiSourceSocialMediaOther: "",

  // Borrower's Bank Accounts
  bankAccounts: [],

  // Borrower's Authorization to Verify Bank Details
  authorizeBankDetails: [],
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
  }, [applicationData, applicationLoading.loading])

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
