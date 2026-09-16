import type { ReactNode } from "react"

type AuthCardProps = {
  children: ReactNode
  className?: string
}

export default function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div
      className={`relative flex h-auto w-full flex-col items-center bg-white px-8.75 pt-10.25 min-[760px]:w-109.5 min-[760px]:rounded-[20px] min-[760px]:shadow-[0_0_15px_rgba(0,0,0,0.15)] ${className}`}
    >
      {children}
    </div>
  )
}
