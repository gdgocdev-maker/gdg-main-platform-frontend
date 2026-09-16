const countryCodeOptions = [{ country: "Saudi Arabia", code: "+966" }]

export default function SignupCredentials() {
  return (
    <>
      <label
        htmlFor="full-name"
        className="block text-[12px] font-bold"
      >
        Full name <span className="text-red">*</span>
        <input
          id="full-name"
          name="full-name"
          type="text"
          placeholder="Enter your full name"
          className="mt-1.5 h-9 w-full rounded-md border border-black/15 px-2.75 text-[12px] font-normal outline-none placeholder:text-black/40"
        />
      </label>
      <label
        htmlFor="email"
        className="block text-[12px] font-bold"
      >
        Email address <span className="text-red">*</span>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="mt-1.5 h-9 w-full rounded-md border border-black/15 px-2.75 text-[12px] font-normal outline-none placeholder:text-black/40"
        />
      </label>
      <label
        htmlFor="password"
        className="block text-[12px] font-bold"
      >
        Password <span className="text-red">*</span>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          className="mt-1.5 h-9 w-full rounded-md border border-black/15 px-2.75 text-[12px] font-normal outline-none placeholder:text-black/40"
        />
      </label>
      <label
        htmlFor="confirm-email"
        className="block text-[12px] font-bold"
      >
        Confirm email <span className="text-red">*</span>
        <input
          id="confirm-email"
          name="confirm-email"
          type="email"
          placeholder="Confirm your email"
          className="mt-1.5 h-9 w-full rounded-md border border-black/15 px-2.75 text-[12px] font-normal outline-none placeholder:text-black/40"
        />
      </label>
      <label
        htmlFor="confirm-password"
        className="block text-[12px] font-bold"
      >
        Confirm Password <span className="text-red">*</span>
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          placeholder="Confirm your password"
          className="mt-1.5 h-9 w-full rounded-md border border-black/15 px-2.75 text-[12px] font-normal outline-none placeholder:text-black/40"
        />
      </label>
      <label
        htmlFor="phone"
        className="block text-[12px] font-bold"
      >
        Phone number
        <span className="mt-1.5 flex h-9 items-center rounded-md border border-black/15 text-[12px] font-normal">
          <span className="relative h-full border-r border-black/15">
            <select
              id="country-code"
              name="country-code"
              defaultValue="+966"
              aria-label="Country code"
              className="h-full appearance-none rounded-l-md bg-white px-2.75 pr-6 text-[12px] font-normal outline-none"
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
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[11px]">
              ⌄
            </span>
          </span>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            className="min-w-0 flex-1 px-2.75 outline-none placeholder:text-black/40"
          />
        </span>
      </label>

      <button
        type="submit"
        className="col-span-full mt-10 mb-3 h-8.75 w-full rounded-[5px] bg-blue text-[12px] font-bold text-white transition-colors duration-200 hover:bg-blue/90 active:bg-blue/80"
      >
        Continue
      </button>
    </>
  )
}
