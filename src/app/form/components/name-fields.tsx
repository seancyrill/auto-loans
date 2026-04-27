import { useApplication } from "@/app/context/form-context"
import { Input } from "@/app/ui/input"

export default function NameFields() {
  const { applicationData, updateApplicationData } = useApplication()

  return (
    <div className="flex w-full flex-nowrap gap-1">
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
      <span className="w-10">
        <Input
          value={applicationData.nameSuffix}
          onChange={(e) => updateApplicationData("nameSuffix", e.target.value)}
          placeholder="Jr."
          label="Suffix"
        />
      </span>
    </div>
  )
}
