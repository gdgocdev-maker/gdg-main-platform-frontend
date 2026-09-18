"use client"

import { useState } from "react"
import AuthCard from "@/app/components/auth/AuthCard"
import AuthStepTransition from "@/app/components/auth/AuthStepTransition"
import { validateEmail } from "@/app/lib/validation/email"
import { validatePassword } from "@/app/lib/validation/password"
import LoginEmail from "./LoginEmail"
import LoginPassword from "./LoginPassword"

function normalizeText(value: string) {
  return value.trim()
}

export default function LoginFlow() {
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEmailStep = step === 1

  const handleEmailChange = (value: string) => {
    const nextValue = value.trimStart()
    setEmail(nextValue)
    if (emailError) {
      setEmailError("")
    }
  }

  const handleEmailBlur = () => {
    if (!normalizeText(email)) {
      setEmailError("")
      return
    }
    setEmailError(validateEmail(email))
  }

  const handleEmailSubmit = () => {
    const nextEmailError = validateEmail(email)
    setEmailError(nextEmailError)

    if (nextEmailError) {
      return
    }

    setEmail(normalizeText(email))
    setStep(2)
  }

  const handlePasswordChange = (value: string) => {
    const nextValue = value.trimStart()
    setPassword(nextValue)
    if (passwordError) {
      setPasswordError("")
    }
  }

  const handlePasswordBlur = () => {
    if (!normalizeText(password)) {
      setPasswordError("")
      return
    }
    setPasswordError(validatePassword(password))
  }

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextPasswordError = validatePassword(password)
    setPasswordError(nextPasswordError)

    if (nextPasswordError) {
      return
    }

    const nextPassword = normalizeText(password)
    setPassword(nextPassword)
    setIsSubmitting(true)

    window.setTimeout(() => {
      setIsSubmitting(false)
    }, 800)
  }

  const handleBack = () => {
    setPasswordError("")
    setStep(1)
  }

  return (
    <AuthCard
      size="md"
      title={isEmailStep ? "Continue with your email" : "Enter your password"}
      description={
        isEmailStep
          ? "Welcome back! Please enter your details."
          : "Enter your password to continue."
      }
    >
      <AuthStepTransition
        stepKey={step}
        className="flex w-full flex-col items-center"
      >
        {isEmailStep ? (
          <LoginEmail
            value={email}
            error={emailError}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            onContinue={handleEmailSubmit}
          />
        ) : (
          <LoginPassword
            value={password}
            error={passwordError}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            onBack={handleBack}
            onSubmit={handlePasswordSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </AuthStepTransition>
    </AuthCard>
  )
}
