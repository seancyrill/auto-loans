import { ApplicationFormType } from "@/app/context/form-context-types"
import { GMAIL_USER, transporter } from "@/app/lib/mailer"
import { NextRequest, NextResponse } from "next/server"
import { getEmailHTML } from "../email-template"

export async function POST(req: NextRequest) {
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD
  const DEFAULT_EMAIL = process.env.DEFAULT_EMAIL

  if (!GMAIL_APP_PASSWORD || !DEFAULT_EMAIL) {
    return NextResponse.json({ success: false, message: "Cannot read env" }, { status: 500 })
  }

  const { applicationData } = await req.json()

  const { firstName, lastName, mobile } = applicationData as ApplicationFormType

  if (!mobile) {
    return NextResponse.json({ success: false, message: "Missing mobile number" }, { status: 400 })
  }

  // send docs to processor
  await transporter.sendMail({
    from: `"SDG Financing" <${GMAIL_USER}>`,
    to: DEFAULT_EMAIL,
    subject: "Someone is interested",
    html: getEmailHTML(`${firstName} ${lastName}`, `0${mobile}`, "notify"),
  })

  return NextResponse.json({ success: true })
}
