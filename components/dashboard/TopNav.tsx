"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

// Same links as the homepage navbar, so they reuse its common.nav translations.
const navKeys = ["home", "about", "projects", "events", "community"] as const;

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
  const t = useTranslations("common");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-gdg-dark text-white">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* The logo image already includes the group name, so no separate text is needed. */}
        <Image
          src="/logo.png"
          alt={t("logoAlt")}
          width={3612}
          height={347}
          priority
          className="h-6 w-auto min-w-0 max-w-full object-contain object-left sm:h-7 lg:h-8 rtl:object-right"
        />

        <div className="flex shrink-0 items-center gap-3 lg:gap-6">
          <nav aria-label={t("topNav.navLabel")} className="hidden items-center gap-6 text-sm font-semibold lg:flex">
            {navKeys.map((key) => (
              <a key={key} href="#" className="text-white/80 transition-colors hover:text-white">
                {t(`nav.${key}`)}
              </a>
            ))}
          </nav>

          <LanguageSwitcher />

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="dashboard-mobile-nav"
            aria-label={t("topNav.toggleMenu")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/90 hover:bg-white/10 lg:hidden"
          >
            <IconMenu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.nav
            id="dashboard-mobile-nav"
            aria-label={t("topNav.navLabel")}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3 text-sm font-semibold sm:px-6">
              {navKeys.map((key) => (
                <a key={key} href="#" className="rounded-lg px-2 py-2 text-white/80 hover:bg-white/10 hover:text-white">
                  {t(`nav.${key}`)}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
