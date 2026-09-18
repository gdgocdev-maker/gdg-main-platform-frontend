"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
        <motion.div
          key={pathname}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {children}
        </motion.div>
    </div>
  )
}
