import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import AuthVisualPanel from "@/components/auth/AuthVisualPanel"
import ForgotPasswordForm from "./ForgotPasswordForm"

export const metadata: Metadata = {
  title: "Forgot Password"
}

export default function ForgotPassword() {
  return (
    <main className="flex h-auto min-h-screen min-w-0 flex-col bg-white text-primary-font lg:h-screen lg:flex-row">
      <AuthVisualPanel side="left" />

      <section className="flex h-auto flex-1 items-center justify-center bg-white lg:h-full">
        <div className="relative flex h-auto min-h-116.25 w-full flex-col items-center bg-white px-8.75 pt-10.25 md:w-109.5 md:rounded-[20px] md:shadow-[0_0_15px_rgba(0,0,0,0.15)]">
          <Image
            src="/colorful-logo.svg"
            alt=""
            width={82}
            height={82}
            priority
          />

          <h2 className="mt-3 text-center text-[25px] font-bold leading-[1.1] tracking-[-1px] md:text-[32px]">
            Forgot Password?
          </h2>
          <p className="mt-1 text-center text-[13px] text-black/45">
            Enter your email and we’ll send you a verification code
          </p>

          <ForgotPasswordForm />

          <Link
            href="/login"
            className="mt-10 pb-8 text-[11px] font-bold text-blue hover:text-blue/90 active:text-blue/80"
          >
            Back to Sign in
          </Link>
        </div>
      </section>
    </main>
  )
}