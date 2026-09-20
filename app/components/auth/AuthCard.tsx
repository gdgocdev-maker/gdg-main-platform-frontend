"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { ReactNode } from "react"

type AuthCardProps = {
  size: "sm" | "md" | "lg"
  title: string
  description: string
  children: ReactNode
}

const sizeClasses = {
  sm: "md:w-109.5 md:h-120!",
  md: "md:w-109.5 md:h-130!",
  lg: "md:w-full md:max-w-135 md:h-150!"
} as const

export default function AuthCard({
  size,
  title,
  description,
  children
}: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`relative flex h-auto w-full flex-col items-center bg-white px-8.75 pt-10.25 md:rounded-[20px] md:shadow-[0_0_15px_rgba(0,0,0,0.15)] ${sizeClasses[size]} `}
    >
      <Image
        src="/colorful-logo.svg"
        alt=""
        width={82}
        height={82}
        priority
      />

      <h1 className="mt-3 text-center text-4xl font-bold leading-tight md:text-5xl">
        {title}
      </h1>
      <p className="mt-1 text-center text-sm text-black/45">
        {description}
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex w-full flex-1 flex-col"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
