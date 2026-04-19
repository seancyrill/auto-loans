export function lenderEmailFinder(lender: string) {
  switch (lender) {
    case "gdfi":
      return process.env.GDFI_EMAIL

    default:
      return "seancyrill@gmail.com"
  }
}
