import sharp from "sharp"

interface ImageInput {
  name: string
  image: string // data:image/jpeg;base64,...
}

interface MailAttachment {
  filename: string
  content: Buffer
  contentType: string
}

export async function parseImageAttachments(images: ImageInput[]): Promise<MailAttachment[]> {
  return Promise.all(
    images.map(async ({ name, image }) => {
      const parts = image.split(",")
      const base64Data = parts.length > 1 ? parts[1] : parts[0]

      const compressed = await sharp(Buffer.from(base64Data, "base64"))
        .resize({ width: 1080, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer()

      return {
        filename: `${name.replace(/\s+/g, "_")}.jpg`, // Clean filename
        content: compressed,
        contentType: "image/jpeg",
      }
    }),
  )
}
