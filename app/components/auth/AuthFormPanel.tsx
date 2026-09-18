"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

type AuthFormPanelProps = {
  children: ReactNode
}

export default function AuthFormPanel({ children }: AuthFormPanelProps) {
  return (
    <motion.section
      layoutId="auth-form-panel"
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative z-10 flex h-auto flex-1 items-center justify-center bg-white lg:h-full"
    >
      {children}
    </motion.section>
  )
}
