import AuthErrorMessage from "@/app/components/auth/AuthErrorMessage"
import SelectField from "./SelectField"

type SignupDetailsProps = {
  values: Record<string, string>
  errors: Record<string, string>
  onChange: (field: string, value: string) => void
  onBlur: (field: string) => void
  onBack: () => void
  formError: string
  isSubmitting: boolean
}

export default function SignupDetails({
  values,
  errors,
  onChange,
  onBlur,
  onBack,
  formError,
  isSubmitting
}: SignupDetailsProps) {
  return (
    <>
      <label
        htmlFor="university"
        className="relative block text-sm font-medium"
      >
        University <span className="text-red">*</span>
        <input
          id="university"
          name="university"
          type="text"
          value={values.university}
          onChange={(event) => onChange("university", event.target.value)}
          onBlur={() => onBlur("university")}
          placeholder="Enter your university"
          maxLength={255}
          aria-invalid={Boolean(errors.university)}
          aria-describedby={errors.university ? "university-error" : undefined}
          className={`mt-1.5 h-9 w-full rounded-md border px-2.75 text-base font-normal outline-none placeholder:text-black/40 ${
            errors.university ? "border-red" : "border-black/15"
          }`}
        />
        <AuthErrorMessage
          id="university-error"
          message={errors.university ?? ""}
          className="absolute left-0 top-full mt-1"
        />
      </label>
      <label
        htmlFor="university-id"
        className="relative block text-sm font-medium"
      >
        University ID <span className="text-red">*</span>
        <input
          id="university-id"
          name="universityId"
          type="text"
          value={values.universityId}
          onChange={(event) => onChange("universityId", event.target.value)}
          onBlur={() => onBlur("universityId")}
          placeholder="Enter your university ID"
          maxLength={255}
          aria-invalid={Boolean(errors.universityId)}
          aria-describedby={
            errors.universityId ? "university-id-error" : undefined
          }
          className={`mt-1.5 h-9 w-full rounded-md border px-2.75 text-base font-normal outline-none placeholder:text-black/40 ${
            errors.universityId ? "border-red" : "border-black/15"
          }`}
        />
        <AuthErrorMessage
          id="university-id-error"
          message={errors.universityId ?? ""}
          className="absolute left-0 top-full mt-1"
        />
      </label>
      <SelectField
        id="college"
        label="College"
        placeholder="Select your college"
        value={values.college}
        error={errors.college}
        onChange={(value) => onChange("college", value)}
        onBlur={() => onBlur("college")}
      />
      <SelectField
        id="major"
        label="Major"
        placeholder="Select your major"
        value={values.major}
        error={errors.major}
        onChange={(value) => onChange("major", value)}
        onBlur={() => onBlur("major")}
      />

      <div className="relative col-span-full h-0">
        <AuthErrorMessage
          message={formError}
          className="absolute inset-x-0 bottom-full mb-1 text-center"
        />
      </div>

      <div className="col-span-full mt-4 mb-3 flex w-full flex-col gap-3 lg:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="h-8.75 w-full rounded-[5px] border border-blue text-sm font-medium text-blue transition-colors duration-200 hover:bg-blue/10 active:bg-blue/20"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-8.75 w-full rounded-[5px] bg-blue text-sm font-medium text-white transition-colors duration-200 hover:bg-blue/90 active:bg-blue/80 disabled:cursor-not-allowed disabled:bg-blue/70"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </div>
    </>
  )
}
