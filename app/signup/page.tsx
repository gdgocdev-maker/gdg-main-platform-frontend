import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import AuthVisualPanel from "@/components/auth/AuthVisualPanel"
import SignupFlow from "./components/SignupFlow"

export const metadata: Metadata = {
  title: "Create your account"
}

export default function SignUp() {
  return (
    <main className="flex h-auto min-h-screen min-w-0 flex-col overflow-hidden bg-white text-primary-font lg:h-screen lg:min-w-270 lg:flex-row">
      <section className="flex h-auto flex-1 items-center justify-center bg-white lg:h-full">
        <div className="relative flex h-150 w-full flex-col items-center bg-white px-8.75 pt-10.25 min-[760px]:w-135 min-[760px]:rounded-[20px] min-[760px]:shadow-[0_0_15px_rgba(0,0,0,0.15)] ">
          <div className="flex w-full flex-col items-center gap-1.5">
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

          <SignupFlow />

          <p className="mt-auto pb-8 text-[11px] text-black/55">
            already have an account?
            <Link
              href="/login"
              className="ms-1 font-bold text-blue hover:text-blue/90 active:text-blue/80"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>

      <AuthVisualPanel side="right" />
    </main>
  )
}
