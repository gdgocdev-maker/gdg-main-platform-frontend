"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";

const variantClasses = {
  navy: "bg-navy",
  black: "bg-black",
} as const;

type IconButtonProps = {
  icon: ComponentType<{ className?: string }>;
  href?: string;
  variant?: keyof typeof variantClasses;
  label: string;
  className?: string;
  iconClassName?: string;
};

export function IconButton({
  icon: Icon,
  href = "#",
  variant = "navy",
  label,
  className = "",
  iconClassName = "w-[17px] h-[17px]",
}: IconButtonProps) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className={`flex w-[38px] h-[34px] shrink-0 items-center justify-center rounded-[8px] text-white ${variantClasses[variant]} ${className}`}
    >
      <Icon className={iconClassName} />
    </motion.a>
  );
}
