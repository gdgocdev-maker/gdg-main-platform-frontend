"use client"

import Link from "next/link"
import { useState } from "react"
import SignupCredentials from "./SignupCredentials"
import SignupDetails from "./SignupDetails"

export default function SignupFlow() {
  const [step, setStep] = useState(1)

  return (
    <div className="flex w-full flex-1 flex-col items-center">
      {step === 1 ? (
        <SignupCredentials onContinue={() => setStep(2)} />
      ) : (
        <SignupDetails onBack={() => setStep(1)} />
      )}

      <p className="mt-auto pb-8 text-[11px] text-black/55">
        already have an account?
        <Link
          href="/login"
          className="ms-1 font-bold text-blue hover:text-blue/90 active:text-blue/80"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
