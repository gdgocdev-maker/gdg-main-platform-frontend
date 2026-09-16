import Image from "next/image"

type SignupCredentialsProps = {
  onContinue: () => void
}

export default function SignupCredentials({
  onContinue
}: SignupCredentialsProps) {
  return (
    <div className="w-full">
      <div className="absolute my-2 left-8.75 right-8.75 top-43.5 flex items-start justify-center gap-2.75 text-center text-[7px] font-bold min-[760px]:left-17 min-[760px]:right-17">
        <div className="flex flex-1 flex-col items-center gap-2">
          <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-blue text-[11px] font-normal text-white">
            1
          </span>
          <span>Personal information</span>
        </div>
        <span className="mt-3 h-px flex-1 bg-black/20" />
        <div className="flex flex-1 flex-col items-center gap-2">
          <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-black/10 text-[11px] font-normal text-white">
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
            <span className="border-r border-black/15 px-2.75">+699</span>
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
          type="button"
          onClick={onContinue}
          className="col-span-full mt-10 mb-3 h-8.75 w-full rounded-[5px] bg-blue text-[12px] font-bold text-white transition-colors duration-200 hover:bg-blue/90 active:bg-blue/80"
        >
          Continue
        </button>
      </form>
    </div>
  )
}
