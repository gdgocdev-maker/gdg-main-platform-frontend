"use client"

import { type FormEvent, useState } from "react"
import SignupCredentials from "./SignupCredentials"
import SignupDetails from "./SignupDetails"
import SignupProgress from "./SignupProgress"

export default function SignupFlow() {
  const [step, setStep] = useState<1 | 2>(1)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
        className="mt-17.5 flex w-full flex-1 flex-col"
      >
        <div className="grid w-full grid-cols-1 gap-x-4.5 gap-y-3.25 min-[760px]:grid-cols-2">
          {step === 1 ? (
            <SignupCredentials />
          ) : (
            <SignupDetails onBack={() => setStep(1)} />
          )}
        </div>
      </form>
    </>
  )
}
