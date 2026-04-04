"use client"
import { useApplication } from "@/app/context/form-context"
import { HOUSE_OWNERSHIP_OPTIONS, HouseOwnership } from "@/app/context/form-context-types"
import { Checkbox } from "@/app/ui/checkbox"
import { Input, InputAmount } from "@/app/ui/input"
import { SelectionMenu } from "@/app/ui/selection"
import { ChangeEvent, useState } from "react"
import { StepContainer } from "./components/step-container"

export default function CoborrowerAddressInformation() {
  const { applicationData, updateApplicationData } = useApplication()

  const [sameAsPresent, setSameAsPresent] = useState(true)
  const handleToggleSameAsPresent = () => {
    const nextValue = !sameAsPresent

    setSameAsPresent(nextValue)

    if (nextValue) {
      updateApplicationData("coPermanentAddress", applicationData.coPresentAddress)
    } else {
      updateApplicationData("coPermanentAddress", "")
    }
  }

  const handleEditPresentAddress = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const val = e.target.value

    updateApplicationData("coPresentAddress", val)
    updateApplicationData("coProvincialAddress", val)

    if (sameAsPresent) {
      updateApplicationData("coPermanentAddress", val)
    }
  }

  return (
    <StepContainer>
      <div className="flex w-full gap-1">
        <Input
          value={applicationData.coPresentAddress}
          onChange={handleEditPresentAddress}
          placeholder="123 Main St, Quezon City"
          label="Present Address"
        />
        <div className="grid max-w-22 grid-cols-2 gap-1">
          <Input
            value={applicationData.coAddressPresYears}
            onChange={(e) => updateApplicationData("coAddressPresYears", e.target.value)}
            placeholder="0"
            label="for Yrs"
            className="w-full"
          />
          <Input
            value={applicationData.coAddressPresMonths}
            onChange={(e) => updateApplicationData("coAddressPresMonths", e.target.value)}
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
              value={applicationData.coPermanentAddress}
              onChange={(e) => updateApplicationData("coPermanentAddress", e.target.value)}
              placeholder="123 Main St, Quezon City"
              label="Permanent Address"
            />
            <div className="grid max-w-22 grid-cols-2 gap-1">
              <Input
                value={applicationData.coAddressPermYears}
                onChange={(e) => updateApplicationData("coAddressPermYears", e.target.value)}
                placeholder="0"
                className="w-full"
                label="for Yrs"
              />
              <Input
                value={applicationData.coAddressPermMonths}
                onChange={(e) => updateApplicationData("coAddressPermMonths", e.target.value)}
                placeholder="0"
                className="w-full"
                label="& Mos"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {sameAsPresent && <label className="text-sm font-medium">Permanent Address</label>}
          <Checkbox
            button
            checked={sameAsPresent}
            size="lg"
            label="Same as present address"
            onChange={handleToggleSameAsPresent}
          />
        </div>
      </div>

      <SelectionMenu
        label="House Ownership"
        value={applicationData.coHouseOwnership}
        onChange={(val) => updateApplicationData("coHouseOwnership", val as HouseOwnership)}
        options={HOUSE_OWNERSHIP_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
      />
      {applicationData.coHouseOwnership === "rented" && (
        <>
          <InputAmount
            currency="PHP"
            value={applicationData.coHouseRentMonthly}
            onChange={(e) => updateApplicationData("coHouseRentMonthly", e)}
            label="Monthly Rent"
          />
          <Input
            value={applicationData.coHouseOwnedBy}
            onChange={(e) => updateApplicationData("coHouseOwnedBy", e.target.value)}
            placeholder="Individual / Bank / Company"
            label="Rented From"
          />
        </>
      )}
      {applicationData.coHouseOwnership === "owned (Mortgaged)" && (
        <>
          <InputAmount
            currency="PHP"
            value={applicationData.coHouseMortgageMonthly}
            onChange={(e) => updateApplicationData("coHouseMortgageMonthly", e)}
            label="Monthly Mortgage"
          />
          <Input
            value={applicationData.coHouseOwnedBy}
            onChange={(e) => updateApplicationData("coHouseOwnedBy", e.target.value)}
            placeholder="Individual / Bank / Company"
            label="Mortgaged From"
          />
        </>
      )}
      {applicationData.coHouseOwnership === "used Free" && (
        <Input
          value={applicationData.coHouseOwnedBy}
          onChange={(e) => updateApplicationData("coHouseOwnedBy", e.target.value)}
          placeholder="Individual / Bank / Company"
          label="Owned By"
        />
      )}
    </StepContainer>
  )
}
