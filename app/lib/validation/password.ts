export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 128

type ValidatePasswordOptions = {
  emptyMessage?: string
}

// Shared across Login, Signup, and Reset Password; callers may override the
// empty-field message since the existing forms word it differently.
export function validatePassword(
  value: string,
  { emptyMessage = "Please enter your password." }: ValidatePasswordOptions = {}
) {
  const trimmed = value.trim()

  if (!trimmed) {
    return emptyMessage
  }

  if (trimmed.length < PASSWORD_MIN_LENGTH) {
    return "Password must be at least 8 characters."
  }

  if (trimmed.length > PASSWORD_MAX_LENGTH) {
    return "Password must be 128 characters or fewer."
  }

  return ""
}

type ValidateConfirmPasswordOptions = {
  emptyMessage?: string
}

// Shared across Signup and Reset Password; callers may override the
// empty-field message since the existing forms word it differently.
export function validateConfirmPassword(
  value: string,
  password: string,
  {
    emptyMessage = "Please confirm your password."
  }: ValidateConfirmPasswordOptions = {}
) {
  if (!value) {
    return emptyMessage
  }

  if (value.length < PASSWORD_MIN_LENGTH) {
    return "Password must be at least 8 characters."
  }

  return value === password ? "" : "Passwords do not match."
}
