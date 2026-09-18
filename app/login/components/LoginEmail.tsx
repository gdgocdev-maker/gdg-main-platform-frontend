import Image from "next/image"
import Link from "next/link"

type LoginEmailProps = {
  onContinue: () => void
}

export default function LoginEmail({ onContinue }: LoginEmailProps) {
 
  return (
    <>
      <form
        onSubmit={onContinue}
        className="mt-15 w-full"
      >
        <label
          htmlFor="email"
          className="block text-[12px] font-bold"
        >
          Email address <span className="text-red">*</span>
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className="mt-1.5 h-9 w-full rounded-md border border-black/15 px-2.75 text-[12px] outline-none placeholder:text-black/40"
        />

        <button
          type="submit"
          className="mt-7 h-8.75 w-full cursor-pointer rounded-[5px] bg-blue text-[12px] font-bold text-white transition-colors duration-200 hover:bg-blue/90 active:bg-blue/80"
        >
          Continue
        </button>

        <div className="my-7 flex items-center gap-3.25 text-[10px] text-black/35">
          <span className="h-px flex-1 bg-black/15" />
          <span>OR</span>
          <span className="h-px flex-1 bg-black/15" />
        </div>

        <button
          type="button"
          className="flex h-8.75 w-full cursor-pointer items-center justify-center gap-2 rounded-[5px] border border-black/15 text-[12px] font-bold text-black/65 transition-colors duration-200 hover:bg-blue/10 active:bg-blue/20"
        >
          <Image
            src="/google-logo.svg"
            alt="google-logo"
            width={15}
            height={15}
          />
          Sign in with Google
        </button>
      </form>

      <p className="mt-4 pb-8 text-[11px] text-black/55">
        Don’t have an account?
        <Link
          href="/signup"
          className="ms-1 font-bold text-blue hover:text-blue/90 active:text-blue/80"
        >
          Create an account
        </Link>
      </p>
    </>
  )
}
