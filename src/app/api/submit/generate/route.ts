import { getFullName } from "@/app/utils/full-name"
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { getEmailHTML } from "../email-template"
import { fillGdfiApplication } from "../fill-pdf"
import { parseImageAttachments } from "../parse-image-attachments"

export async function POST(req: NextRequest) {
  const GMAIL_USER = process.env.GMAIL_USER
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    throw new Error("Submit Route Error: Cannot read env!")
  }

  const { applicationData, lender, applicationImages } = await req.json()

  if (!applicationData) {
    return NextResponse.json({ message: "Missing Application Data" }, { status: 400 })
  }

  if (!lender) {
    return NextResponse.json({ message: "Missing Lender Data" }, { status: 400 })
  }

  const { firstName, middleName, lastName, nameSuffix, mobile } = applicationData

  console.log({ firstName, lastName, mobile })
  if (!firstName || !lastName || !mobile) {
    return NextResponse.json({ message: "MIssing Client contact details" }, { status: 400 })
  }

  const fullName = getFullName({ firstName, middleName, lastName, nameSuffix })

  // Write on pdf
  const filledPdf = await fillGdfiApplication(applicationData)

  // process images
  const imageAttachments = await parseImageAttachments(applicationImages ?? [])

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
    from: "SDG Financing",
    to: lenderEmail,
    subject: "New Form Submission",
    html: getEmailHTML(fullName, `0${mobile}`),
    attachments: [
      ...imageAttachments,
      {
        filename: "Application Form.pdf",
        content: Buffer.from(filledPdf),
      },
    ],
  })

  return NextResponse.json({ success: true })
}

function lenderEmailFinder(lender: string) {
  switch (lender) {
    case "gdfi":
      return process.env.GDFI_EMAIL

    default:
      return "seancyrill@gmail.com"
  }
}
