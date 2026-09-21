"use client";

import { offers } from "@/data/home";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";

export default function WhatWeOffer() {
  const [activeStep, setActiveStep] = useState(1);
  const mobileSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mobileSectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const step = Math.min(
      Math.floor(progress * offers.length) + 1,
      offers.length
    );

    setActiveStep((previousStep) =>
      previousStep === step ? previousStep : step
    );
  });

  return (
    <section id="offers" className="bg-white px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      {/* Section Title */}
      <h2 className="text-3xl font-bold leading-snug">
        What We Offer
      </h2>

      {/* ===================================================== */}
      {/* DESKTOP / LAPTOP */}
      {/* ===================================================== */}

      <div className="mt-10 hidden h-[130px] gap-6 lg:flex">
        {offers.map((offer) => {
          const isActive = activeStep === offer.number;

          return (
            <div
              key={offer.number}
              onMouseEnter={() => setActiveStep(offer.number)}
              className={`flex h-full min-w-0 cursor-pointer flex-col transition-[flex] duration-500 ease-out ${
                isActive ? "flex-[2]" : "flex-1"
              }`}
            >
              {/* Top Line */}
              <motion.div
                animate={{
                  width: isActive ? "100%" : "80px",
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                }}
                className="h-[2px]"
                style={{
                  backgroundColor: isActive
                    ? offer.color
                    : "#9CA3AF",
                }}
              />

              {/* Number + Content */}
              <div className="mt-1 flex h-[120px] items-center gap-6">
                {/* Number */}
                <h1
                  className="shrink-0 text-7xl font-normal xl:text-8xl"
                  style={{
                    color: offer.color,
                  }}
                >
                  {offer.number}
                </h1>

                {/* Active Content */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={offer.number}
                      initial={{
                        opacity: 0,
                        x: 15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -15,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                      className="min-w-0"
                    >
                      <h3 className="text-2xl font-semibold leading-snug">
                        {offer.title}
                      </h3>

                      <p className="mt-1 text-base font-normal leading-normal">
                        {offer.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===================================================== */}
      {/* MOBILE */}
      {/* ===================================================== */}

      <div
        ref={mobileSectionRef}
        className="mt-10 lg:hidden"
      >
        {offers.map((offer, index) => {
          const isActive = activeStep === offer.number;

          return (
            <div
              key={offer.number}
              className="relative min-h-[230px]"
            >
              <div
                className="sticky"
                style={{
                  top: `${80 + index * 42}px`,
                  zIndex: index + 1,
                }}
              >
                {/* Top Line */}
                <motion.div
                  animate={{
                    width: isActive ? "100%" : "80px",
                  }}
                  transition={{
                    duration: 0.35,
                    ease: "easeOut",
                  }}
                  className="h-[2px]"
                  style={{
                    backgroundColor: isActive
                      ? offer.color
                      : "#9CA3AF",
                  }}
                />

                {/* Number + Content */}
                <div className="flex min-h-[150px] items-start gap-5 py-5">
                  {/* Number */}
                  <h1
                    className="shrink-0 text-7xl font-normal"
                    style={{
                      color: offer.color,
                    }}
                  >
                    {offer.number}
                  </h1>

                  {/* Content */}
                  <div className="min-w-0 pt-2">
                    <h3 className="text-2xl font-semibold leading-snug">
                      {offer.title}
                    </h3>

                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.p
                          key={offer.number}
                          initial={{
                            opacity: 0,
                            y: 15,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -15,
                          }}
                          transition={{
                            duration: 0.35,
                            ease: "easeOut",
                          }}
                          className="mt-1 max-w-[280px] text-base font-normal leading-normal"
                        >
                          {offer.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}