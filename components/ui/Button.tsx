"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const variantClasses = {
  // Sized to the Figma "Edit profile" button spec (271x69px, 32px text at desktop) —
  // this variant is only used for that button, so its sizing lives here directly.
  outline:
    "border-2 border-brand-red bg-white text-foreground hover:bg-brand-red/5 gap-2 px-4 py-2 text-sm font-normal sm:px-5 sm:text-base md:text-lg",
  solid:
    "bg-navy text-white hover:bg-navy/90 px-6 py-3 text-sm font-medium sm:text-base md:text-lg",
  pill: "bg-white text-navy hover:bg-white/90 px-6 py-3 text-sm font-medium sm:text-base md:text-lg",
} as const;

type ButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  variant?: keyof typeof variantClasses;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function Button({
  children,
  icon,
  variant = "outline",
  href,
  onClick,
  className = "",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center whitespace-nowrap rounded-2xl transition-colors ${variantClasses[variant]} ${className}`;

  const content = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
    >
      {icon}
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block shrink-0">
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block shrink-0">
      {content}
    </button>
  );
}
