"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import useDesktopMediaQuery from "@/app/lib/useDesktopMediaQuery"

type AuthFormPanelProps = {
  children: ReactNode
}

export default function AuthFormPanel({ children }: AuthFormPanelProps) {
  const isDesktop = useDesktopMediaQuery()

  return (
    <motion.section
      layoutId={isDesktop ? "auth-form-panel" : undefined}
      transition={isDesktop ? { duration: 0.6, ease: "easeInOut" } : undefined}
      className="relative z-10 flex h-full flex-1 items-center justify-center bg-white"
    >
      {children}
    </motion.section>
  )
}
