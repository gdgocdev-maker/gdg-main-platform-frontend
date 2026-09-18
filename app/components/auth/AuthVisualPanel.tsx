"use client"

import { motion, type Variants } from "framer-motion"
import Image from "next/image"

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

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" }
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
  const barPosition = isLeft ? "left-0" : "right-0"
  const shouldAnimate = animateOnMount
  const barVariants = getBarVariants(side)

  return (
    <motion.section
      layoutId="auth-visual-panel"
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`
        relative z-20 hidden h-auto w-full flex-col overflow-hidden bg-light-blue px-8.5 pt-8.75 shadow-[0_0_15px_rgba(0,0,0,0.15)] lg:flex lg:h-full lg:w-[48%]
        ${isLeft ? "rounded-tr-[30px]" : "rounded-tl-[30px]"}`}
    >
      <motion.div
        variants={contentGroupVariants}
        initial={shouldAnimate ? "hidden" : false}
        animate="visible"
      >
        <motion.div variants={fadeUpVariants}>
          <Image
            src="/black-logo-with-colors.svg"
            alt="Google Developer Group on Campus, University of Jeddah"
            width={350}
            height={30}
            priority
          />
        </motion.div>

        <div className="mt-26">
          <motion.p
            variants={fadeUpVariants}
            className="font-mono text-[15px] font-bold tracking-[2px] text-blue"
          >
            GDG ON CAMPUS · UJ
          </motion.p>
          <motion.h1
            variants={fadeUpVariants}
            className="mt-2.25 text-[50px] font-bold leading-[1.08] tracking-[-1.2px]"
          >
            Learn together.
            <span className="block text-blue">Build what’s next.</span>
          </motion.h1>
          <motion.p
            variants={fadeUpVariants}
            className="mt-4.25 max-w-95 text-[14px] leading-[1.45]"
          >
            Connect with the community, manage your membership,
            <br />
            and take part in GDG UJ activities
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        variants={barsGroupVariants}
        initial={shouldAnimate ? "hidden" : false}
        animate="visible"
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
