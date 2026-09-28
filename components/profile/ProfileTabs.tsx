"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PersonalAcademicPanel } from "@/components/profile/PersonalAcademicPanel";
import { SocialLinksPanel } from "@/components/profile/SocialLinksPanel";
import { Tabs } from "@/components/ui/Tabs";
import { useTextDirection } from "@/i18n/useTextDirection";
import type { InfoCardData, SocialLink } from "@/lib/constants/profile";

const tabIds = ["personal", "social"] as const;

type ProfileTabsProps = {
  personalInfo: InfoCardData;
  academicInfo: InfoCardData;
  socialLinks: SocialLink[];
  isEditing: boolean;
  infoValues: Record<string, string>;
  infoErrors: Record<string, string | null>;
  onInfoChange: (key: string, value: string) => void;
  socialLinkValues: Record<SocialLink["platform"], string>;
  socialLinkErrors: Record<SocialLink["platform"], string | null>;
  onSocialLinkChange: (platform: SocialLink["platform"], value: string) => void;
};

export function ProfileTabs({
  personalInfo,
  academicInfo,
  socialLinks,
  isEditing,
  infoValues,
  infoErrors,
  onInfoChange,
  socialLinkValues,
  socialLinkErrors,
  onSocialLinkChange,
}: ProfileTabsProps) {
  const t = useTranslations("profile.tabs");
  const tabs = tabIds.map((id) => ({ id, label: t(id) }));
  const [activeId, setActiveId] = useState<string>(tabIds[0]);
  // x is physical, so flip it in RTL to keep the slide moving in reading direction.
  const offset = useTextDirection() === "rtl" ? -8 : 8;

  return (
    <div className="w-full">
      <Tabs tabs={tabs} activeId={activeId} onChange={setActiveId} />
      <div className="mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, x: offset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -offset }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {activeId === "personal" ? (
              <PersonalAcademicPanel
                personalInfo={personalInfo}
                academicInfo={academicInfo}
                isEditing={isEditing}
                values={infoValues}
                errors={infoErrors}
                onChange={onInfoChange}
              />
            ) : (
              <SocialLinksPanel
                links={socialLinks}
                isEditing={isEditing}
                values={socialLinkValues}
                errors={socialLinkErrors}
                onChange={onSocialLinkChange}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
