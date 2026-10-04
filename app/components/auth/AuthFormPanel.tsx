"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import useDesktopMediaQuery from "@/app/lib/useDesktopMediaQuery";

type AuthFormPanelProps = {
  children: ReactNode;
};

export default function AuthFormPanel({ children }: AuthFormPanelProps) {
  const isDesktop = useDesktopMediaQuery();

  return (
    <motion.section
      layoutId={isDesktop ? "auth-form-panel" : undefined}
      transition={
        isDesktop ? { duration: 0.6, ease: "easeInOut" } : undefined
      }
      // On desktop the signup card is sized to fit its content, so the panel
      // hides overflow. Small screens keep scrolling, since the form cannot
      // realistically fit there.
      className="relative z-10 flex h-full min-h-0 flex-1 items-center justify-center overflow-y-auto bg-background lg:overflow-hidden"
    >
      {children}
    </motion.section>
  );
}
