/**
 * Formats a number or numeric string with commas.
 * Handles potential undefined/null values safely.
 */
export const formatNumberWithCommas = (value: number | string | null | undefined, locale: string = "en-US"): string => {
  // 1. Handle empty or nullish values early
  if (value === null || value === undefined || value === "") {
    return "0"
  }

  // 2. Convert to number (handles both numeric strings and numbers)
  const numericValue = typeof value === "string" ? parseFloat(value) : value

  // 3. Final safety check: if the string was "abc", parseFloat returns NaN
  if (isNaN(numericValue)) {
    return "0"
  }

  return new Intl.NumberFormat(locale).format(numericValue)
}
