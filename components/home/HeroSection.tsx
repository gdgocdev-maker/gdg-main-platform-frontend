"use client";

import Navbar from "@/components/home/Navbar";
import { motion } from "framer-motion";

export default function HeroSection() {
  const text = "Connect. Learn. Build. Grow.";

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center"
    >
      <Navbar />

      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="/videos/heroVedio.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 z-10 bg-black/50"></div>

      <div className="relative z-30 flex w-full flex-col items-center gap-[6rem] px-4">
        <motion.h1
          className="max-w-[1200px] text-center text-4xl font-bold leading-tight text-white lg:text-5xl"
        >
          {text.split("").map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: index * 0.08,
                duration: 0.05,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className="flex flex-wrap gap-[10px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            className="relative flex h-[38px] w-[180px] items-center justify-start rounded-[40px] bg-[#1E1E1E] pl-5 text-base font-medium leading-none text-white lg:h-[50px] lg:w-[230px] lg:pl-[32px] lg:text-xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Events

            <span className="absolute end-0.5 top-1/2 flex h-[34px] w-[34px] -translate-y-1/2 items-center justify-center rounded-full bg-white lg:end-1 lg:h-[44px] lg:w-[44px]">
              <svg
                className="h-5 w-5 lg:h-7 lg:w-7"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.button>

          <motion.button
            className="relative flex h-[38px] w-[120px] items-center justify-start rounded-[40px] bg-white pl-5 text-base font-medium leading-none text-black lg:h-[50px] lg:w-[160px] lg:pl-[32px] lg:text-xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Join Us

            <span className="absolute end-0.5 top-1/2 flex h-[34px] w-[34px] -translate-y-1/2 items-center justify-center rounded-full bg-black lg:end-1 lg:h-[44px] lg:w-[44px]">
              <svg
                className="h-5 w-5 lg:h-7 lg:w-7"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}