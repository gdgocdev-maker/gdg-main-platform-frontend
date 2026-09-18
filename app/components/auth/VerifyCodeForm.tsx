"use client"

import {
  type ClipboardEvent,
  useRef,
  useState
} from "react"

const CODE_LENGTH = 6

export default function VerifyCodeForm() {
  const [code, setCode] = useState<string[]>(() =>
    Array.from({ length: CODE_LENGTH }, () => "")
  )
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  function updateCode(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1)
    const nextCode = [...code]
    nextCode[index] = digit
    setCode(nextCode)

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
    inputRefs.current[Math.min(pastedCode.length, CODE_LENGTH) - 1]?.focus()
  }

  function handleKeyDown(index: number, key: string) {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <form
      className="mt-19 w-full"
    >
      <input
        type="hidden"
        name="email"
        readOnly
      />

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

      <button
        type="submit"
        className="mt-10.25 h-8.75 w-full rounded-[5px] bg-blue text-[12px] font-bold text-white transition-colors duration-200 hover:bg-blue/90 active:bg-blue/80"
      >
        Verify Code
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