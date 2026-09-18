import type { Metadata } from "next"
import Link from "next/link"
import AuthVisualPanel from "@/app/components/auth/AuthVisualPanel"
import AuthCard from "@/app/components/auth/AuthCard"
import ForgotPasswordForm from "./ForgotPasswordForm"

export const metadata: Metadata = {
  title: "Forgot Password"
}

export default function ForgotPassword() {
  return (
    <main className="flex h-auto min-h-screen min-w-0 flex-col bg-white text-primary-font lg:h-screen lg:flex-row">
      <AuthVisualPanel side="left" />

      <section className="flex h-auto flex-1 items-center justify-center bg-white lg:h-full">
        <AuthCard
          size="sm"
          title="Forgot Password?"
          description="Enter your email and we’ll send you a verification code"
        >
          <ForgotPasswordForm />

          <Link
            href="/login"
            className="mt-auto pt-6 pb-8 text-center text-[11px] font-bold text-blue hover:text-blue/90 active:text-blue/80"
          >
            Back to Sign in
          </Link>
        </AuthCard>
      </section>
    </main>
  )
}
