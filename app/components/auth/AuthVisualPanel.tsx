"use client"

import { motion, type Variants } from "framer-motion"
import Image from "next/image"
import useDesktopMediaQuery from "@/app/lib/useDesktopMediaQuery"

type AuthVisualPanelProps = {
  side: "left" | "right"
  animateOnMount?: boolean
}

const contentGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const barsGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25
    }
  }
}

function getBarVariants(side: "left" | "right"): Variants {
  return {
    hidden: { x: side === "left" ? "-100%" : "100%" },
    visible: {
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }
}

export default function AuthVisualPanel({
  side,
  animateOnMount = false
}: AuthVisualPanelProps) {
  const isLeft = side === "left"
  const isDesktop = useDesktopMediaQuery()
  const barPosition = isLeft ? "left-0" : "right-0"
  const shouldAnimate = animateOnMount && isDesktop
  const barVariants = getBarVariants(side)

  return (
    <motion.section
      layoutId={isDesktop ? "auth-visual-panel" : undefined}
      transition={isDesktop ? { duration: 0.6, ease: "easeInOut" } : undefined}
      className={`
        relative z-20 hidden h-full w-full flex-col overflow-hidden bg-light-blue px-8.5 pt-8.75 shadow-[0_0_15px_rgba(0,0,0,0.15)] lg:flex lg:w-[48%]
        ${isLeft ? "rounded-tr-[30px]" : "rounded-tl-[30px]"}`}
    >
      <motion.div
        variants={contentGroupVariants}
        initial={shouldAnimate ? "hidden" : false}
        animate={isDesktop ? "visible" : false}
      >
        <Image
          src="/black-logo-with-colors.svg"
          alt="Google Developer Group on Campus, University of Jeddah"
          width={350}
          height={30}
          priority
        />

        <div className="mt-26">
          <p className="font-mono text-[15px] font-bold tracking-[2px] text-blue">
            GDG ON CAMPUS · UJ
          </p>
          <h1 className="mt-2.25 text-[50px] font-bold leading-[1.08] tracking-[-1.2px]">
            Learn together.
            <span className="block text-blue">Build what’s next.</span>
          </h1>
          <p className="mt-4.25 max-w-95 text-[14px] leading-[1.45]">
            Connect with the community, manage your membership,
            <br />
            and take part in GDG UJ activities
          </p>
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        variants={barsGroupVariants}
        initial={shouldAnimate ? "hidden" : false}
        animate={isDesktop ? "visible" : false}
      >
        <motion.div
          variants={barVariants}
          className={`absolute bottom-0 h-6 w-full bg-yellow ${barPosition}`}
        />
        <motion.div
          variants={barVariants}
          className={`absolute bottom-6 h-6 w-[80%] bg-red ${barPosition}`}
        />
        <motion.div
          variants={barVariants}
          className={`absolute bottom-12 h-6 w-[60%] bg-blue ${barPosition}`}
        />
        <motion.div
          variants={barVariants}
          className={`absolute bottom-18 h-6 w-[40%] bg-green ${barPosition}`}
        />
      </motion.div>
    </motion.section>
  )
}
