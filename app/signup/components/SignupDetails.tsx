import SelectField from "./SelectField"

type SignupDetailsProps = {
  onBack: () => void
}


export default function SignupDetails({ onBack }: SignupDetailsProps) {
  return (
    <>
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

      <div className="col-span-full mt-10 mb-3 flex w-full flex-col gap-3 lg:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="h-8.75 w-full rounded-[5px] border border-blue text-[12px] font-bold text-blue transition-colors duration-200 hover:bg-blue/10 active:bg-blue/20"
        >
          Back
        </button>
        <button
          type="button"
          className="h-8.75 w-full rounded-[5px] bg-blue text-[12px] font-bold text-white transition-colors duration-200 hover:bg-blue/90 active:bg-blue/80"
        >
          Create account
        </button>
      </div>
    </>
  )
}
