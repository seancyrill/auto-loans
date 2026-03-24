import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

/////////////////////////////// change later
interface FormData {
  firstName: string
}

export async function fillPdf(templateBytes: Buffer, data: FormData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(templateBytes)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  firstPage.drawText(data.firstName, {
    x: 50,
    y: firstPage.getHeight() - 60,
    size: 12,
    font,
    color: rgb(0, 0, 0),
  })

  return pdfDoc.save()
}
