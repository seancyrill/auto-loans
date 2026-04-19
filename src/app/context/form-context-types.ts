import { Dispatch, SetStateAction } from "react"

export type ApplicationContextType = {
  fullName: string
  applicationData: ApplicationFormType
  updateApplicationData: <K extends keyof ApplicationFormType>(field: K, value: ApplicationFormType[K]) => void
  resetApplication: (setInto?: ApplicationFormType) => void
  applicationLoading: ApplicationLoadingType
  setApplicationLoading: Dispatch<SetStateAction<ApplicationLoadingType>>
  updateCoBorrower: <K extends keyof CoBorrowerType>(field: K, value: CoBorrowerType[K]) => void
  addArrayItem: <K extends FormArrayFields>(field: K, item: ApplicationFormType[K][number]) => void
  removeArrayItem: <K extends FormArrayFields>(field: K, index: number) => void
  updateArrayItem: <K extends FormArrayFields>(
    field: K,
    index: number,
    value: Partial<ApplicationFormType[K][number]>,
  ) => void
  applicationImages: { name: string; image: string }[]
  updateImages: (name: string, images: string[]) => void
}

export type ApplicationLoadingType = {
  loading: boolean
  text?: string
}

export type ApplicationImageType = { name: string; image: string }

// --- Main Form Type ---

export type ApplicationFormType = {
  loanOption: LoanOption
  lender: LenderOption
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
  mobile: string
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
  employmentIncome: string
  remittanceIncome: string
  pensionIncome: string
  commissionsIncome: string
  businessIncome: string
  interestIncome: string
  saleOfAssetsIncome: string
  employmentYears: string
  employmentMonths: string
  employerBusinessAddress: string
  prcLicenseNumber: string
  businessTelNumber: string
  incomeSources: IncomeSourceType[]
  natureOfWork: NatureOfWork[]
  natureOfWorkOther: string

  coBorrower: CoBorrowerType

  motorVehicle: MotorVehicle | null
  characterReferences: CharacterReference[]
  tradeReferences: TradeReference[]
  bankAccounts: BankAccountEntry[]
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
export type LoanOption = (typeof LOAN_OPTIONS)[number]

export const LENDER_OPTIONS = ["Global Dominion Financing Inc."] as const
export type LenderOption = (typeof LENDER_OPTIONS)[number]

export const CIVIL_STATUS_OPTIONS = ["single", "annulled", "separated", "married", "common Law"] as const
export type CivilStatus = (typeof CIVIL_STATUS_OPTIONS)[number]

export const GENDER_OPTIONS = ["male", "female"] as const
export type Gender = (typeof GENDER_OPTIONS)[number]

export const CITIZENSHIP_OPTIONS = ["filipino", "others"] as const
export type Citizenship = (typeof CITIZENSHIP_OPTIONS)[number]

export const HOUSE_OWNERSHIP_OPTIONS = ["owned (Not Mortgaged)", "owned (Mortgaged)", "rented", "used Free"] as const
export type HouseOwnership = (typeof HOUSE_OWNERSHIP_OPTIONS)[number]

export const INCOME_SOURCE_OPTIONS = [
  "employment",
  "remittance",
  "pension",
  "commissions",
  "business",
  "interest Income",
  "sale Of Assets",
] as const
export type IncomeSourceType = (typeof INCOME_SOURCE_OPTIONS)[number]

export const ACCOUNT_TYPE_OPTIONS = ["savings", "current"] as const
export type AccountType = (typeof ACCOUNT_TYPE_OPTIONS)[number]

export const NATURE_OF_WORK_OPTIONS = [
  "agriculture / Animal Farming",
  "food Services / Food Processing",
  "real Estate Leasing",
  "BPO",
  "government Service",
  "tourism",
  "casino / Gaming Club",
  "IT / Software",
  "transportation",
  "construction",
  "law / Accounting / Auditing Firm",
  "wholesale / Retail Trade",
  "finance / Insurance / Securities",
  "manufacturing",
  "utilities",
  "forex / Money Changer / Remittance Agent",
  "maritime / Shipping",
  "foundation",
  "medical Health Services",
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

export type MotorVehicle = {
  year: string
  makeModel: string
  color: string
  plateNumber: string
  mileageKm: string
  placeOfRegistration: string
}

export type CharacterReference = {
  name: string
  address: string
  contactNumber: string
}

export type TradeReference = {
  businessName: string
  address: string
  contactNumber: string
}

export type CoBorrowerType = {
  firstName: string
  middleName: string
  lastName: string
  nameSuffix: string
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
  // income
  employerName: string
  businessName: string
  incomeNotApplicable: boolean
  monthlyIncome: string
  employmentYears: string
  employmentMonths: string
  employerBusinessAddress: string
  businessTelNumber: string
}

/**
 * Resolves to: "characterReferences" | "tradeReferences" | "bankAccounts" | "authorizeBankDetails" | "dependents"
 */
export type FormArrayFields = {
  [K in keyof ApplicationFormType]: ApplicationFormType[K] extends unknown[] ? K : never
}[keyof ApplicationFormType]

const initialCoBorrower: CoBorrowerType = {
  firstName: "",
  middleName: "",
  lastName: "",
  nameSuffix: "",
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
  mobile: "",
  email: "",
  citizenship: "filipino",
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
  employerName: "",
  businessName: "",
  incomeNotApplicable: false,
  monthlyIncome: "",
  employmentYears: "",
  employmentMonths: "",
  employerBusinessAddress: "",
  businessTelNumber: "",
}

export const initialApplicationData: ApplicationFormType = {
  loanOption: "Sangla ORCR",
  lender: "Global Dominion Financing Inc.",
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
  mobile: "",
  citizenship: "filipino",
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
  employmentIncome: "",
  remittanceIncome: "",
  pensionIncome: "",
  commissionsIncome: "",
  businessIncome: "",
  interestIncome: "",
  saleOfAssetsIncome: "",
  employmentYears: "",
  employmentMonths: "",
  employerBusinessAddress: "",
  prcLicenseNumber: "",
  businessTelNumber: "",
  incomeSources: [],
  natureOfWork: [],
  natureOfWorkOther: "",
  // Co-Borrower
  coBorrower: initialCoBorrower,
  // Motor Vehicle
  motorVehicle: null,
  // Arrays
  characterReferences: [],
  tradeReferences: [],
  bankAccounts: [],
  authorizeBankDetails: [],
}
