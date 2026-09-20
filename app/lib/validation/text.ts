export function validateRequiredText(
  value: string,
  fieldLabel: string,
  maxLength = 255
) {
  const trimmed = value.trim()

  if (!trimmed) {
    return `Please enter your ${fieldLabel.toLowerCase()}.`
  }

  if (trimmed.length > maxLength) {
    return `${fieldLabel} must be ${maxLength} characters or fewer.`
  }

  return ""
}
