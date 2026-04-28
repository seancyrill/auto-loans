"use client"
import { useApplication } from "@/app/context/form-context"
import { HOUSE_OWNERSHIP_OPTIONS, HouseOwnership } from "@/app/context/form-context-types"
import { Checkbox } from "@/app/ui/checkbox"
import { Input, InputAmount } from "@/app/ui/input"
import { SelectionMenu } from "@/app/ui/selection"
import { ChangeEvent, useState } from "react"

export default function CoborrowerAddressInformation() {
  const { applicationData, updateCoBorrower } = useApplication()
  const co = applicationData.coBorrower

  const [sameAsPresent, setSameAsPresent] = useState(true)

  const handleToggleSameAsPresent = () => {
    const nextValue = !sameAsPresent
    setSameAsPresent(nextValue)
    updateCoBorrower("permanentAddress", nextValue ? co.presentAddress : "")
  }

  const handleEditPresentAddress = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    updateCoBorrower("presentAddress", val)
    updateCoBorrower("provincialAddress", val)
    if (sameAsPresent) {
      updateCoBorrower("permanentAddress", val)
    }
  }

  return (
    <>
      <div className="flex w-full gap-1">
        <Input
          value={co.presentAddress}
          onChange={handleEditPresentAddress}
          placeholder="123 Main St, Quezon City"
          label="Present Address"
        />
        <div className="grid max-w-22 grid-cols-2 gap-1">
          <Input
            value={co.addressPresYears}
            onChange={(e) => updateCoBorrower("addressPresYears", e.target.value)}
            placeholder="0"
            label="for Yrs"
            type="number"
            className="w-full"
          />
          <Input
            value={co.addressPresMonths}
            onChange={(e) => updateCoBorrower("addressPresMonths", e.target.value)}
            placeholder="0"
            type="number"
            label="& Mos"
            className="w-full"
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-1">
        {!sameAsPresent && (
          <div className="flex w-full gap-1">
            <Input
              value={co.permanentAddress}
              onChange={(e) => updateCoBorrower("permanentAddress", e.target.value)}
              placeholder="123 Main St, Quezon City"
              label="Permanent Address"
            />
            <div className="grid max-w-22 grid-cols-2 gap-1">
              <Input
                value={co.addressPermYears}
                onChange={(e) => updateCoBorrower("addressPermYears", e.target.value)}
                placeholder="0"
                type="number"
                className="w-full"
                label="for Yrs"
              />
              <Input
                value={co.addressPermMonths}
                onChange={(e) => updateCoBorrower("addressPermMonths", e.target.value)}
                placeholder="0"
                type="number"
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
        value={co.houseOwnership}
        onChange={(val) => updateCoBorrower("houseOwnership", val as HouseOwnership)}
        options={HOUSE_OWNERSHIP_OPTIONS.map((opt) => ({ value: opt, label: opt }))}
      />
      {co.houseOwnership === "rented" && (
        <>
          <InputAmount
            currency="PHP"
            value={co.houseRentMonthly}
            onChange={(e) => updateCoBorrower("houseRentMonthly", e)}
            label="Monthly Rent"
          />
          <Input
            value={co.houseOwnedBy}
            onChange={(e) => updateCoBorrower("houseOwnedBy", e.target.value)}
            placeholder="Individual / Bank / Company"
            label="Rented From"
          />
        </>
      )}
      {co.houseOwnership === "owned (Mortgaged)" && (
        <>
          <InputAmount
            currency="PHP"
            value={co.houseMortgageMonthly}
            onChange={(e) => updateCoBorrower("houseMortgageMonthly", e)}
            label="Monthly Mortgage"
          />
          <Input
            value={co.houseOwnedBy}
            onChange={(e) => updateCoBorrower("houseOwnedBy", e.target.value)}
            placeholder="Individual / Bank / Company"
            label="Mortgaged From"
          />
        </>
      )}
      {co.houseOwnership === "used Free" && (
        <Input
          value={co.houseOwnedBy}
          onChange={(e) => updateCoBorrower("houseOwnedBy", e.target.value)}
          placeholder="Individual / Bank / Company"
          label="Owned By"
        />
      )}
    </>
  )
}
