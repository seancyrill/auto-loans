import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { contactTemplate } from "./contact-template"

export async function POST(req: NextRequest) {
  const GMAIL_USER = process.env.GMAIL_USER
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD
  const DEFAULT_EMAIL = process.env.DEFAULT_EMAIL

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !DEFAULT_EMAIL) {
    throw new Error("Submit Route Error: Cannot read env!")
  }

  const { data } = await req.json()

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ success: false, message: "Missing Message data" }, { status: 400 })
  }

  // setup mailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  })

  // send docs to processor
  await transporter.sendMail({
    from: GMAIL_USER,
    to: DEFAULT_EMAIL,
    subject: "Auto Loans User Message",
    html: contactTemplate(data),
  })

  return NextResponse.json({ success: true })
}
