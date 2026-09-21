"use client";

import Navbar from "@/components/home/Navbar";
import { motion } from "framer-motion";

export default function HeroSection() {
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

      <div className="relative z-30 flex w-full flex-col items-center gap-[80px] px-4">
        <motion.h1
          className="max-w-[1200px] text-center text-4xl font-bold leading-tight text-white lg:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Connect. Learn. Build. Grow.
        </motion.h1>

        <motion.div
          className="flex flex-wrap gap-[10px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <motion.button
            className="relative flex h-[48px] w-[190px] items-center justify-start rounded-[40px] bg-[#1E1E1E] pl-5 text-base font-medium leading-none text-white lg:h-[60px] lg:w-[240px] lg:pl-[32px] lg:text-xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Events

            <span className="absolute right-2 top-1/2 flex h-[36px] w-[36px] -translate-y-1/2 items-center justify-center rounded-full bg-white lg:right-4 lg:h-[44px] lg:w-[44px]">
              <svg
                className="h-6 w-6 lg:h-8 lg:w-8"
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
            className="relative flex h-[48px] w-[130px] items-center justify-start rounded-[40px] bg-white pl-5 text-base font-medium leading-none text-black lg:h-[60px] lg:w-[170px] lg:pl-[32px] lg:text-xl "
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Join Us

            <span className="absolute right-2 top-1/2 flex h-[36px] w-[36px] -translate-y-1/2 items-center justify-center rounded-full bg-black lg:right-4 lg:h-[44px] lg:w-[44px]">
              <svg
                className="h-6 w-6 lg:h-8 lg:w-8"
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