"use client";
import {sponsors} from "@/data/home"
import { motion } from "framer-motion";

const marqueeSponsors = [...sponsors, ...sponsors, ...sponsors ];

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="p-8 lg:p-10">
      <h2 className="text-3xl font-bold leading-snug">
        Our Community Sponsors
      </h2>

      <div className="mt-10 overflow-hidden">
        <div className="sponsors-marquee flex w-max gap-3 sm:gap-4">
          {marqueeSponsors.map((sponsor, index) => (
            <motion.div
              key={`${sponsor.id}-${index}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
                delay: (index % sponsors.length) * 0.05,
              }}
              className="h-[80px] w-[140px] shrink-0 overflow-hidden rounded-xl border border-gray-300 sm:h-[90px] sm:w-[160px] lg:h-[150px] lg:w-[180px]"
            >
              <img
                src={sponsor.image}
                alt={sponsor.name}
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}