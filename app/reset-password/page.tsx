import type { Metadata } from "next"
import AuthVisualPanel from "@/app/components/auth/AuthVisualPanel"
import AuthCard from "@/app/components/auth/AuthCard"
import ResetPasswordForm from "./ResetPasswordForm"

export const metadata: Metadata = {
  title: "Reset Password"
}

export default function ResetPassword() {
  return (
    <main className="flex min-h-screen min-w-0 flex-col bg-white text-primary-font lg:h-screen lg:flex-row">
      <AuthVisualPanel side="left" />

      <section className="flex flex-1 items-center justify-center bg-white lg:h-full">
        <AuthCard
          size="sm"
          title="Set New Password"
          description="Create a new password for your account"
          className="min-h-116.25"
        >
          <ResetPasswordForm />
        </AuthCard>
      </section>
    </main>
  )
}
