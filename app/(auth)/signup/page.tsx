import type { Metadata } from "next"
import Link from "next/link"
import AuthVisualPanel from "@/app/components/auth/AuthVisualPanel"
import AuthFormPanel from "@/app/components/auth/AuthFormPanel"
import AuthCard from "@/app/components/auth/AuthCard"
import SignupFlow from "./components/SignupFlow"

export const metadata: Metadata = {
  title: "Create your account"
}

export default function SignUp() {
  return (
    <main className="flex min-h-screen min-w-0 flex-col bg-white text-primary-font lg:h-screen lg:min-h-0 lg:flex-row">
      <AuthFormPanel>
        <AuthCard
          size="lg"
          title="Create your account"
          description="Join the GDG UJ community"
        >
          <SignupFlow />

          <p className="mt-6 pb-8 text-center text-[11px] text-black/55 md:absolute md:inset-x-0 md:bottom-5 md:mt-0 md:pb-0">
            already have an account?
            <Link
              href="/login"
              className="ms-1 font-bold text-blue hover:text-blue/90 active:text-blue/80"
            >
              Sign in
            </Link>
          </p>
        </AuthCard>
      </AuthFormPanel>

      <AuthVisualPanel
        side="right"
        animateOnMount
      />
    </main>
  )
}
