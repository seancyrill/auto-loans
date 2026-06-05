import { ApplicationFormType } from "@/app/context/form-context-types"
import { GMAIL_USER, transporter } from "@/app/lib/mailer"
import { NextRequest, NextResponse } from "next/server"
import { getEmailHTML } from "../email-template"
import { lenderEmailFinder } from "../lender-emai-finder"

export async function POST(req: NextRequest) {
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD

  if (!GMAIL_APP_PASSWORD) {
    return NextResponse.json({ success: false, message: "Cannot read env" }, { status: 500 })
  }

  const { applicationData } = await req.json()

  const { firstName, lastName, mobile, lender } = applicationData as ApplicationFormType

  if (!lender) {
    return NextResponse.json({ message: "Missing Lender Data" }, { status: 500 })
  }

  if (!firstName || !lastName || !mobile) {
    return NextResponse.json({ success: false, message: "Missing basic requiremnets" }, { status: 400 })
  }

  const lenderEmail = lenderEmailFinder(lender)

  if (!lenderEmail) {
    return NextResponse.json({ success: false, message: "Couldnt find lender email" }, { status: 500 })
  }

  // send docs to processor
  await transporter.sendMail({
    from: `"SDG Financing" <${GMAIL_USER}>`,
    to: lenderEmail,
    subject: "Auto Loans Quick Submission",
    html: getEmailHTML(`${firstName} ${lastName}`, `0${mobile}`, "quick"),
  })

  return NextResponse.json({ success: true })
}
