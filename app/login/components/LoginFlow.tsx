"use client"

import { useState } from "react"
import LoginEmail from "./LoginEmail"
import LoginPassword from "./LoginPassword"

export default function LoginFlow() {
  const [step, setStep] = useState<1 | 2>(1)

  return (
    <>
      {step === 1 ? (
        <LoginEmail
          onContinue={() => setStep(2)}
        />
      ) : (
        <LoginPassword onBack={() => setStep(1)} />
      )}
    </>
  )
}
