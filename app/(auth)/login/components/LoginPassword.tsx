import Link from "next/link"
import AuthErrorMessage from "@/app/components/auth/AuthErrorMessage"
import PasswordInput from "@/app/components/auth/PasswordInput"

type LoginPasswordProps = {
  value: string
  error: string
  onChange: (value: string) => void
  onBlur: () => void
  onBack: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isSubmitting: boolean
}

export default function LoginPassword({
  value,
  error,
  onChange,
  onBlur,
  onBack,
  onSubmit,
  isSubmitting
}: LoginPasswordProps) {
  return (
    <>
      <form
        className="mt-15 w-full"
        onSubmit={onSubmit}
        noValidate
      >
        <label
          htmlFor="login-password"
          className="block text-[12px] font-bold"
        >
          Password <span className="text-red">*</span>
          <div className="relative">
            <PasswordInput
              id="login-password"
              name="password"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              onBlur={onBlur}
              placeholder="Enter your password"
              autoComplete="current-password"
              minLength={8}
              maxLength={128}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "login-password-error" : undefined}
              className="mt-1.5 h-9 rounded-md border border-black/15 px-2.75 text-[12px] outline-none placeholder:text-black/40"
            />

            <AuthErrorMessage
              id="login-password-error"
              message={error}
              className="absolute left-0 top-full mt-1"
            />
          </div>
        </label>

        <div className="mt-2 flex justify-end">
          <Link
            href="/forgot-password"
            className="text-[10px] font-bold text-blue hover:text-blue/90 active:text-blue/80"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-5.5 h-8.75 w-full cursor-pointer rounded-[5px] bg-blue text-[12px] font-bold text-white transition-colors duration-200 hover:bg-blue/90 active:bg-blue/80 disabled:cursor-not-allowed disabled:bg-blue/70"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <button
        type="button"
        onClick={onBack}
        className="mt-23.5 mb-10 h-8.75 w-26.5 self-start rounded-[5px] bg-blue/65 text-[12px] font-bold text-white transition-colors duration-200 hover:bg-blue/75 active:bg-blue/85"
      >
        Back
      </button>
    </>
  )
}
