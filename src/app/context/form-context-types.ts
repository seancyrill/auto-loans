import { Dispatch, SetStateAction } from "react"

export type ApplicationContextType = {
  applicationData: ApplicationFormType
  updateApplicationData: <K extends keyof ApplicationFormType>(field: K, value: ApplicationFormType[K]) => void
  resetApplication: (setInto?: ApplicationFormType) => void
  applicationLoading: ApplicationLoadingType
  setApplicationLoading: Dispatch<SetStateAction<ApplicationLoadingType>>
}

export type ApplicationLoadingType = {
  loading: boolean
  text?: string
}

// --- Main Form Type ---

export type ApplicationFormType = {
  // Personal Information
  firstName: string
  middleName: string
  lastName: string
  nameSuffix: string
  civilStatus: CivilStatus | ""
  birthDate: string
  birthPlace: string
  gender: Gender | ""
  presentAddress: string
  addressPresYears: string
  addressPresMonths: string
  permanentAddress: string
  addressPermYears: string
  addressPermMonths: string
  provincialAddress: string
  addressProvYears: string
  addressProvMonths: string
  primaryPhone: string
  mobile: string
  email: string
  citizenship: Citizenship | ""
  citizenshipOther: string
  tin: string
  sssNumber: string
  gsisNumber: string
  schoolName: string
  schoolGradeLevel: string
  schoolYearGraduated: string
  houseOwnership: HouseOwnership | ""
  houseRentMonthly: string
  houseMortgageMonthly: string
  houseOwnedBy: string
  dependents: DependentEntry[]

  // Income Information
  employerName: string
  businessName: string
  incomeNotApplicable: boolean
  monthlyIncome: string
  employmentYears: string
  employmentMonths: string
  employerBusinessAddress: string
  prcLicenseNumber: string
  businessTelNumber: string
  incomeSources: IncomeSource[]
  natureOfWork: NatureOfWork | ""
  natureOfWorkOther: string

  // How did you learn about GDFI
  gdfiSources: GdfiSource[]
  gdfiSourceSocialMediaOther: string

  // Borrower's Bank Accounts
  bankAccounts: BankAccountEntry[]

  // Borrower's Authorization to Verify Bank Details
  authorizeBankDetails: AuthorizeBankEntry[]
}

// --- Options & Types ---

export const INCOME_OPTIONS = ["employed", "business", "remittance", "allotment", "own clinic"] as const
export type IncomeOption = (typeof INCOME_OPTIONS)[number]

export const LOAN_OPTIONS = [
  "Sangla ORCR",
  "Financing: 2nd hand Purchase",
  "Financing: Brand New",
  "Doctor's Loan",
  "Real Estate Loan",
] as const
export type LoanOption = (typeof INCOME_OPTIONS)[number]

export const CIVIL_STATUS_OPTIONS = ["single", "annulled", "separated", "married", "commonLaw"] as const
export type CivilStatus = (typeof CIVIL_STATUS_OPTIONS)[number]

export const GENDER_OPTIONS = ["male", "female"] as const
export type Gender = (typeof GENDER_OPTIONS)[number]

export const CITIZENSHIP_OPTIONS = ["filipino", "others"] as const
export type Citizenship = (typeof CITIZENSHIP_OPTIONS)[number]

export const HOUSE_OWNERSHIP_OPTIONS = ["ownedNotMortgaged", "ownedMortgaged", "rented", "usedFree"] as const
export type HouseOwnership = (typeof HOUSE_OWNERSHIP_OPTIONS)[number]

export const INCOME_SOURCE_OPTIONS = [
  "employment",
  "remittance",
  "pension",
  "commissions",
  "business",
  "interestIncome",
  "saleOfAssets",
] as const
export type IncomeSource = (typeof INCOME_SOURCE_OPTIONS)[number]

export const ACCOUNT_TYPE_OPTIONS = ["savings", "current"] as const
export type AccountType = (typeof ACCOUNT_TYPE_OPTIONS)[number]

export const GDFI_SOURCE_OPTIONS = [
  "walkInClient",
  "gdfiWebsite",
  "gdfiEmployee",
  "loanConsultant",
  "billboardOutdoorAds",
  "eventsSponshorships",
  "televisionRadioPrint",
  "socialMedia",
] as const
export type GdfiSource = (typeof GDFI_SOURCE_OPTIONS)[number]

export const NATURE_OF_WORK_OPTIONS = [
  "agricultureAnimalFarming",
  "foodServicesFoodProcessing",
  "realEstateLeasing",
  "bpoKpo",
  "governmentService",
  "tourism",
  "casinoGamingClub",
  "itSoftware",
  "transportation",
  "construction",
  "lawAccountingAuditingFirm",
  "wholesaleRetailTrade",
  "financeInsuranceSecurities",
  "manufacturing",
  "utilities",
  "forexMoneyChangerRemittance",
  "maritimeShipping",
  "foundation",
  "medicalHealthServices",
  "others",
] as const
export type NatureOfWork = (typeof NATURE_OF_WORK_OPTIONS)[number]

// --- Sub-types ---

export type DependentEntry = {
  name: string
  age: string
  schoolLastAttended: string
  relationship: string
}

export type BankAccountEntry = {
  bankBranch: string
  accountName: string
  dateOpened: string
  accountType: AccountType | ""
  accountNumber: string
}

export type AuthorizeBankEntry = {
  bankBranch: string
  accountNumber: string
  accountType: AccountType | ""
}
