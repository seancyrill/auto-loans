"use client"

import { useApplication } from "../context/form-context"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export default function Form() {
  const { applicationData, updateApplicationData } = useApplication()

  const submitForm = () => {
    console.log("submitted")
  }

  return (
    <div className="grid place-content-center">
      <form
        className="bg-foreground m-6 rounded-2xl p-4"
        onSubmit={(e) => {
          e.preventDefault()
          submitForm()
        }}
      >
        <label>First Name</label>
        <Input
          id="firstName"
          value={applicationData.firstName}
          onChange={(e) => updateApplicationData("firstName", e.target.value)}
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}
