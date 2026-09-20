"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

const AUTO_HIDE_DELAY = 3000

type AuthErrorMessageProps = {
  message: string
  id?: string
  className?: string
}

// Presentational only: caller controls positioning via `className` and must set `relative` on its container.
export default function AuthErrorMessage({
  message,
  id,
  className = ""
}: AuthErrorMessageProps) {
  const [prevMessage, setPrevMessage] = useState(message)
  const [visible, setVisible] = useState(Boolean(message))

  if (message !== prevMessage) {
    setPrevMessage(message)
    setVisible(Boolean(message))
  }

  useEffect(() => {
    if (!message) {
      return
    }

    const timer = window.setTimeout(() => setVisible(false), AUTO_HIDE_DELAY)

    return () => window.clearTimeout(timer)
  }, [message])

  return (
    <AnimatePresence>
      {message && visible ? (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`pointer-events-none text-xs font-normal text-red ${className}`}
        >
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  )
}
