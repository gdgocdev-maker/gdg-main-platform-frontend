"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PersonalAcademicPanel } from "@/components/profile/PersonalAcademicPanel";
import { SocialLinksPanel } from "@/components/profile/SocialLinksPanel";
import { Tabs } from "@/components/ui/Tabs";
import type { InfoCardData, SocialLink } from "@/lib/constants/profile";

const tabs = [
  { id: "personal", label: "Personal & Academic" },
  { id: "social", label: "Social Links" },
];

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
  const [activeId, setActiveId] = useState(tabs[0].id);

  return (
    <div className="w-full">
      <Tabs tabs={tabs} activeId={activeId} onChange={setActiveId} />
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
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
