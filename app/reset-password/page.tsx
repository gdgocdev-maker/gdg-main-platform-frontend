import type { Metadata } from "next"
import Image from "next/image"
import AuthVisualPanel from "@/components/auth/AuthVisualPanel"
import ResetPasswordForm from "./ResetPasswordForm"

export const metadata: Metadata = {
  title: "Reset Password"
}

export default function ResetPassword() {
  return (
    <main className="flex min-h-screen min-w-0 flex-col bg-white text-primary-font lg:h-screen lg:flex-row">
      <AuthVisualPanel side="left" />

      <section className="flex flex-1 items-center justify-center bg-white lg:h-full">
        <div className="relative flex min-h-116.25 w-full flex-col items-center bg-white px-8.75 pt-10.25 md:w-109.5 md:rounded-[20px] md:shadow-[0_0_15px_rgba(0,0,0,0.15)]">
          <Image
            src="/colorful-logo.svg"
            alt=""
            width={82}
            height={82}
            priority
          />

          <h1 className="mt-3 text-center text-[25px] font-bold leading-[1.1] tracking-[-1px] md:text-[32px]">
            Set New Password
          </h1>
          <p className="mt-1 text-center text-[13px] text-black/45">
            Create a new password for your account
          </p>

          <ResetPasswordForm />
        </div>
      </section>
    </main>
  )
}
