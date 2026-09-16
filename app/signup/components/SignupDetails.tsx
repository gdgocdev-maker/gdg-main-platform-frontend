import Image from "next/image"

type SignupDetailsProps = {
  onBack: () => void
}

function SelectField({
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
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px]">
          ⌄
        </span>
      </span>
    </label>
  )
}

export default function SignupDetails({ onBack }: SignupDetailsProps) {
  return (
    <div className="w-full">
      <div className="absolute my-2 left-8.75 right-8.75 top-43.5 flex items-start justify-center gap-2.75 text-center text-[7px] font-bold min-[760px]:left-17 min-[760px]:right-17">
        <div className="flex flex-1 flex-col items-center gap-2">
          <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-blue text-[11px] font-normal text-white">
            1
          </span>
          <span>Personal information</span>
        </div>
        <span className="mt-3 h-px flex-1 bg-blue" />
        <div className="flex flex-1 flex-col items-center gap-2">
          <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-blue text-[11px] font-normal text-white">
            2
          </span>
          <span>Academic information</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <Image
          src="/colorful-logo.svg"
          alt=""
          width={82}
          height={82}
          priority
        />
        <h2 className="mt-3 text-center text-[25px] font-bold leading-[1.1] tracking-[-1px] sm:text-[32px]">
          Create your account
        </h2>
        <p className="mt-1 text-center text-[16px] text-black/45">
          Join the GDG UJ community
        </p>
      </div>

      <form className="mt-17.5 grid w-full grid-cols-1 gap-x-4.5 gap-y-3.25 min-[760px]:grid-cols-2">
        <label
          htmlFor="university"
          className="block text-[12px] font-bold"
        >
          University <span className="text-red">*</span>
          <input
            id="university"
            name="university"
            placeholder="Enter your university"
            className="mt-1.5 h-9 w-full rounded-md border border-black/15 px-2.75 text-[12px] font-normal outline-none placeholder:text-black/40"
          />
        </label>
        <label
          htmlFor="university-id"
          className="block text-[12px] font-bold"
        >
          University ID <span className="text-red">*</span>
          <input
            id="university-id"
            name="university-id"
            placeholder="Enter your university ID"
            className="mt-1.5 h-9 w-full rounded-md border border-black/15 px-2.75 text-[12px] font-normal outline-none placeholder:text-black/40"
          />
        </label>
        <SelectField
          id="college"
          label="College"
          placeholder="Select your college"
        />
        <SelectField
          id="major"
          label="Major"
          placeholder="Select your major"
        />

        <button
          type="button"
          onClick={onBack}
          className="mt-15 h-8.75 w-full rounded-[5px] border border-blue text-[12px] font-bold text-blue transition-colors duration-200 hover:bg-blue/10 active:bg-blue/20"
        >
          Back
        </button>
        <button
          type="button"
          className="mt-15 h-8.75 w-full rounded-[5px] bg-blue text-[12px] font-bold text-white transition-colors duration-200 hover:bg-blue/90 active:bg-blue/80"
        >
          Create account
        </button>
      </form>
    </div>
  )
}
