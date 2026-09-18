export const EMAIL_MAX_LENGTH = 254

// Shared across Login, Signup, and Forgot Password so the rules stay in sync.
export function validateEmail(value: string) {
  const trimmed = value.trim()

  if (!trimmed) {
    return "Please enter your email address."
  }

  if (trimmed.length > EMAIL_MAX_LENGTH) {
    return "Email must be 254 characters or fewer."
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Please enter a valid email address."
  }

  return ""
}

// Shared confirm-email comparison used by Signup.
export function validateEmailConfirmation(
  confirmValue: string,
  originalValue: string
) {
  const trimmed = confirmValue.trim()

  if (!trimmed) {
    return "Please confirm your email address."
  }

  if (trimmed.length > EMAIL_MAX_LENGTH) {
    return "Email must be 254 characters or fewer."
  }

  return trimmed === originalValue.trim() ? "" : "Email addresses do not match."
}
