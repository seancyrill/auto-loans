import { MotorVehicle } from "@/app/context/form-context-types"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

export async function generateSanglaPDF(data: MotorVehicle) {
  // atleast have platenumber OR makemodel to proceed
  if (!data.plateNumber && !data.makeModel) {
    return []
  }

  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([400, 400])
  const { height } = page.getSize()

  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  let y = height - 50

  // Title
  page.drawText("Sangla Details", {
    x: 40,
    y,
    size: 18,
    font: boldFont,
    color: rgb(0, 0, 0),
  })

  y -= 40

  // Key-value rows
  for (const [key, value] of Object.entries(data)) {
    // Key
    page.drawText(`${key}:`, {
      x: 40,
      y,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    })

    // Value
    page.drawText(String(value ?? ""), {
      x: 180,
      y,
      size: 12,
      font: regularFont,
      color: rgb(0, 0, 0),
    })

    y -= 24

    // Add a new page if running out of space
    if (y < 50) {
      const newPage = pdfDoc.addPage([400, 400])
      y = newPage.getSize().height - 50
    }
  }

  const pdfBytes = await pdfDoc.save()
  const result = Buffer.from(pdfBytes)

  return [
    {
      filename: `Sangla Details.pdf`, // Clean filename
      content: result,
    },
  ]
}
