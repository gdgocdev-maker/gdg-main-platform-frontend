"use client"

import { type ClipboardEvent, type FormEvent, useRef, useState } from "react"
import AuthErrorMessage from "./AuthErrorMessage"

const CODE_LENGTH = 6

function validateCode(code: string[]) {
  const joined = code.join("")

  if (!joined) {
    return "Please enter the verification code."
  }

  if (!/^\d{6}$/.test(joined)) {
    return "Please enter all 6 digits of the verification code."
  }

  return ""
}

export default function VerifyCodeForm() {
  const [code, setCode] = useState<string[]>(() =>
    Array.from({ length: CODE_LENGTH }, () => "")
  )
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  function updateCode(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1)
    const nextCode = [...code]
    nextCode[index] = digit
    setCode(nextCode)

    if (error) {
      setError("")
    }

    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault()
    const pastedCode = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH)

    if (!pastedCode) return

    const nextCode = Array.from(
      { length: CODE_LENGTH },
      (_, index) => pastedCode[index] ?? ""
    )
    setCode(nextCode)

    if (error) {
      setError("")
    }

    inputRefs.current[Math.min(pastedCode.length, CODE_LENGTH) - 1]?.focus()
  }

  function handleKeyDown(index: number, key: string) {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const message = validateCode(code)
    if (message) {
      setError(message)
      return
    }

    setError("")
    setIsSubmitting(true)

    // No verification API is documented/available yet; simulate the request
    // the same way the other auth flows do until one is wired up.
    window.setTimeout(() => {
      setIsSubmitting(false)
    }, 800)
  }

  return (
    <form
      className="mt-19 w-full"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        type="hidden"
        name="email"
        readOnly
      />

      <div className="relative">
        <div
          className="flex w-full justify-between gap-2.5"
          role="group"
          aria-label="Verification code"
        >
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element
              }}
              aria-label={`Verification code digit ${index + 1}`}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "verify-code-error" : undefined}
              inputMode="numeric"
              maxLength={1}
              name={`code-${index + 1}`}
              pattern="[0-9]"
              type="text"
              value={digit}
              onChange={(event) => updateCode(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event.key)}
              onPaste={handlePaste}
              className="h-12.5 min-w-0 flex-1 rounded-md border border-black/15 text-center text-[18px] outline-none focus:border-blue focus:ring-1 focus:ring-blue/25"
            />
          ))}
        </div>

        <AuthErrorMessage
          id="verify-code-error"
          message={error}
          className="absolute inset-x-0 top-full mt-1.5 text-center"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-10.25 h-8.75 w-full rounded-[5px] bg-blue text-[12px] font-bold text-white transition-colors duration-200 hover:bg-blue/90 active:bg-blue/80 disabled:cursor-not-allowed disabled:bg-blue/70"
      >
        {isSubmitting ? "Verifying..." : "Verify Code"}
      </button>

      <p className="mt-7.5 text-center text-[11px] text-black/45">
        Didn&apos;t get the code?{" "}
        <button
          type="button"
          className="cursor-pointer font-bold text-blue hover:text-blue/90 active:text-blue/80"
        >
          Resend Code
        </button>
      </p>
    </form>
  )
}
