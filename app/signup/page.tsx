import type { Metadata } from "next"
import AuthVisualPanel from "@/components/auth/AuthVisualPanel"
import SignupFlow from "./components/SignupFlow"

export const metadata: Metadata = {
  title: "Create your account"
}

export default function SignUp() {
  return (
    <main className="flex h-auto min-h-screen min-w-0 flex-col overflow-hidden bg-white text-primary-font lg:h-screen lg:min-w-270 lg:flex-row">
      <section className="flex h-auto flex-1 items-center justify-center bg-white lg:h-full">
        <div className="relative flex h-150 w-full flex-col items-center bg-white px-8.75 pt-10.25 min-[760px]:w-130 min-[760px]:rounded-[20px] min-[760px]:shadow-[0_0_15px_rgba(0,0,0,0.15)] ">
          <SignupFlow />
        </div>
      </section>

      <AuthVisualPanel side="right" />
    </main>
  )
}
