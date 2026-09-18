"use client"

import { useState } from "react"
import AuthCard from "@/app/components/auth/AuthCard"
import LoginEmail from "./LoginEmail"
import LoginPassword from "./LoginPassword"

export default function LoginFlow() {
  const [step, setStep] = useState<1 | 2>(1)
  const isEmailStep = step === 1

  return (
    <AuthCard
      size="sm"
      title={isEmailStep ? "Continue with your email" : "Enter your password"}
      description={
        isEmailStep
          ? "Welcome back! Please enter your details."
          : "Enter your password to continue."
      }
    >
      {isEmailStep ? (
        <LoginEmail onContinue={() => setStep(2)} />
      ) : (
        <LoginPassword onBack={() => setStep(1)} />
      )}
    </AuthCard>
  )
}
