import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { fillGdfiApplication } from "../fill-pdf"
import { parseImageAttachments } from "../parse-image-attachments"

export async function POST(req: NextRequest) {
  const GMAIL_USER = process.env.GMAIL_USER
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    throw new Error("Submit Route Error: Cannot read env!")
  }

  const { applicationData, lender, images } = await req.json()

  // Write on pdf
  const filledPdf = await fillGdfiApplication(applicationData)

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
        content: Buffer.from(filledPdf),
        ...parseImageAttachments(images ?? []),
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
