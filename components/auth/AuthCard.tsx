import type { ReactNode } from "react"

type AuthCardProps = {
  children: ReactNode
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="flex h-135 w-109.5 flex-col items-center rounded-[20px] bg-white px-8.75 pt-10.25 shadow-[0_0_15px_rgba(0,0,0,0.15)]">
      {children}
    </div>
  )
}
