"use client"
import { useApplication } from "@/app/context/form-context"
import {
  Citizenship,
  CITIZENSHIP_OPTIONS,
  CIVIL_STATUS_OPTIONS,
  CivilStatus,
  Gender,
  GENDER_OPTIONS,
  HOUSE_OWNERSHIP_OPTIONS,
  HouseOwnership,
} from "@/app/context/form-context-types"
import { Checkbox } from "@/app/ui/checkbox"
import { DateInput } from "@/app/ui/date-input"
import { Input } from "@/app/ui/input"
import { SelectionMenu } from "@/app/ui/selection"
import { formatPhone } from "@/app/utils/format-phone"
import { ChangeEvent, useState } from "react"
import { StepContainer } from "./components/step-container"

export default function LoanOptions() {
  const { applicationData, updateApplicationData } = useApplication()

  const [sameAsPresent, setSameAsPresent] = useState(true)
  const handleToggleSameAsPresent = () => {
    const nextValue = !sameAsPresent

    setSameAsPresent(nextValue)

    if (nextValue) {
      updateApplicationData("permanentAddress", applicationData.presentAddress)
    } else {
      updateApplicationData("permanentAddress", "")
    }
  }

  const handleEditPresentAddress = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const val = e.target.value

    updateApplicationData("presentAddress", val)
    updateApplicationData("provincialAddress", val)

    if (sameAsPresent) {
      updateApplicationData("permanentAddress", val)
    }
  }

  return (
    <StepContainer>
      {/* Full Name */}
      <div className="flex w-full gap-1">
        <Input
          value={applicationData.firstName}
          onChange={(e) => updateApplicationData("firstName", e.target.value)}
          required
          placeholder="Juan"
          label="First Name"
        />
        <Input
          value={applicationData.middleName}
          onChange={(e) => updateApplicationData("middleName", e.target.value)}
          placeholder="Santos"
          label="Middle Name"
        />
        <Input
          value={applicationData.lastName}
          onChange={(e) => updateApplicationData("lastName", e.target.value)}
          required
          placeholder="Dela Cruz"
          label="Last Name"
        />
        <Input
          value={applicationData.nameSuffix}
          onChange={(e) => updateApplicationData("nameSuffix", e.target.value)}
          placeholder="Jr."
          label="Suffix"
        />
      </div>

      {/* Birth & Gender */}
      <DateInput
        value={applicationData.birthDate}
        onChange={(e) => updateApplicationData("birthDate", e.target.value)}
        placeholder="MM/DD/YYYY"
        label="Date of Birth"
      />
      <Input
        value={applicationData.birthPlace}
        onChange={(e) => updateApplicationData("birthPlace", e.target.value)}
        placeholder="Cabanatuan"
        label="Place of Birth"
      />
      <SelectionMenu
        label="Gender"
        value={applicationData.gender}
        onChange={(val) => updateApplicationData("gender", val as Gender)}
        options={GENDER_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
      />
      <SelectionMenu
        label="Civil Status"
        value={applicationData.civilStatus}
        onChange={(val) => updateApplicationData("civilStatus", val as CivilStatus)}
        options={CIVIL_STATUS_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
      />

      {/* Present Address */}
      <div className="flex w-full gap-1">
        <Input
          value={applicationData.presentAddress}
          onChange={handleEditPresentAddress}
          placeholder="123 Main St, Quezon City"
          label="Present Address"
        />
        <div className="grid max-w-22 grid-cols-2 gap-1">
          <Input
            value={applicationData.addressPresYears}
            onChange={(e) => updateApplicationData("addressPresYears", e.target.value)}
            placeholder="0"
            label="for Yrs"
            className="w-full"
          />
          <Input
            value={applicationData.addressPresMonths}
            onChange={(e) => updateApplicationData("addressPresMonths", e.target.value)}
            placeholder="0"
            label="& Mos"
            className="w-full"
          />
        </div>
      </div>

      {/* Permanent Address */}
      <div className="flex w-full flex-col gap-1">
        <div className="flex flex-col">
          <label className="text-sm">Permanent Address</label>
          <Checkbox checked={sameAsPresent} onChange={handleToggleSameAsPresent} size={"lg"} label="Same as present" />
        </div>

        {!sameAsPresent && (
          <div className="flex w-full gap-1">
            <Input
              value={applicationData.permanentAddress}
              onChange={(e) => updateApplicationData("permanentAddress", e.target.value)}
              placeholder="123 Main St, Quezon City"
              label="Permanent Address"
            />
            <div className="grid max-w-22 grid-cols-2 gap-1">
              <Input
                value={applicationData.addressPermYears}
                onChange={(e) => updateApplicationData("addressPermYears", e.target.value)}
                placeholder="0"
                className="w-full"
                label="for Yrs"
              />
              <Input
                value={applicationData.addressPermMonths}
                onChange={(e) => updateApplicationData("addressPermMonths", e.target.value)}
                placeholder="0"
                className="w-full"
                label="& Mos"
              />
            </div>
          </div>
        )}
      </div>

      <Input
        value={formatPhone(applicationData.mobile)}
        onChange={(e) => {
          const value = e.target.value.replace(/\s/g, "")
          if (value === "" || /^\d+$/.test(value) || value.length > 12) {
            updateApplicationData("mobile", value)
          }
        }}
        required
        maxLength={12}
        minLength={12}
        placeholder="9XX XXX XXXX"
        label="Mobile Number"
        mobile
      />

      {/* Citizenship */}
      <SelectionMenu
        label="Citizenship"
        value={applicationData.citizenship}
        onChange={(val) => updateApplicationData("citizenship", val as Citizenship)}
        options={CITIZENSHIP_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
      />
      {applicationData.citizenship === "others" && (
        <Input
          value={applicationData.citizenshipOther}
          onChange={(e) => updateApplicationData("citizenshipOther", e.target.value)}
          placeholder="e.g. American"
          label="Please specify citizenship"
        />
      )}

      {/* TIN / SSS / GSIS */}
      <Input value={applicationData.tin} onChange={(e) => updateApplicationData("tin", e.target.value)} label="TIN" />
      <Input
        value={applicationData.sssNumber}
        onChange={(e) => updateApplicationData("sssNumber", e.target.value)}
        label="SSS Number"
      />
      <Input
        value={applicationData.gsisNumber}
        onChange={(e) => updateApplicationData("gsisNumber", e.target.value)}
        label="GSIS Number"
      />

      {/* School Last Attended */}
      <Input
        value={applicationData.schoolName}
        onChange={(e) => updateApplicationData("schoolName", e.target.value)}
        label="School Name"
      />
      <Input
        value={applicationData.schoolGradeLevel}
        onChange={(e) => updateApplicationData("schoolGradeLevel", e.target.value)}
        placeholder="Bachelor of Science"
        label="Grade / Level / College Course"
      />
      <Input
        value={applicationData.schoolYearGraduated}
        onChange={(e) => updateApplicationData("schoolYearGraduated", e.target.value)}
        placeholder="2020"
        label="Year Graduated / Last Year of Stay"
      />

      {/* House Ownership */}
      <SelectionMenu
        label="House Ownership"
        value={applicationData.houseOwnership}
        onChange={(val) => updateApplicationData("houseOwnership", val as HouseOwnership)}
        options={HOUSE_OWNERSHIP_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
      />
      {applicationData.houseOwnership === "rented" && (
        <>
          <Input
            value={applicationData.houseRentMonthly}
            onChange={(e) => updateApplicationData("houseRentMonthly", e.target.value)}
            placeholder="5000"
            label="Monthly Rent (PHP)"
          />
          <Input
            value={applicationData.houseOwnedBy}
            onChange={(e) => updateApplicationData("houseOwnedBy", e.target.value)}
            placeholder="Individual / Bank / Company name"
            label="Rented From"
          />
        </>
      )}
      {applicationData.houseOwnership === "owned (Mortgaged)" && (
        <>
          <Input
            value={applicationData.houseMortgageMonthly}
            onChange={(e) => updateApplicationData("houseMortgageMonthly", e.target.value)}
            placeholder="10000"
            label="Monthly Mortgage (PHP)"
          />
          <Input
            value={applicationData.houseOwnedBy}
            onChange={(e) => updateApplicationData("houseOwnedBy", e.target.value)}
            placeholder="Individual / Bank / Company name"
            label="Mortgaged With"
          />
        </>
      )}
      {applicationData.houseOwnership === "used Free" && (
        <Input
          value={applicationData.houseOwnedBy}
          onChange={(e) => updateApplicationData("houseOwnedBy", e.target.value)}
          placeholder="Individual / Bank / Company name"
          label="Owned By"
        />
      )}

      {/* Toggle motor vehicle section on/off */}
      <SelectionMenu
        label="Do you own a motor vehicle? (not used as collateral)"
        value={applicationData.motorVehicle ? "yes" : "no"}
        onChange={(val) =>
          updateApplicationData(
            "motorVehicle",
            val === "yes"
              ? {
                  year: "",
                  makeModel: "",
                  color: "",
                  plateNumber: "",
                  mileageKm: "",
                  placeOfRegistration: "",
                }
              : null,
          )
        }
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      {applicationData.motorVehicle && (
        <>
          <Input
            value={applicationData.motorVehicle.year}
            onChange={(e) =>
              updateApplicationData("motorVehicle", { ...applicationData.motorVehicle!, year: e.target.value })
            }
            placeholder="2020"
            label="Year"
          />
          <Input
            value={applicationData.motorVehicle.makeModel}
            onChange={(e) =>
              updateApplicationData("motorVehicle", { ...applicationData.motorVehicle!, makeModel: e.target.value })
            }
            placeholder="Toyota Vios"
            label="Make / Model"
          />
          <Input
            value={applicationData.motorVehicle.color}
            onChange={(e) =>
              updateApplicationData("motorVehicle", { ...applicationData.motorVehicle!, color: e.target.value })
            }
            placeholder="White"
            label="Color"
          />
          <Input
            value={applicationData.motorVehicle.plateNumber}
            onChange={(e) =>
              updateApplicationData("motorVehicle", { ...applicationData.motorVehicle!, plateNumber: e.target.value })
            }
            placeholder="ABC 1234"
            label="Plate No."
          />
          <Input
            value={applicationData.motorVehicle.mileageKm}
            onChange={(e) =>
              updateApplicationData("motorVehicle", { ...applicationData.motorVehicle!, mileageKm: e.target.value })
            }
            placeholder="50000"
            label="Mileage (Kms)"
          />
          <Input
            value={applicationData.motorVehicle.placeOfRegistration}
            onChange={(e) =>
              updateApplicationData("motorVehicle", {
                ...applicationData.motorVehicle!,
                placeOfRegistration: e.target.value,
              })
            }
            placeholder="Quezon City"
            label="Place of Registration"
          />
        </>
      )}

      {[0, 1, 2].map((i) => (
        <>
          <Input
            value={applicationData.characterReferences[i]?.name ?? ""}
            onChange={(e) => {
              const updated = [...applicationData.characterReferences]
              updated[i] = { ...updated[i], name: e.target.value }
              updateApplicationData("characterReferences", updated)
            }}
            placeholder="Full Name"
            label={`Character Reference ${i + 1} — Name`}
          />
          <Input
            value={applicationData.characterReferences[i]?.address ?? ""}
            onChange={(e) => {
              const updated = [...applicationData.characterReferences]
              updated[i] = { ...updated[i], address: e.target.value }
              updateApplicationData("characterReferences", updated)
            }}
            placeholder="Address"
            label={`Character Reference ${i + 1} — Address`}
          />
          <Input
            value={applicationData.characterReferences[i]?.contactNumber ?? ""}
            onChange={(e) => {
              const updated = [...applicationData.characterReferences]
              updated[i] = { ...updated[i], contactNumber: e.target.value }
              updateApplicationData("characterReferences", updated)
            }}
            placeholder="09XX XXX XXXX"
            label={`Character Reference ${i + 1} — Contact Number`}
          />
        </>
      ))}

      {[0, 1, 2].map((i) => (
        <>
          <Input
            value={applicationData.tradeReferences[i]?.businessName ?? ""}
            onChange={(e) => {
              const updated = [...applicationData.tradeReferences]
              updated[i] = { ...updated[i], businessName: e.target.value }
              updateApplicationData("tradeReferences", updated)
            }}
            placeholder="Business Name"
            label={`Trade Reference ${i + 1} — Name / Business Name`}
          />
          <Input
            value={applicationData.tradeReferences[i]?.address ?? ""}
            onChange={(e) => {
              const updated = [...applicationData.tradeReferences]
              updated[i] = { ...updated[i], address: e.target.value }
              updateApplicationData("tradeReferences", updated)
            }}
            placeholder="Address"
            label={`Trade Reference ${i + 1} — Address`}
          />
          <Input
            value={applicationData.tradeReferences[i]?.contactNumber ?? ""}
            onChange={(e) => {
              const updated = [...applicationData.tradeReferences]
              updated[i] = { ...updated[i], contactNumber: e.target.value }
              updateApplicationData("tradeReferences", updated)
            }}
            placeholder="09XX XXX XXXX"
            label={`Trade Reference ${i + 1} — Contact Number`}
          />
        </>
      ))}
    </StepContainer>
  )
}
