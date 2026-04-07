"use client"
import { useApplication } from "@/app/context/form-context"
import { useStepper } from "@/app/context/stepper-context"
import { StepContainer } from "./components/step-container"

const Section = ({ title, stepIndex, children }: { title: string; stepIndex: number; children: React.ReactNode }) => {
  const { goToStep } = useStepper()

  return (
    <div className="border-border flex flex-col gap-2 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">{title}</h3>
        <button
          onClick={() => goToStep(stepIndex, true)}
          className="text-primary text-xs font-medium underline-offset-4 hover:underline"
        >
          Edit
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">{children}</div>
    </div>
  )
}

const Field = ({ label, value, full }: { label: string; value?: string | null; full?: boolean }) => (
  <div className={`flex flex-col gap-0.5 ${full ? "col-span-2" : ""}`}>
    <span className="text-muted-foreground text-xs">{label}</span>
    <span className="text-sm font-medium">{value || <span className="text-muted-foreground italic">—</span>}</span>
  </div>
)

export default function ReviewStep() {
  const { applicationData: d } = useApplication()
  const co = d.coBorrower

  // Mirror step order for correct Edit indices
  let idx = 0
  const personalIdx = idx++
  const addressIdx = idx++
  const incomeIdx = idx++
  if (d.incomeSources.includes("employment")) idx++
  if (d.incomeSources.includes("business")) idx++
  if (d.incomeSources.includes("remittance")) idx++
  if (d.incomeSources.includes("pension")) idx++
  if (d.incomeSources.includes("commissions")) idx++
  if (d.incomeSources.includes("interest Income")) idx++
  if (d.incomeSources.includes("sale Of Assets")) idx++
  const motorVehicleIdx = d.motorVehicle !== null ? idx++ : null
  const bankAccountsIdx = idx++
  const coBorrowerIdx = idx++
  idx++ // coborrower address
  const coBorrowerIncomeIdx = idx++
  const charRefsIdx = idx++
  const tradeRefsIdx = idx++

  return (
    <StepContainer>
      <p className="text-muted-foreground text-sm">
        Please review your information before submitting. Tap <strong>Edit</strong> on any section to make changes.
      </p>

      <Section title="Personal Information" stepIndex={personalIdx}>
        <Field label="First Name" value={d.firstName} />
        <Field label="Middle Name" value={d.middleName} />
        <Field label="Last Name" value={d.lastName} />
        <Field label="Suffix" value={d.nameSuffix} />
        <Field label="Civil Status" value={d.civilStatus} />
        <Field label="Gender" value={d.gender} />
        <Field label="Birth Date" value={d.birthDate} />
        <Field label="Birth Place" value={d.birthPlace} />
        <Field label="Mobile" value={d.mobile} />
        <Field label="Citizenship" value={d.citizenship === "others" ? d.citizenshipOther : d.citizenship} />
        <Field label="TIN" value={d.tin} />
        <Field label="SSS No." value={d.sssNumber} />
        <Field label="GSIS No." value={d.gsisNumber} />
        <Field label="School" value={d.schoolName} />
        <Field label="Grade Level" value={d.schoolGradeLevel} />
        <Field label="Year Graduated" value={d.schoolYearGraduated} />
        {d.dependents
          .filter((dep) => dep.name)
          .map((dep, i) => (
            <Field
              key={i}
              full
              label={`Dependent ${i + 1}`}
              value={`${dep.name} — ${dep.relationship}, Age ${dep.age}`}
            />
          ))}
      </Section>

      <Section title="Address" stepIndex={addressIdx}>
        <Field full label="Present Address" value={d.presentAddress} />
        <Field label="Years" value={d.addressPresYears} />
        <Field label="Months" value={d.addressPresMonths} />
        <Field full label="Permanent Address" value={d.permanentAddress} />
        <Field label="Years" value={d.addressPermYears} />
        <Field label="Months" value={d.addressPermMonths} />
        <Field full label="Provincial Address" value={d.provincialAddress} />
        <Field label="House Ownership" value={d.houseOwnership} />
        {d.houseOwnership === "rented" && <Field label="Monthly Rent" value={`PHP ${d.houseRentMonthly}`} />}
        {d.houseOwnership === "owned (Mortgaged)" && (
          <Field label="Monthly Mortgage" value={`PHP ${d.houseMortgageMonthly}`} />
        )}
        {d.houseOwnedBy && <Field label="Owned / Rented From" value={d.houseOwnedBy} />}
      </Section>

      <Section title="Income Information" stepIndex={incomeIdx}>
        {d.incomeNotApplicable ? (
          <Field full label="Income" value="Not Applicable" />
        ) : (
          d.incomeSources.map((src) => (
            <Field
              key={src}
              label={src}
              value={
                src === "employment"
                  ? `PHP ${d.employmentIncome}`
                  : src === "remittance"
                    ? `PHP ${d.remittanceIncome}`
                    : src === "pension"
                      ? `PHP ${d.pensionIncome}`
                      : src === "commissions"
                        ? `PHP ${d.commissionsIncome}`
                        : src === "business"
                          ? `PHP ${d.businessIncome}`
                          : src === "interest Income"
                            ? `PHP ${d.interestIncome}`
                            : src === "sale Of Assets"
                              ? `PHP ${d.saleOfAssetsIncome}`
                              : ""
              }
            />
          ))
        )}
        {d.natureOfWork.length > 0 && (
          <Field
            full
            label="Nature of Work"
            value={[...d.natureOfWork, d.natureOfWorkOther].filter(Boolean).join(", ")}
          />
        )}
        {d.employerName && <Field label="Employer" value={d.employerName} />}
        {d.businessName && <Field label="Business" value={d.businessName} />}
        {d.employerBusinessAddress && (
          <Field full label="Employer / Business Address" value={d.employerBusinessAddress} />
        )}
        {d.prcLicenseNumber && <Field label="PRC License No." value={d.prcLicenseNumber} />}
        {d.businessTelNumber && <Field label="Business Tel. No." value={d.businessTelNumber} />}
      </Section>

      {d.motorVehicle && motorVehicleIdx !== null && (
        <Section title="Owned Vehicle" stepIndex={motorVehicleIdx}>
          <Field label="Year" value={d.motorVehicle.year} />
          <Field label="Make / Model" value={d.motorVehicle.makeModel} />
          <Field label="Color" value={d.motorVehicle.color} />
          <Field label="Plate Number" value={d.motorVehicle.plateNumber} />
          <Field label="Mileage (km)" value={d.motorVehicle.mileageKm} />
          <Field full label="Place of Registration" value={d.motorVehicle.placeOfRegistration} />
        </Section>
      )}

      {d.bankAccounts.filter((b) => b.bankBranch || b.accountNumber).length > 0 && (
        <Section title="Bank Accounts" stepIndex={bankAccountsIdx}>
          {d.bankAccounts
            .filter((b) => b.bankBranch || b.accountNumber)
            .map((b, i) => (
              <div
                key={i}
                className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-1 border-t pt-2 first:border-t-0 first:pt-0"
              >
                <Field label="Bank / Branch" value={b.bankBranch} />
                <Field label="Account Name" value={b.accountName} />
                <Field label="Account Number" value={b.accountNumber} />
                <Field label="Account Type" value={b.accountType} />
                <Field label="Date Opened" value={b.dateOpened} />
              </div>
            ))}
        </Section>
      )}

      {(co.firstName || co.lastName) && (
        <>
          <Section title="Co-Borrower" stepIndex={coBorrowerIdx}>
            <Field label="First Name" value={co.firstName} />
            <Field label="Middle Name" value={co.middleName} />
            <Field label="Last Name" value={co.lastName} />
            <Field label="Suffix" value={co.nameSuffix} />
            <Field label="Gender" value={co.gender} />
            <Field label="Birth Date" value={co.birthDate} />
            <Field label="Birth Place" value={co.birthPlace} />
            <Field label="Mobile" value={co.mobile} />
            <Field label="Email" value={co.email} />
            <Field label="Citizenship" value={co.citizenship === "others" ? co.citizenshipOther : co.citizenship} />
            <Field label="TIN" value={co.tin} />
            <Field label="SSS No." value={co.sssNumber} />
            <Field label="GSIS No." value={co.gsisNumber} />
            <Field label="School" value={co.schoolName} />
            <Field label="Grade Level" value={co.schoolGradeLevel} />
            <Field label="Year Graduated" value={co.schoolYearGraduated} />
            <Field full label="Present Address" value={co.presentAddress} />
            <Field full label="Permanent Address" value={co.permanentAddress} />
            <Field full label="Provincial Address" value={co.provincialAddress} />
            <Field label="House Ownership" value={co.houseOwnership} />
            {co.houseOwnership === "rented" && <Field label="Monthly Rent" value={`PHP ${co.houseRentMonthly}`} />}
            {co.houseOwnership === "owned (Mortgaged)" && (
              <Field label="Monthly Mortgage" value={`PHP ${co.houseMortgageMonthly}`} />
            )}
            {co.houseOwnedBy && <Field label="Owned / Rented From" value={co.houseOwnedBy} />}
          </Section>

          <Section title="Co-Borrower Income" stepIndex={coBorrowerIncomeIdx}>
            {co.incomeNotApplicable ? (
              <Field full label="Income" value="Not Applicable" />
            ) : (
              <>
                <Field label="Monthly Income" value={co.monthlyIncome ? `PHP ${co.monthlyIncome}` : ""} />
                {co.employerName && <Field label="Employer" value={co.employerName} />}
                {co.businessName && <Field label="Business" value={co.businessName} />}
                {co.employerBusinessAddress && (
                  <Field full label="Employer / Business Address" value={co.employerBusinessAddress} />
                )}
                {co.businessTelNumber && <Field label="Business Tel. No." value={co.businessTelNumber} />}
              </>
            )}
          </Section>
        </>
      )}

      {d.characterReferences.filter((r) => r.name).length > 0 && (
        <Section title="Character References" stepIndex={charRefsIdx}>
          {d.characterReferences
            .filter((r) => r.name)
            .map((ref, i) => (
              <div
                key={i}
                className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-1 border-t pt-2 first:border-t-0 first:pt-0"
              >
                <Field label="Name" value={ref.name} />
                <Field label="Contact" value={ref.contactNumber} />
                <Field full label="Address" value={ref.address} />
              </div>
            ))}
        </Section>
      )}

      {d.tradeReferences.filter((r) => r.businessName).length > 0 && (
        <Section title="Trade References" stepIndex={tradeRefsIdx}>
          {d.tradeReferences
            .filter((r) => r.businessName)
            .map((ref, i) => (
              <div
                key={i}
                className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-1 border-t pt-2 first:border-t-0 first:pt-0"
              >
                <Field label="Business Name" value={ref.businessName} />
                <Field label="Contact" value={ref.contactNumber} />
                <Field full label="Address" value={ref.address} />
              </div>
            ))}
        </Section>
      )}
    </StepContainer>
  )
}
