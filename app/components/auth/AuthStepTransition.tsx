"use client"

import { AnimatePresence, motion } from "framer-motion"
import type { ReactNode } from "react"

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
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
