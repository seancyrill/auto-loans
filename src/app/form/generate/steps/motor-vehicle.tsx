"use client"
import { useApplication } from "@/app/context/form-context"
import { Input } from "@/app/ui/input"
import { StepContainer } from "./components/step-container"

export default function MotorVehicle() {
  const { applicationData, updateApplicationData } = useApplication()

  if (!applicationData?.motorVehicle) {
    return null
  }

  return (
    <StepContainer>
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
    </StepContainer>
  )
}
