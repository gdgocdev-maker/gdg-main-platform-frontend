import AuthErrorMessage from "@/app/components/auth/AuthErrorMessage"

type SelectFieldProps = {
  id: string
  label: string
  placeholder: string
  value: string
  error?: string
  onChange: (value: string) => void
  onBlur: () => void
}

export default function SelectField({
  id,
  label,
  placeholder,
  value,
  error,
  onChange,
  onBlur
}: SelectFieldProps) {
  return (
    <label
      htmlFor={id}
        className="relative block text-sm font-medium"
    >
      {label} <span className="text-red">*</span>
      <span className="relative mt-1.5 block">
        <select
          id={id}
          name={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-9 w-full appearance-none rounded-md border bg-white px-2.75 text-base font-normal outline-none ${
            value ? "text-black" : "text-black/40"
          } ${error ? "border-red" : "border-black/15"}`}
        >
          <option
            value=""
            disabled
          >
            {placeholder}
          </option>
          <option value="Computer Science">Computer Science</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Information Systems">Information Systems</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Data Science">Data Science</option>
        </select>
        <span className="pointer-events-none absolute inset-e-3 top-1/2 -translate-y-1/2 text-xs">
          ⌄
        </span>
      </span>
      <AuthErrorMessage
        id={`${id}-error`}
        message={error ?? ""}
        className="absolute left-0 top-full mt-1"
      />
    </label>
  )
}
