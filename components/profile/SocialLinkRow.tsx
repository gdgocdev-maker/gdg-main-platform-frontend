"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";
import { GithubMark, LinkedInGlyph } from "@/components/layout/BrandMarks";
import type { SocialLink } from "@/lib/constants/profile";

const iconBadgeByPlatform = {
  github: { icon: GithubMark, className: "bg-black text-white" },
  linkedin: { icon: LinkedInGlyph, className: "bg-navy text-white p-2" },
  website: { icon: Globe, className: "bg-white text-[#6FCF97] ring-1 ring-gray-350" },
} as const;

const placeholderByPlatform = {
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-username",
  website: "https://your-site.com",
} as const;

type SocialLinkRowProps = {
  link: SocialLink;
  isEditing: boolean;
  value: string;
  error: string | null;
  onChange: (value: string) => void;
};

export function SocialLinkRow({
  link,
  isEditing,
  value,
  error,
  onChange,
}: SocialLinkRowProps) {
  const { icon: Icon, className: badgeClassName } = iconBadgeByPlatform[link.platform];

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0 },
      }}
      className={`flex items-center gap-4 rounded-card border bg-white px-5 py-4 sm:px-6 ${
        error ? "border-brand-red" : "border-gray-350"
      }`}
    >
      <span
        className={`flex size-9 shrink-0 items-center justify-center rounded-lg sm:size-10 ${badgeClassName}`}
      >
        <Icon className="size-5" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-semibold text-foreground sm:text-base">
          {link.label}
        </span>
        {isEditing ? (
          <>
            <input
              type="url"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder={placeholderByPlatform[link.platform]}
              aria-invalid={Boolean(error)}
              className="w-full min-w-0 border-0 border-b border-dashed border-gray-350 bg-transparent py-0.5 text-sm text-foreground outline-none placeholder:text-gray-300 focus:border-accent-blue sm:text-base"
            />
            {error && <span className="mt-1 text-xs text-brand-red">{error}</span>}
          </>
        ) : link.value ? (
          <a
            href={link.value}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-sm text-accent-blue hover:underline sm:text-base"
          >
            {link.value}
          </a>
        ) : (
          <span className="text-sm italic text-gray-300 sm:text-base">
            Not added yet
          </span>
        )}
      </div>

      {!isEditing && link.value && (
        <ExternalLink className="size-4 shrink-0 text-gray-500 sm:size-5" />
      )}
    </motion.li>
  );
}
