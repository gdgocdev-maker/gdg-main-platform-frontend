export const EMAIL_MAX_LENGTH = 254

// Shared across Login, Signup, and Forgot Password so the rules stay in sync.
// Returns a key from messages/*/validation.json (AuthErrorMessage translates it), or "" when valid.
export function validateEmail(value: string) {
  const trimmed = value.trim()

  if (!trimmed) {
    return "emailRequired"
  }

  if (trimmed.length > EMAIL_MAX_LENGTH) {
    return "emailTooLong"
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "emailInvalid"
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
    return "emailConfirmRequired"
  }

  if (trimmed.length > EMAIL_MAX_LENGTH) {
    return "emailTooLong"
  }

  return trimmed === originalValue.trim() ? "" : "emailMismatch"
}
