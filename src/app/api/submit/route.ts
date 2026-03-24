import fs from "fs"
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import path from "path"
import { fillPdf } from "./fill-pdf"

export async function POST(req: NextRequest) {
  const GMAIL_USER = process.env.GMAIL_USER
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    throw new Error("Submit Route Error: Cannot read env!")
  }

  const { applicationData, lender } = await req.json()

  // Load the PDF template sitting next to this route.ts
  const pdfPath = path.join(process.cwd(), "src/templates/gdfi-application.pdf")
  const templateBytes = fs.readFileSync(pdfPath)
  const filledPdfBytes = await fillPdf(templateBytes, applicationData)

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
    subject: "New Form Submission",
    text: `New submission from ${applicationData.firstName}`,
    attachments: [
      {
        filename: "filled-form.pdf",
        content: Buffer.from(filledPdfBytes),
      },
    ],
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
