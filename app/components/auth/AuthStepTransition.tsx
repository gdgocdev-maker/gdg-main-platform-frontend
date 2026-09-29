"use client"

import { AnimatePresence, motion } from "framer-motion"
import type { ReactNode } from "react"
import { useTextDirection } from "@/i18n/useTextDirection"

type AuthStepTransitionProps = {
  stepKey: string | number
  children: ReactNode
  className?: string
}

export default function AuthStepTransition({
  stepKey,
  children,
  className
}: AuthStepTransitionProps) {
  // x is physical, so flip it in RTL to keep the slide moving in reading direction.
  const offset = useTextDirection() === "rtl" ? -6 : 6

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, x: offset }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -offset }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
