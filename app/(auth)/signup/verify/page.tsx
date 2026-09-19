import type { Metadata } from "next"
import AuthVisualPanel from "@/app/components/auth/AuthVisualPanel"
import AuthCard from "@/app/components/auth/AuthCard"
import VerifyCodeForm from "@/app/components/auth/VerifyCodeForm"

export const metadata: Metadata = {
  title: "Verify Code"
}

export default function VerifyCode() {
  return (
    <main className="flex min-h-screen min-w-0 flex-col bg-white text-primary-font lg:h-screen lg:min-h-0 lg:flex-row">
      <AuthVisualPanel side="left" animateOnMount={true}/>

      <section className="flex flex-1 items-center justify-center bg-white lg:h-full">
        <AuthCard
          size="sm"
          title="Verify Code"
          description="we sent code to your email"
        >
          <VerifyCodeForm />
        </AuthCard>
      </section>
    </main>
  )
}
