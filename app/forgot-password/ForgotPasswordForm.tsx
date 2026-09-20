"use client"

import { type FormEvent, useState } from "react"
import AuthErrorMessage from "@/app/components/auth/AuthErrorMessage"
import { EMAIL_MAX_LENGTH, validateEmail } from "@/app/lib/validation/email"

function normalizeText(value: string) {
  return value.trim()
}

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (value: string) => {
    setEmail(value.trimStart())
    if (emailError) {
      setEmailError("")
    }
  }

  const handleBlur = () => {
    if (!normalizeText(email)) {
      setEmailError("")
      return
    }
    setEmailError(validateEmail(email))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const nextEmailError = validateEmail(email)
    setEmailError(nextEmailError)

    if (nextEmailError) {
      return
    }

    setEmail(normalizeText(email))
    setIsSubmitting(true)

    // No password-reset request API is documented/available yet;
    // simulate the request the same way the other auth flows do.
    window.setTimeout(() => {
      setIsSubmitting(false)
    }, 800)
  }

  return (
    <form
      className="mt-17.5 w-full"
      onSubmit={handleSubmit}
      noValidate
    >
      <label
        htmlFor="email"
        className="relative block text-sm font-medium"
      >
        Email address <span className="text-red">*</span>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => handleChange(event.target.value)}
          onBlur={handleBlur}
          placeholder="Enter your email"
          autoComplete="email"
          maxLength={EMAIL_MAX_LENGTH}
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? "email-error" : undefined}
          className="mt-1.5 h-9 w-full rounded-md border border-black/15 px-2.75 text-base outline-none placeholder:text-black/40"
        />
        <AuthErrorMessage
          id="email-error"
          message={emailError}
          className="absolute left-0 top-full mt-1"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 h-8.75 w-full rounded-[5px] bg-blue text-sm font-medium text-white transition-colors duration-200 hover:bg-blue/90 active:bg-blue/80 disabled:cursor-not-allowed disabled:bg-blue/70"
      >
        {isSubmitting ? "Sending..." : "Send Code"}
      </button>
    </form>
  )
}
