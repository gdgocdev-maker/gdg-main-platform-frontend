const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Saudi mobile numbers: 9 digits after the fixed +966 prefix, starting with 5.
const PHONE_PATTERN = /^5\d{8}$/;
const NUMERIC_PATTERN = /^\d+$/;
const NAME_PATTERN = /^[\p{L}][\p{L}\s.'-]{1,}$/u;

export function validateInfoField(key: string, value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "This field is required";

  switch (key) {
    case "fullName":
      return NAME_PATTERN.test(trimmed)
        ? null
        : "Enter a valid name (letters only)";
    case "email":
      return EMAIL_PATTERN.test(trimmed) ? null : "Enter a valid email address";
    case "phone":
      return PHONE_PATTERN.test(trimmed)
        ? null
        : "Enter a 9-digit Saudi mobile number starting with 5, e.g. 540505484";
    case "studentId":
      return NUMERIC_PATTERN.test(trimmed) ? null : "Student ID must be numeric";
    default:
      return null;
  }
}
