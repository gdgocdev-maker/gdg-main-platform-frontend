"use client"

import { Eye, EyeOff } from "lucide-react"
import { type InputHTMLAttributes, useState } from "react"

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement>

export default function PasswordInput({
  className = "",
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <span className="relative block">
      <input
        {...props}
        type={isVisible ? "text" : "password"}
        className={`${className} block w-full pr-9`}
      />
      <button
        type="button"
        aria-label={isVisible ? "Hide password" : "Show password"}
        onClick={() => setIsVisible((visible) => !visible)}
        className="absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-black/50"
      >
        {isVisible ? (
          <EyeOff
            size={14}
            aria-hidden="true"
          />
        ) : (
          <Eye
            size={14}
            aria-hidden="true"
          />
        )}
      </button>
    </span>
  )
}
