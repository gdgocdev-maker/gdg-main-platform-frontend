import type { Metadata } from "next"
import Link from "next/link"
import AuthVisualPanel from "@/app/components/auth/AuthVisualPanel"
import AuthCard from "@/app/components/auth/AuthCard"
import SignupFlow from "./components/SignupFlow"

export const metadata: Metadata = {
  title: "Create your account"
}

export default function SignUp() {
  return (
    <main className="flex h-auto min-h-screen min-w-0 flex-col bg-white text-primary-font lg:h-screen lg:flex-row">
      <section className="flex h-auto flex-1 items-center justify-center bg-white lg:h-full">
        <AuthCard
          size="md"
          title="Create your account"
          description="Join the GDG UJ community"
          className="!h-[37.5rem]"
        >
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
        </AuthCard>
      </section>

      <AuthVisualPanel side="right" />
    </main>
  )
}
