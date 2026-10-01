export function validatePhone(value: string) {
  const trimmed = value.trim()

  if (!trimmed) {
    return ""
  }

  if (!/^\d+$/.test(trimmed)) {
    return "phoneInvalid"
  }

  if (!/^5\d{8}$/.test(trimmed)) {
    return "phoneFormat"
  }

  return ""
}