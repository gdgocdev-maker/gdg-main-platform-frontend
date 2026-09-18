"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import AuthStepTransition from "@/app/components/auth/AuthStepTransition"
import {
  validateEmail,
  validateEmailConfirmation
} from "@/app/lib/validation/email"
import {
  validateConfirmPassword,
  validatePassword
} from "@/app/lib/validation/password"
import { validateRequiredText } from "@/app/lib/validation/text"
import SignupCredentials from "./SignupCredentials"
import SignupDetails from "./SignupDetails"
import SignupProgress from "./SignupProgress"

type FieldName =
  | "fullName"
  | "email"
  | "password"
  | "confirmEmail"
  | "confirmPassword"
  | "phone"
  | "countryCode"
  | "university"
  | "universityId"
  | "college"
  | "major"

type FormValues = Record<FieldName, string>
type FieldErrors = Partial<Record<FieldName, string>>

const FIELD_ERROR_TIMEOUT = 3000

const defaultValues: FormValues = {
  fullName: "",
  email: "",
  password: "",
  confirmEmail: "",
  confirmPassword: "",
  phone: "",
  countryCode: "+966",
  university: "",
  universityId: "",
  college: "",
  major: ""
}

function normalizeText(value: string) {
  return value.trim()
}

function validateName(value: string) {
  const requiredTextError = validateRequiredText(value, "Full name")
  if (requiredTextError) {
    return requiredTextError
  }

  const trimmed = normalizeText(value)

  if (!/^[\p{L}\p{M}\s.'-]+$/u.test(trimmed)) {
    return "Name can only include letters, spaces, and common punctuation."
  }

  return ""
}

function validatePhone(value: string) {
  const trimmed = normalizeText(value)

  if (!trimmed) {
    return ""
  }

  if (!/^[\d\s().+-]+$/.test(trimmed)) {
    return "Please enter a valid phone number."
  }

  if (trimmed.length < 8 || trimmed.length > 15) {
    return "Phone number must be 8 to 15 characters long."
  }

  return ""
}

function validateSelect(value: string, fieldLabel: string) {
  if (!normalizeText(value)) {
    return `Please select your ${fieldLabel.toLowerCase()}.`
  }

  return ""
}

function validateCredentials(values: FormValues) {
  const nextErrors: FieldErrors = {}

  const fullNameError = validateName(values.fullName)
  if (fullNameError) nextErrors.fullName = fullNameError

  const emailError = validateEmail(values.email)
  if (emailError) nextErrors.email = emailError

  const passwordError = validatePassword(values.password)
  if (passwordError) nextErrors.password = passwordError

  const confirmEmailError = validateEmailConfirmation(
    values.confirmEmail,
    values.email
  )
  if (confirmEmailError) nextErrors.confirmEmail = confirmEmailError

  const confirmPasswordError = validateConfirmPassword(
    values.confirmPassword,
    values.password
  )
  if (confirmPasswordError) nextErrors.confirmPassword = confirmPasswordError

  const phoneError = validatePhone(values.phone)
  if (phoneError) nextErrors.phone = phoneError

  return nextErrors
}

function validateAcademicDetails(values: FormValues) {
  const nextErrors: FieldErrors = {}

  const universityError = validateRequiredText(values.university, "University")
  if (universityError) nextErrors.university = universityError

  const universityIdError = validateRequiredText(
    values.universityId,
    "University ID"
  )
  if (universityIdError) nextErrors.universityId = universityIdError

  const collegeError = validateSelect(values.college, "college")
  if (collegeError) nextErrors.college = collegeError

  const majorError = validateSelect(values.major, "major")
  if (majorError) nextErrors.major = majorError

  return nextErrors
}

export default function SignupFlow() {
  const [step, setStep] = useState<1 | 2>(1)
  const [formValues, setFormValues] = useState<FormValues>(defaultValues)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fieldTimersRef = useRef<Record<string, number>>({})
  const formTimerRef = useRef<number | null>(null)
  const suppressNextBlurRef = useRef(false)

  useEffect(() => {
    const timers = fieldTimersRef.current

    return () => {
      Object.values(timers).forEach((timer) => clearTimeout(timer))
      if (formTimerRef.current) {
        clearTimeout(formTimerRef.current)
      }
    }
  }, [])

  const clearFieldTimer = (field: string) => {
    const timer = fieldTimersRef.current[field]
    if (timer) {
      clearTimeout(timer)
      delete fieldTimersRef.current[field]
    }
  }

  const clearFieldError = (field: string) => {
    clearFieldTimer(field)
    setFieldErrors((current) => {
      if (!current[field as keyof typeof current]) {
        return current
      }

      const next = { ...current }
      delete next[field as keyof typeof next]
      return next
    })
  }

  const showFieldError = (
    field: string,
    message: string,
    keepExisting = true
  ) => {
    clearFieldTimer(field)
    setFieldErrors((current) => {
      const next = keepExisting ? { ...current } : {}
      next[field as keyof typeof next] = message
      return next
    })

    fieldTimersRef.current[field] = window.setTimeout(() => {
      setFieldErrors((current) => {
        if (!current[field as keyof typeof current]) {
          return current
        }

        const next = { ...current }
        delete next[field as keyof typeof next]
        return next
      })
    }, FIELD_ERROR_TIMEOUT)
  }

  const clearFormError = () => {
    if (formTimerRef.current) {
      clearTimeout(formTimerRef.current)
      formTimerRef.current = null
    }
    setFormError("")
  }

  const showFormError = () => {
    clearFormError()
    setFormError("Please complete all required fields.")
    formTimerRef.current = window.setTimeout(() => {
      setFormError("")
    }, FIELD_ERROR_TIMEOUT)
  }

  const clearAllFieldErrors = () => {
    Object.keys(fieldTimersRef.current).forEach((field) =>
      clearFieldTimer(field)
    )
    setFieldErrors({})
  }

  const updateFieldValue = (field: string, value: string) => {
    const normalizedField = field as FieldName
    const nextValue = ["password", "confirmPassword"].includes(normalizedField)
      ? value
      : value.trim()

    setFormValues((current) => ({ ...current, [normalizedField]: nextValue }))

    if (fieldErrors[normalizedField]) {
      clearFieldError(normalizedField)
    }

    if (formError) {
      clearFormError()
    }
  }

  const validateField = (field: string) => {
    const normalizedField = field as FieldName
    const value = formValues[normalizedField]

    switch (normalizedField) {
      case "fullName":
        return validateName(value)
      case "email":
        return validateEmail(value)
      case "password":
        return validatePassword(value)
      case "confirmEmail":
        return validateEmailConfirmation(value, formValues.email)
      case "confirmPassword":
        return validateConfirmPassword(value, formValues.password)
      case "phone":
        return validatePhone(value)
      case "university":
        return validateRequiredText(value, "University")
      case "universityId":
        return validateRequiredText(value, "University ID")
      case "college":
        return validateSelect(value, "college")
      case "major":
        return validateSelect(value, "major")
      default:
        return ""
    }
  }

  const handleFieldBlur = (field: string) => {
    // A mousedown on the submit button blurs the focused field just before
    // handleSubmit runs; skip this blur so it can't show a field error that
    // the submit's own decision (general vs. field) is about to override.
    if (suppressNextBlurRef.current) {
      suppressNextBlurRef.current = false
      return
    }

    const normalizedField = field as FieldName

    if (!normalizeText(formValues[normalizedField])) {
      clearFieldError(normalizedField)
      return
    }

    const message = validateField(normalizedField)
    if (message) {
      showFieldError(normalizedField, message, true)
      return
    }

    clearFieldError(normalizedField)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    suppressNextBlurRef.current = false

    const nextErrors =
      step === 1
        ? validateCredentials(formValues)
        : validateAcademicDetails(formValues)
    const keys = Object.keys(nextErrors) as Array<keyof typeof nextErrors>

    if (keys.length === 0) {
      clearAllFieldErrors()
      clearFormError()

      if (step === 1) {
        setStep(2)
        return
      }

      setIsSubmitting(true)
      window.setTimeout(() => setIsSubmitting(false), 800)
      return
    }

    if (keys.length === 1) {
      const field = keys[0]
      showFieldError(field, nextErrors[field] ?? "", false)
      clearFormError()
      return
    }

    clearAllFieldErrors()
    showFormError()
  }

  const handleBack = () => {
    clearFormError()
    clearAllFieldErrors()
    setStep(1)
  }

  return (
    <>
      <SignupProgress step={step} />
      <form
        onSubmit={handleSubmit}
        onPointerDownCapture={(event) => {
          const target = event.target as HTMLElement
          suppressNextBlurRef.current = Boolean(
            target.closest('button[type="submit"]')
          )
        }}
        noValidate
        className="mt-22.5 flex w-full flex-1 flex-col"
      >
        <AuthStepTransition
          stepKey={step}
          className="grid w-full grid-cols-1 gap-x-4.5 gap-y-5.5 md:grid-cols-2"
        >
          {step === 1 ? (
            <SignupCredentials
              values={formValues}
              errors={fieldErrors}
              onChange={updateFieldValue}
              onBlur={handleFieldBlur}
              formError={formError}
            />
          ) : (
            <SignupDetails
              values={formValues}
              errors={fieldErrors}
              onChange={updateFieldValue}
              onBlur={handleFieldBlur}
              onBack={handleBack}
              formError={formError}
              isSubmitting={isSubmitting}
            />
          )}
        </AuthStepTransition>
      </form>
    </>
  )
}
