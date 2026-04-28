import { ApplicationFormType } from "@/app/context/form-context-types"
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { getEmailHTML } from "../email-template"
import { lenderEmailFinder } from "../lender-emai-finder"

export async function POST(req: NextRequest) {
  const GMAIL_USER = process.env.GMAIL_USER
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return NextResponse.json({ success: false, message: "Cannot read env" }, { status: 500 })
  }

  const { applicationData } = await req.json()

  const { firstName, lastName, mobile, lender } = applicationData as ApplicationFormType

  if (!lender) {
    return NextResponse.json({ message: "Missing Lender Data" }, { status: 400 })
  }

  if (!firstName || !lastName || !mobile) {
    return NextResponse.json({ success: false, message: "Missing basic requiremnets" }, { status: 400 })
  }

  // setup mailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  })

  const lenderEmail = lenderEmailFinder(lender)

  if (!lenderEmail) {
    return NextResponse.json({ success: false, message: "Couldnt find lender email" }, { status: 500 })
  }

  // send docs to processor
  await transporter.sendMail({
    from: GMAIL_USER,
    to: lenderEmail,
    subject: "Auto Loans Quick Submission",
    html: getEmailHTML(`${firstName} ${lastName}`, `0${mobile}`),
  })

  return NextResponse.json({ success: true })
}
