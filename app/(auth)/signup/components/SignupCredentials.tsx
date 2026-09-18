import AuthErrorMessage from "@/app/components/auth/AuthErrorMessage"
import PasswordInput from "@/app/components/auth/PasswordInput"

const countryCodeOptions = [{ country: "Saudi Arabia", code: "+966" }]

type SignupCredentialsProps = {
  values: Record<string, string>
  errors: Record<string, string>
  onChange: (field: string, value: string) => void
  onBlur: (field: string) => void
  formError: string
}

export default function SignupCredentials({
  values,
  errors,
  onChange,
  onBlur,
  formError
}: SignupCredentialsProps) {
  const fullNameError = errors.fullName ?? ""
  const emailError = errors.email ?? ""
  const passwordError = errors.password ?? ""
  const confirmEmailError = errors.confirmEmail ?? ""
  const confirmPasswordError = errors.confirmPassword ?? ""
  const phoneError = errors.phone ?? ""

  return (
    <>
      <label
        htmlFor="full-name"
        className="relative block text-[12px] font-bold"
      >
        Full name <span className="text-red">*</span>
        <input
          id="full-name"
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={(event) => onChange("fullName", event.target.value)}
          onBlur={() => onBlur("fullName")}
          placeholder="Enter your full name"
          autoComplete="name"
          maxLength={255}
          aria-invalid={Boolean(fullNameError)}
          aria-describedby={fullNameError ? "full-name-error" : undefined}
          className={`mt-1.5 h-9 w-full rounded-md border px-2.75 text-[12px] font-normal outline-none placeholder:text-black/40 ${
            fullNameError ? "border-red" : "border-black/15"
          }`}
        />
        <AuthErrorMessage
          id="full-name-error"
          message={fullNameError}
          className="absolute left-0 top-full mt-1"
        />
      </label>
      <label
        htmlFor="email"
        className="relative block text-[12px] font-bold"
      >
        Email address <span className="text-red">*</span>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) => onChange("email", event.target.value)}
          onBlur={() => onBlur("email")}
          placeholder="you@example.com"
          autoComplete="email"
          maxLength={254}
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? "email-error" : undefined}
          className={`mt-1.5 h-9 w-full rounded-md border px-2.75 text-[12px] font-normal outline-none placeholder:text-black/40 ${
            emailError ? "border-red" : "border-black/15"
          }`}
        />
        <AuthErrorMessage
          id="email-error"
          message={emailError}
          className="absolute left-0 top-full mt-1"
        />
      </label>
      <label
        htmlFor="password"
        className="relative block text-[12px] font-bold"
      >
        Password <span className="text-red">*</span>
        <PasswordInput
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={(event) => onChange("password", event.target.value)}
          onBlur={() => onBlur("password")}
          placeholder="Enter your password"
          autoComplete="new-password"
          minLength={8}
          maxLength={128}
          aria-invalid={Boolean(passwordError)}
          aria-describedby={passwordError ? "password-error" : undefined}
          className={`mt-1.5 h-9 w-full rounded-md border px-2.75 text-[12px] font-normal outline-none placeholder:text-black/40 ${
            passwordError ? "border-red" : "border-black/15"
          }`}
        />
        <AuthErrorMessage
          id="password-error"
          message={passwordError}
          className="absolute left-0 top-full mt-1"
        />
      </label>
      <label
        htmlFor="confirm-email"
        className="relative block text-[12px] font-bold"
      >
        Confirm email <span className="text-red">*</span>
        <input
          id="confirm-email"
          name="confirmEmail"
          type="email"
          value={values.confirmEmail}
          onChange={(event) => onChange("confirmEmail", event.target.value)}
          onBlur={() => onBlur("confirmEmail")}
          placeholder="Confirm your email"
          autoComplete="email"
          maxLength={254}
          aria-invalid={Boolean(confirmEmailError)}
          aria-describedby={
            confirmEmailError ? "confirm-email-error" : undefined
          }
          className={`mt-1.5 h-9 w-full rounded-md border px-2.75 text-[12px] font-normal outline-none placeholder:text-black/40 ${
            confirmEmailError ? "border-red" : "border-black/15"
          }`}
        />
        <AuthErrorMessage
          id="confirm-email-error"
          message={confirmEmailError}
          className="absolute left-0 top-full mt-1"
        />
      </label>
      <label
        htmlFor="confirm-password"
        className="relative block text-[12px] font-bold"
      >
        Confirm Password <span className="text-red">*</span>
        <PasswordInput
          id="confirm-password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={(event) => onChange("confirmPassword", event.target.value)}
          onBlur={() => onBlur("confirmPassword")}
          placeholder="Confirm your password"
          autoComplete="new-password"
          minLength={8}
          maxLength={128}
          aria-invalid={Boolean(confirmPasswordError)}
          aria-describedby={
            confirmPasswordError ? "confirm-password-error" : undefined
          }
          className={`mt-1.5 h-9 w-full rounded-md border px-2.75 text-[12px] font-normal outline-none placeholder:text-black/40 ${
            confirmPasswordError ? "border-red" : "border-black/15"
          }`}
        />
        <AuthErrorMessage
          id="confirm-password-error"
          message={confirmPasswordError}
          className="absolute left-0 top-full mt-1"
        />
      </label>
      <label
        htmlFor="phone"
        className="relative block text-[12px] font-bold"
      >
        Phone number
        <span
          className={`mt-1.5 flex h-9 items-center rounded-md border text-[12px] font-normal ${
            phoneError ? "border-red" : "border-black/15"
          }`}
        >
          <span className="relative h-full border-e border-black/15">
            <select
              id="country-code"
              name="countryCode"
              value={values.countryCode}
              onChange={(event) => onChange("countryCode", event.target.value)}
              aria-label="Country code"
              className="h-full appearance-none rounded-s-md bg-white px-2.75 pe-6 text-[12px] font-normal outline-none"
            >
              {countryCodeOptions.map(({ code }) => (
                <option
                  key={code}
                  value={code}
                >
                  {code}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-e-2 top-1/2 -translate-y-1/2 text-[11px]">
              ⌄
            </span>
          </span>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={(event) => onChange("phone", event.target.value)}
            onBlur={() => onBlur("phone")}
            placeholder="Enter your phone number"
            maxLength={15}
            aria-invalid={Boolean(phoneError)}
            aria-describedby={phoneError ? "phone-error" : undefined}
            className="min-w-0 flex-1 px-2.75 outline-none placeholder:text-black/40"
          />
        </span>
        <AuthErrorMessage
          id="phone-error"
          message={phoneError}
          className="absolute left-0 top-full mt-1"
        />
      </label>

      <div className="relative col-span-full h-0">
        <AuthErrorMessage
          message={formError}
          className="absolute inset-x-0 bottom-full mb-1 text-center"
        />
      </div>

      <button
        type="submit"
        className="col-span-full mb-3 h-8.75 w-full rounded-[5px] bg-blue text-[12px] font-bold text-white transition-colors duration-200 hover:bg-blue/90 active:bg-blue/80"
      >
        Continue
      </button>
    </>
  )
}
