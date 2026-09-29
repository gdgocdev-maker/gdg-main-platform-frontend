"use client";

import Navbar from "@/components/home/Navbar";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useTextDirection } from "@/i18n/useTextDirection";
import { getPathname } from "@/i18n/navigation";

export default function HeroSection() {
  const t = useTranslations("home.hero");
  const dir = useTextDirection();
  const locale = useLocale();
  const words = t("tagline").split(" ");

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

      <div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: "var(--hero-overlay)" }}
      />

      <div className="relative z-30 flex w-full flex-col items-center gap-[6rem] px-4">
        <motion.h1
          dir={dir}
          className="flex max-w-[1200px] flex-wrap justify-center gap-x-2 text-center text-4xl font-bold leading-tight text-[var(--white)] lg:text-5xl"
        >
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: index * 0.08,
                duration: 0.05,
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className="flex flex-wrap gap-[10px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
<motion.a
  href="#events"
  className="relative flex h-[38px] w-[180px] items-center justify-start rounded-[40px] bg-gdg-dark ps-5 text-base font-medium leading-none text-[var(--white)] lg:h-[50px] lg:w-[230px] lg:ps-[32px] lg:text-xl"
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
>
  <span dir={dir}>{t("exploreEvents")}</span>

  <span className="absolute end-0.5 top-1/2 flex h-[34px] w-[34px] -translate-y-1/2 items-center justify-center rounded-full bg-[var(--white)] lg:end-1 lg:h-[44px] lg:w-[44px]">
    <svg
      className="h-5 w-5 lg:h-7 lg:w-7 rtl:-scale-x-100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="var(--gdg-dark)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
</motion.a>

          <motion.a
            href={getPathname({ href: "/signup", locale })}
            className="relative flex h-[38px] w-[120px] items-center justify-start rounded-[40px] bg-[var(--white)] ps-5 text-base font-medium leading-none text-[var(--gdg-dark)] lg:h-[50px] lg:w-[160px] lg:ps-[32px] lg:text-xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span dir={dir}>{t("joinUs")}</span>

            <span className="absolute end-0.5 top-1/2 flex h-[34px] w-[34px] -translate-y-1/2 items-center justify-center rounded-full bg-gdg-dark lg:end-1 lg:h-[44px] lg:w-[44px]">
              <svg
                className="h-5 w-5 lg:h-7 lg:w-7 rtl:-scale-x-100"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="var(--white)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}