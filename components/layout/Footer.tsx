"use client";

import { motion } from "framer-motion";
import { LinkedInMark, XMark } from "@/components/layout/BrandMarks";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";

const links = ["Home", "About Us", "Events", "Projects", "Community"];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-charcoal px-4 py-12 text-white sm:px-6 md:px-10 md:py-16 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-16 gap-y-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <div className="flex max-w-md flex-col gap-6">
          <Logo />
          <p className="text-base font-light leading-relaxed text-white/90 sm:text-lg">
            Join our community, discover new opportunities, and build
            something meaningful with us.
          </p>
          <Button variant="pill" href="#join">
            Join the Community
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="inline-block self-start border-b-2 border-white pb-1 text-lg font-bold sm:text-xl">
            Links
          </h3>
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-xs text-white/85 transition-colors hover:text-white sm:text-sm"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="inline-block self-start border-b-2 border-white pb-1 text-lg font-bold sm:text-xl">
            Contact Us
          </h3>
          <div className="flex gap-3">
            <IconButton icon={LinkedInMark} variant="navy" label="LinkedIn" />
            <IconButton icon={XMark} variant="black" label="X" />
          </div>
        </div>

        <p className="text-xs font-light text-white/70 sm:col-span-full sm:ml-[37%]">
          © 2026 GDG on Campus — University of Jeddah
        </p>
      </div>
    </motion.footer>
  );
}
