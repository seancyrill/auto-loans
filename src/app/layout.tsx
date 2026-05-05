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
  title: "Auto Loans",
  description:
    "Generate your documents, or get Loan Consultants to guide you, and get approved — entirely online. Minimize branch visits and back-and-forth calls. Just a smooth, transparent process built around you.",
  openGraph: {
    title: "Auto Loans",
    description:
      "Generate your documents, or get Loan Consultants to guide you, and get approved — entirely online. Minimize branch visits and back-and-forth calls. Just a smooth, transparent process built around you.",
    url: "https://auto-loans.netlify.app",
    siteName: "Auto Loans",
    images: [
      {
        url: "https://auto-loans.netlify.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Auto Loans preview",
      },
    ],
    type: "website",
  },
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
