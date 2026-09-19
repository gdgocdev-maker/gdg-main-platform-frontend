import type { Metadata } from "next"
import AuthVisualPanel from "@/app/components/auth/AuthVisualPanel"
import AuthFormPanel from "@/app/components/auth/AuthFormPanel"
import LoginFlow from "./components/LoginFlow"

export const metadata: Metadata = {
  title: "Login"
}

export default function LogIn() {
  return (
    <main className="flex min-h-screen min-w-0 flex-col bg-white text-primary-font lg:h-screen lg:min-h-0 lg:flex-row">
      <AuthVisualPanel
        side="left"
        animateOnMount={true}
      />

      <AuthFormPanel>
        <LoginFlow />
      </AuthFormPanel>
    </main>
  )
}
