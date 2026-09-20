"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { topNavLinks } from "@/components/dashboard/mock-data";

type IconProps = { className?: string };

function IconMenu({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-gdg-dark text-white">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src="/gdg-logo.png"
            alt=""
            width={4000}
            height={2250}
            className="h-8 w-auto shrink-0 object-contain sm:h-9 lg:h-10"
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold">Google Developer Group on Campus</p>
            <p className="truncate text-xs text-white/70">University of Jeddah</p>
          </div>
        </div>

        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-semibold lg:flex">
          {topNavLinks.map((link) => (
            <a key={link} href="#" className="text-white/80 transition-colors hover:text-white">
              {link}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="dashboard-mobile-nav"
          aria-label="Toggle navigation menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/90 hover:bg-white/10 lg:hidden"
        >
          <IconMenu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.nav
            id="dashboard-mobile-nav"
            aria-label="Primary"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3 text-sm font-semibold sm:px-6">
              {topNavLinks.map((link) => (
                <a key={link} href="#" className="rounded-lg px-2 py-2 text-white/80 hover:bg-white/10 hover:text-white">
                  {link}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
