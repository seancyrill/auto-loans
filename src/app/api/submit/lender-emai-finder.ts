export function lenderEmailFinder(lender: string) {
  const GDFI_EMAIL = process.env.GDFI_EMAIL
  const DEFAULT_EMAIL = process.env.DEFAULT_EMAIL

  if (!DEFAULT_EMAIL || !GDFI_EMAIL) {
    return null
  }

  switch (lender) {
    case "gdfi":
      return GDFI_EMAIL

    default:
      return DEFAULT_EMAIL
  }
}
