import Image from "next/image"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Login"
}

export default function LogIn() {
  return (
    <main className="flex h-screen min-w-270 overflow-hidden bg-white text-primary-font">
      <section className="relative flex h-full w-[48%] flex-col overflow-hidden rounded-tr-[30px] bg-light-blue px-8.5 pt-8.75 shadow-[0_0_15px_rgba(0,0,0,0.15)]">
        <Image
          src="/black-logo-with-colors.svg"
          alt="Google Developer Group on Campus, University of Jeddah"
          width={350}
          height={30}
          priority
        />

        <div className="mt-26">
          <p className="font-mono text-[15px] font-bold tracking-[2px] text-blue">
            GDG ON CAMPUS · UJ
          </p>
          <h1 className="mt-2.25 text-[50px] font-bold leading-[1.08] tracking-[-1.2px]">
            Learn together.
            <span className="block text-blue">Build what’s next.</span>
          </h1>
          <p className="mt-4.25 max-w-95 text-[14px] leading-[1.45]">
            Connect with the community, manage your membership,
            <br />
            and take part in GDG UJ activities
          </p>
        </div>

        <div className="absolute bottom-18 left-0 h-6 w-[40%] bg-green" />
        <div className="absolute bottom-12 left-0 h-6 w-[60%] bg-blue" />
        <div className="absolute bottom-6 left-0 h-6 w-[80%] bg-red" />
        <div className="absolute bottom-0 left-0 h-6 w-full bg-yellow" />
      </section>

      <section className="flex h-full flex-1 items-center justify-center bg-white">
        <div className="flex h-135 w-109.5 flex-col items-center rounded-[20px] bg-white px-8.75 pt-10.25 shadow-[0_0_15px_rgba(0,0,0,0.15)]">
          <Image
            src="/colorful-logo.svg"
            alt=""
            width={82}
            height={82}
            priority
          />

          <h2 className="mt-3 text-[32px] font-bold leading-[1.1] tracking-[-1px]">
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

          <p className="mt-auto pb-8 text-[11px] text-black/55">
            Don’t have an account?
            <Link
              href="#"
              className="font-bold text-blue ml-1  hover:text-blue/90 active:text-blue/80"
            >
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
