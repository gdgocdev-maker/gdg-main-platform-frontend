"use client"

import { useState } from "react"
import AuthCard from "@/app/components/auth/AuthCard"
import AuthStepTransition from "@/app/components/auth/AuthStepTransition"
import LoginEmail from "./LoginEmail"
import LoginPassword from "./LoginPassword"

export default function LoginFlow() {
  const [step, setStep] = useState<1 | 2>(1)
  const isEmailStep = step === 1

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
          <LoginEmail onContinue={() => setStep(2)} />
        ) : (
          <LoginPassword onBack={() => setStep(1)} />
        )}
      </AuthStepTransition>
    </AuthCard>
  )
}
