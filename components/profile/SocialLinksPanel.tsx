"use client";

import { motion } from "framer-motion";
import { SocialLinkRow } from "@/components/profile/SocialLinkRow";
import type { SocialLink } from "@/lib/constants/profile";

type SocialLinksPanelProps = {
  links: SocialLink[];
  isEditing: boolean;
  values: Record<SocialLink["platform"], string>;
  errors: Record<SocialLink["platform"], string | null>;
  onChange: (platform: SocialLink["platform"], value: string) => void;
};

export function SocialLinksPanel({
  links,
  isEditing,
  values,
  errors,
  onChange,
}: SocialLinksPanelProps) {
  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      className="flex flex-col gap-4"
    >
      {links.map((link) => (
        <SocialLinkRow
          key={link.platform}
          link={link}
          isEditing={isEditing}
          value={values[link.platform]}
          error={errors[link.platform]}
          onChange={(value) => onChange(link.platform, value)}
        />
      ))}
    </motion.ul>
  );
}
