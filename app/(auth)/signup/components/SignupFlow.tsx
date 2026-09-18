"use client"

import { useState } from "react"
import AuthStepTransition from "@/app/components/auth/AuthStepTransition"
import SignupCredentials from "./SignupCredentials"
import SignupDetails from "./SignupDetails"
import SignupProgress from "./SignupProgress"

export default function SignupFlow() {
  const [step, setStep] = useState<1 | 2>(1)

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    if (step === 1) {
      setStep(2)
    }
  }

  return (
    <>
      <SignupProgress step={step} />
      <form
        onSubmit={handleSubmit}
        className="mt-22.5 flex w-full flex-1 flex-col"
      >
        <AuthStepTransition
          stepKey={step}
          className="grid w-full grid-cols-1 gap-x-4.5 gap-y-3.25 md:grid-cols-2"
        >
          {step === 1 ? (
            <SignupCredentials />
          ) : (
            <SignupDetails onBack={() => setStep(1)} />
          )}
        </AuthStepTransition>
      </form>
    </>
  )
}
