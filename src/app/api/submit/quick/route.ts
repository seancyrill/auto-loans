import { ApplicationFormType } from "@/app/context/form-context"
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { getEmailHTML } from "../email-template"

export async function POST(req: NextRequest) {
  const GMAIL_USER = process.env.GMAIL_USER
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    throw new Error("Submit Route Error: Cannot read env!")
  }

  const { applicationData, lender } = await req.json()

  const { firstName, lastName, mobile } = applicationData as ApplicationFormType

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

  // send docs to processor
  await transporter.sendMail({
    from: GMAIL_USER,
    to: lenderEmail,
    subject: "Auto Loans Quick Submission",
    html: getEmailHTML(`${firstName} ${lastName}`, `0${mobile}`),
  })

  return NextResponse.json({ success: true })
}

function lenderEmailFinder(lender: string) {
  switch (lender) {
    case "gdfi":
      return "seancyrill@gmail.com"

    default:
      return "seancyrill@gmail.com"
  }
}
