export default function SelectField({
  id,
  label,
  placeholder
}: {
  id: string
  label: string
  placeholder: string
}) {
  return (
    <label
      htmlFor={id}
      className="block text-[12px] font-bold"
    >
      {label} <span className="text-red">*</span>
      <span className="relative mt-1.5 block">
        <select
          id={id}
          name={id}
          defaultValue=""
          className="h-9 w-full appearance-none rounded-md border border-black/15 bg-white px-2.75 text-[12px] font-normal text-black/40 outline-none"
        >
          <option
            value=""
            disabled
          >
            {placeholder}
          </option>
        </select>
        <span className="pointer-events-none absolute inset-e-3 top-1/2 -translate-y-1/2 text-[11px]">
          ⌄
        </span>
      </span>
    </label>
  )
}
