import Image from "next/image"
import type { Metadata } from "next"
import AuthVisualPanel from "@/components/auth/AuthVisualPanel"
import LoginFlow from "./components/LoginFlow"

export const metadata: Metadata = {
  title: "Login"
}

export default function LogIn() {
  return (
    <main className="flex h-auto min-h-screen min-w-0 flex-col bg-white text-primary-font lg:h-screen lg:flex-row">
      <AuthVisualPanel side="left" />

      <section className="flex h-auto flex-1 items-center justify-center bg-white lg:h-full">
        <div className="relative flex h-auto w-full flex-col items-center bg-white px-8.75 pt-10.25 md:w-109.5 md:rounded-[20px] md:shadow-[0_0_15px_rgba(0,0,0,0.15)] ">
          <Image
            src="/colorful-logo.svg"
            alt=""
            width={82}
            height={82}
            priority
          />

          <LoginFlow />
        </div>
      </section>
    </main>
  )
}
