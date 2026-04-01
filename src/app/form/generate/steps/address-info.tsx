"use client"
import { useApplication } from "@/app/context/form-context"
import { HOUSE_OWNERSHIP_OPTIONS, HouseOwnership } from "@/app/context/form-context-types"
import { Checkbox } from "@/app/ui/checkbox"
import { Input } from "@/app/ui/input"
import { SelectionMenu } from "@/app/ui/selection"
import { ChangeEvent, useState } from "react"
import { StepContainer } from "./components/step-container"

export default function AddressInformation() {
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

      <div className="flex w-full flex-col gap-1">
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

        <div className="flex flex-col" onClick={handleToggleSameAsPresent}>
          {sameAsPresent && <label className="text-sm">Permanent Address</label>}
          <Checkbox button checked={sameAsPresent} size={"lg"} label="Same as present" />
        </div>
      </div>

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
    </StepContainer>
  )
}
