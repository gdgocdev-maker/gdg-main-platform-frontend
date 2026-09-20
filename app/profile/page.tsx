"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { TopNav } from "@/components/dashboard/TopNav";
import { ProfileBio } from "@/components/profile/ProfileBio";
import { ProfileChips } from "@/components/profile/ProfileChips";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import {
  academicInfo,
  personalInfo,
  sampleProfile,
  socialLinks,
  type InfoCardData,
  type SocialLink,
} from "@/lib/constants/profile";
import { validateInfoField } from "@/lib/validateInfoField";
import { validateSocialLink } from "@/lib/validateSocialLink";
import { useMemberSince } from "@/lib/useMemberSince";

function linksToValues(links: SocialLink[]): Record<SocialLink["platform"], string> {
  return Object.fromEntries(
    links.map((link) => [link.platform, link.value ?? ""]),
  ) as Record<SocialLink["platform"], string>;
}

function cardsToValues(cards: InfoCardData[]): Record<string, string> {
  return Object.fromEntries(
    cards.flatMap((card) => card.rows.map((row) => [row.key, row.value])),
  );
}

function findRowValue(card: InfoCardData, key: string): string {
  return card.rows.find((row) => row.key === key)?.value ?? "";
}

export default function ProfilePage({}: PageProps<"/profile">) {
  const memberSince = useMemberSince();
  const [isEditing, setIsEditing] = useState(false);

  const [bio, setBio] = useState("");
  const [bioDraft, setBioDraft] = useState("");

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarDraft, setAvatarDraft] = useState<string | null>(null);
  const [headerImageUrl, setHeaderImageUrl] = useState<string | null>(null);
  const [headerImageDraft, setHeaderImageDraft] = useState<string | null>(null);

  const [personalData, setPersonalData] = useState(personalInfo);
  const [academicData, setAcademicData] = useState(academicInfo);
  const [infoDrafts, setInfoDrafts] = useState(() =>
    cardsToValues([personalInfo, academicInfo]),
  );
  const [infoErrors, setInfoErrors] = useState<Record<string, string | null>>({});

  const [links, setLinks] = useState<SocialLink[]>(socialLinks);
  const [linkDrafts, setLinkDrafts] = useState(() => linksToValues(socialLinks));
  const [linkErrors, setLinkErrors] = useState<
    Record<SocialLink["platform"], string | null>
  >(() =>
    Object.fromEntries(socialLinks.map((link) => [link.platform, null])) as Record<
      SocialLink["platform"],
      string | null
    >,
  );

  const handleEdit = () => {
    setBioDraft(bio);
    setAvatarDraft(avatarUrl);
    setHeaderImageDraft(headerImageUrl);
    setInfoDrafts(cardsToValues([personalData, academicData]));
    setInfoErrors({});
    setLinkDrafts(linksToValues(links));
    setLinkErrors(
      Object.fromEntries(links.map((link) => [link.platform, null])) as Record<
        SocialLink["platform"],
        string | null
      >,
    );
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (avatarDraft && avatarDraft !== avatarUrl) URL.revokeObjectURL(avatarDraft);
    if (headerImageDraft && headerImageDraft !== headerImageUrl) {
      URL.revokeObjectURL(headerImageDraft);
    }
    setIsEditing(false);
  };

  const handleAvatarSelect = (file: File) => {
    if (avatarDraft) URL.revokeObjectURL(avatarDraft);
    setAvatarDraft(URL.createObjectURL(file));
  };

  const handleHeaderImageSelect = (file: File) => {
    if (headerImageDraft) URL.revokeObjectURL(headerImageDraft);
    setHeaderImageDraft(URL.createObjectURL(file));
  };

  const handleInfoChange = (key: string, value: string) => {
    setInfoDrafts((prev) => ({ ...prev, [key]: value }));
    setInfoErrors((prev) => ({ ...prev, [key]: validateInfoField(key, value) }));
  };

  const handleLinkChange = (platform: SocialLink["platform"], value: string) => {
    setLinkDrafts((prev) => ({ ...prev, [platform]: value }));
    setLinkErrors((prev) => ({
      ...prev,
      [platform]: validateSocialLink(platform, value),
    }));
  };

  const handleSave = () => {
    const nextLinkErrors = Object.fromEntries(
      links.map((link) => [
        link.platform,
        validateSocialLink(link.platform, linkDrafts[link.platform]),
      ]),
    ) as Record<SocialLink["platform"], string | null>;
    const nextInfoErrors = Object.fromEntries(
      Object.entries(infoDrafts).map(([key, value]) => [
        key,
        validateInfoField(key, value),
      ]),
    );
    setLinkErrors(nextLinkErrors);
    setInfoErrors(nextInfoErrors);
    if (
      Object.values(nextLinkErrors).some(Boolean) ||
      Object.values(nextInfoErrors).some(Boolean)
    ) {
      return;
    }

    setBio(bioDraft);
    setAvatarUrl(avatarDraft);
    setHeaderImageUrl(headerImageDraft);
    setPersonalData((prev) => ({
      ...prev,
      rows: prev.rows.map((row) => ({
        ...row,
        value: infoDrafts[row.key] ?? row.value,
      })),
    }));
    setAcademicData((prev) => ({
      ...prev,
      rows: prev.rows.map((row) => ({
        ...row,
        value: infoDrafts[row.key] ?? row.value,
      })),
    }));
    setLinks((prev) =>
      prev.map((link) => ({
        ...link,
        value: linkDrafts[link.platform].trim() || null,
      })),
    );
    setIsEditing(false);
  };

  const major = findRowValue(academicData, "major");
  const studentId = findRowValue(personalData, "studentId");
  const chips = [major, studentId && `ID: ${studentId}`].filter(Boolean) as string[];

  return (
    <div
      className="flex flex-1 flex-col bg-white text-[#171717] font-[family-name:var(--font-inter)]"
      style={{ "--background": "#ffffff", "--foreground": "#171717" } as CSSProperties}
    >
      <TopNav />
      <ProfileHero
        initials={sampleProfile.initials}
        name={sampleProfile.name}
        email={sampleProfile.email}
        memberSince={memberSince}
        avatarUrl={isEditing ? avatarDraft : avatarUrl}
        headerImageUrl={isEditing ? headerImageDraft : headerImageUrl}
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        onAvatarSelect={handleAvatarSelect}
        onHeaderImageSelect={handleHeaderImageSelect}
      />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-6 sm:px-6 sm:py-8 md:gap-5 md:px-10 md:py-10 lg:px-16">
        <ProfileChips chips={chips} />
        <ProfileBio
          bio={isEditing ? bioDraft : bio}
          placeholder={sampleProfile.bioPlaceholder}
          isEditing={isEditing}
          onChange={setBioDraft}
        />
        <ProfileTabs
          personalInfo={personalData}
          academicInfo={academicData}
          socialLinks={links}
          isEditing={isEditing}
          infoValues={infoDrafts}
          infoErrors={infoErrors}
          onInfoChange={handleInfoChange}
          socialLinkValues={linkDrafts}
          socialLinkErrors={linkErrors}
          onSocialLinkChange={handleLinkChange}
        />
      </main>
    </div>
  );
}
