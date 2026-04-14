export const formatPhone = (value: string) => {
  if (!value) return ""
  const digits = value.replace(/\D/g, "")
  const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 10)].filter(Boolean)
  return parts.join(" ")
}
