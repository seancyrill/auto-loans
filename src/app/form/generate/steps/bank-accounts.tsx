"use client"
import { useApplication } from "@/app/context/form-context"
import { Input } from "@/app/ui/input"
import { SelectionMenu } from "@/app/ui/selection"
import { StepContainer } from "./components/step-container"

export default function BankAccounts() {
  const { applicationData, updateApplicationData } = useApplication()

  return (
    <StepContainer>
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

      {/* {[0, 1, 2].map((i) => (
        <>
          <Input
            value={applicationData.characterReferences?.[i]?.name ?? ""}
            onChange={(e) => {
              const updated = [...applicationData.characterReferences]
              updated[i] = { ...updated[i], name: e.target.value }
              updateApplicationData("characterReferences", updated)
            }}
            placeholder="Full Name"
            label={`Character Reference ${i + 1} — Name`}
          />
          <Input
            value={applicationData.characterReferences?.[i]?.address ?? ""}
            onChange={(e) => {
              const updated = [...applicationData.characterReferences]
              updated[i] = { ...updated[i], address: e.target.value }
              updateApplicationData("characterReferences", updated)
            }}
            placeholder="Address"
            label={`Character Reference ${i + 1} — Address`}
          />
          <Input
            value={applicationData.characterReferences?.[i]?.contactNumber ?? ""}
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
      ))} */}
    </StepContainer>
  )
}
