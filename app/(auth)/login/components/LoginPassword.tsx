import Link from "next/link"
import PasswordInput from "@/app/components/auth/PasswordInput"

type LoginPasswordProps = {
  onBack: () => void
}

export default function LoginPassword({ onBack }: LoginPasswordProps) {
 

  return (
    <>
      <form
        className="mt-15 w-full"
      >
        <label
          htmlFor="login-password"
          className="block text-[12px] font-bold"
        >
          Password <span className="text-red">*</span>
          <PasswordInput
            id="login-password"
            name="password"
            placeholder="Enter your password"
            className="mt-1.5 h-9 rounded-md border border-black/15 px-2.75 text-[12px] outline-none placeholder:text-black/40"
          />
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
          className="mt-5.5 h-8.75 w-full cursor-pointer rounded-[5px] bg-blue text-[12px] font-bold text-white transition-colors duration-200 hover:bg-blue/90 active:bg-blue/80"
        >
          Sign in
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
