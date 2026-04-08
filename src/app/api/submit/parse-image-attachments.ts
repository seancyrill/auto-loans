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
      const base64Data = image.split(",")[1]

      const compressed = await sharp(Buffer.from(base64Data, "base64"))
        .resize({ width: 1080, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer()

      return {
        filename: `${name}.jpg`,
        content: compressed,
        contentType: "image/jpeg",
      }
    }),
  )
}
