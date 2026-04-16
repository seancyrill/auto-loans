import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import Nav from "./components/nav"
import { ApplicationProvider } from "./context/form-context"
import { StatusProvider } from "./context/status-provider"
import "./globals.css"

const myFont = Plus_Jakarta_Sans({
  variable: "--font-primary",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "AutoLoans",
  description: "Generate forms",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${myFont.className} min-h-full antialiased`}>
      <body className="flex min-h-screen flex-col">
        <StatusProvider>
          <ApplicationProvider>
            <Nav />
            {children}
          </ApplicationProvider>
        </StatusProvider>
      </body>
    </html>
  )
}
