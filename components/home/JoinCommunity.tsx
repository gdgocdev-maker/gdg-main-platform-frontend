"use client";
import { motion } from "framer-motion";

export default function JoinCommunity() {
  return (
    <section className="px-6 py-16 mt-5 lg:px-10 lg:py-20">
      <div className="relative mx-auto flex min-h-[310px] max-w-[1100px] items-center overflow-visible rounded-2xl bg-gradient-to-r from-[#3562AC] via-[#D96A3D] to-[#95A35B] px-8 py-10 lg:px-12">
        
        <div className="max-w-[650px]">
          <h3 className="text-2xl font-semibold leading-snug text-white">
            Ready to Be Part of the Community?
          </h3>

          <h4 className="mt-5 max-w-[600px] text-lg font-normal leading-normal text-white">
            Join our community, discover new opportunities, and build something
            meaningful with us
          </h4>

<motion.button
  type="button"
  className="relative mt-8 flex h-[50px] w-[240px] items-center justify-center cursor-pointer overflow-hidden rounded-full border border-white/50 bg-white/15 text-base font-bold text-white shadow-[inset_0_2px_8px_rgba(255,255,255,0.8),inset_0_-4px_10px_rgba(255,255,255,0.15),0_4px_15px_rgba(255,255,255,0.3)] backdrop-blur-md lg:h-[56px] lg:w-[250px] lg:text-xl"
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
>
  <span className="relative z-10">
    Join Our Community!
  </span>

  <span className="absolute inset-x-4 top-1 h-[12px] rounded-full bg-white/30 blur-md" />
</motion.button>
        </div>

        <div className="absolute -end-4 -top-30 hidden w-[280px] lg:block">
          <img
            src="/images/phone-image.png"
            alt="GDG on Campus mobile application"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}