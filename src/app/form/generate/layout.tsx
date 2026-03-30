import { StepperProvider } from "@/app/context/stepper-context"

export default function GenerateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <StepperProvider>{children}</StepperProvider>
    </div>
  )
}
