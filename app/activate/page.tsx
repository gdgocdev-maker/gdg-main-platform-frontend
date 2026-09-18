import type { Metadata } from "next"
import AuthVisualPanel from "@/app/components/auth/AuthVisualPanel"
import AuthCard from "@/app/components/auth/AuthCard"
import ResetPasswordForm from "@/app/reset-password/ResetPasswordForm"

export const metadata: Metadata = {
  title: "Activate Account"
}

export default function Activate() {
  return (
    <main className="flex min-h-screen min-w-0 flex-col bg-white text-primary-font lg:h-screen lg:flex-row">
      <AuthVisualPanel side="left" />

      <section className="flex flex-1 items-center justify-center bg-white lg:h-full">
        <AuthCard
          size="sm"
          title="Create your password"
          description="Set your password to activate your account"
          className="min-h-116.25"
        >
          <ResetPasswordForm submitLabel="Create password" />
        </AuthCard>
      </section>
    </main>
  )
}
