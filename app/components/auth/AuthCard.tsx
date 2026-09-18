import Image from "next/image"
import type { ReactNode } from "react"

type AuthCardProps = {
  size: "sm" | "md" | "lg"
  title: string
  description: string
  children: ReactNode
  className?: string
}

const sizeClasses = {
  sm: "md:w-109.5",
  md: "md:w-full md:max-w-135",
  lg: "md:w-full md:max-w-150"
} as const

export default function AuthCard({
  size,
  title,
  description,
  children,
  className = ""
}: AuthCardProps) {
  return (
    <div
      className={`relative flex h-auto w-full flex-col items-center bg-white px-8.75 pt-10.25 md:rounded-[20px] md:shadow-[0_0_15px_rgba(0,0,0,0.15)] ${sizeClasses[size]} ${className}`}
    >
      <Image
        src="/colorful-logo.svg"
        alt=""
        width={82}
        height={82}
        priority
      />

      <h1 className="mt-3 text-center text-[25px] font-bold leading-[1.1] tracking-[-1px] md:text-[32px]">
        {title}
      </h1>
      <p className="mt-1 text-center text-[13px] text-black/45">
        {description}
      </p>

      {children}
    </div>
  )
}
