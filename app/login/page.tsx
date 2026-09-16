import Image from "next/image"
import type { Metadata } from "next"
import Link from "next/link"
import AuthCard from "@/components/auth/AuthCard"
import AuthVisualPanel from "@/components/auth/AuthVisualPanel"

export const metadata: Metadata = {
  title: "Login"
}

export default function LogIn() {
  return (
    <main className="flex h-auto min-h-screen min-w-0 flex-col overflow-hidden bg-white text-primary-font lg:h-screen lg:min-w-270 lg:flex-row">
      <AuthVisualPanel side="left" />

      <section className="flex h-auto flex-1 items-center justify-center bg-white lg:h-full">
        <AuthCard>
          <Image
            src="/colorful-logo.svg"
            alt=""
            width={82}
            height={82}
            priority
          />

          <h2 className="mt-3 text-[25px] font-bold leading-[1.1] tracking-[-1px] text-center sm:text-[32px]">
            Continue with your email
          </h2>
          <p className="mt-1 text-[13px] text-black/45">
            Welcome back! Please enter your details.
          </p>

          <form className="mt-17.5 w-full">
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
              type="button"
              className="mt-7 h-8.75 w-full rounded-[5px] bg-blue text-[12px] font-bold text-white cursor-pointer hover:bg-blue/90 active:bg-blue/80 transition-colors duration-200"
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
              className="flex h-8.75 w-full items-center justify-center gap-2 rounded-[5px] border border-black/15 text-[12px] font-bold text-black/65 cursor-pointer hover:bg-blue/10 active:bg-blue/20 transition-colors duration-200"
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
              href="#"
              className="font-bold text-blue ms-1 hover:text-blue/90 active:text-blue/80"
            >
              Create an account
            </Link>
          </p>
        </AuthCard>
      </section>
    </main>
  )
}
