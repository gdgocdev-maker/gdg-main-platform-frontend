"use client"

import { type FormEvent, useState } from "react"
import AuthErrorMessage from "@/app/components/auth/AuthErrorMessage"
import PasswordInput from "@/app/components/auth/PasswordInput"
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  validateConfirmPassword,
  validatePassword
} from "@/app/lib/validation/password"

type ResetPasswordFormProps = {
  submitLabel?: string
}

function normalizeText(value: string) {
  return value.trim()
}

export default function ResetPasswordForm({
  submitLabel = "Reset Password"
}: ResetPasswordFormProps) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (passwordError) {
      setPasswordError("")
    }
  }

  const handlePasswordBlur = () => {
    if (!normalizeText(password)) {
      setPasswordError("")
      return
    }
    setPasswordError(
      validatePassword(password, {
        emptyMessage: "Please enter your new password."
      })
    )
  }

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    if (confirmPasswordError) {
      setConfirmPasswordError("")
    }
  }

  const handleConfirmPasswordBlur = () => {
    if (!confirmPassword) {
      setConfirmPasswordError("")
      return
    }
    setConfirmPasswordError(
      validateConfirmPassword(confirmPassword, password, {
        emptyMessage: "Please confirm your new password."
      })
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const nextPasswordError = validatePassword(password, {
      emptyMessage: "Please enter your new password."
    })
    const nextConfirmPasswordError = validateConfirmPassword(
      confirmPassword,
      password,
      { emptyMessage: "Please confirm your new password." }
    )

    setPasswordError(nextPasswordError)
    setConfirmPasswordError(nextConfirmPasswordError)

    if (nextPasswordError || nextConfirmPasswordError) {
      return
    }

    setIsSubmitting(true)

    // No password reset/activation API is documented/available yet;
    // simulate the request the same way the other auth flows do.
    window.setTimeout(() => {
      setIsSubmitting(false)
    }, 800)
  }

  return (
    <form
      className="mt-9 w-full"
      onSubmit={handleSubmit}
      noValidate
    >
      <label
        htmlFor="new-password"
        className="relative mb-6 block text-sm font-medium"
      >
        New Password <span className="text-red">*</span>
        <PasswordInput
          id="new-password"
          name="new-password"
          value={password}
          onChange={(event) => handlePasswordChange(event.target.value)}
          onBlur={handlePasswordBlur}
          placeholder="Enter new password"
          autoComplete="new-password"
          minLength={PASSWORD_MIN_LENGTH}
          maxLength={PASSWORD_MAX_LENGTH}
          aria-invalid={Boolean(passwordError)}
          aria-describedby={passwordError ? "new-password-error" : undefined}
          className="mt-1.5 h-8.5 rounded-md border border-black/15 px-2.75 text-base font-normal outline-none placeholder:text-black/40"
        />
        <AuthErrorMessage
          id="new-password-error"
          message={passwordError}
          className="absolute left-0 top-full mt-1"
        />
      </label>

      <label
        htmlFor="confirm-password"
        className="relative mt-3 block text-sm font-medium"
      >
        Confirm Password <span className="text-red">*</span>
        <PasswordInput
          id="confirm-password"
          name="confirm-password"
          value={confirmPassword}
          onChange={(event) => handleConfirmPasswordChange(event.target.value)}
          onBlur={handleConfirmPasswordBlur}
          placeholder="Confirm new password"
          autoComplete="new-password"
          minLength={PASSWORD_MIN_LENGTH}
          maxLength={PASSWORD_MAX_LENGTH}
          aria-invalid={Boolean(confirmPasswordError)}
          aria-describedby={
            confirmPasswordError ? "confirm-password-error" : undefined
          }
          className="mt-1.5 h-8.5 rounded-md border border-black/15 px-2.75 text-base font-normal outline-none placeholder:text-black/40"
        />
        <AuthErrorMessage
          id="confirm-password-error"
          message={confirmPasswordError}
          className="absolute left-0 top-full mt-1"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-9.5 h-8.75 w-full rounded-[5px] bg-blue text-sm font-medium text-white transition-colors duration-200 hover:bg-blue/90 active:bg-blue/80 disabled:cursor-not-allowed disabled:bg-blue/70"
      >
        {isSubmitting ? "Please wait..." : submitLabel}
      </button>
    </form>
  )
}
