// Labels and headings live in messages/*/profile.json (keyed by `key`, `id` and
// `platform`); these constants only hold the user's own data.
export type SocialLink = {
  platform: "github" | "linkedin" | "website";
  value: string | null;
};

export type InfoRow = {
  key: string;
  value: string;
};

export type InfoCardData = {
  id: "personal" | "academic";
  rows: InfoRow[];
};

export const sampleProfile = {
  initials: "J",
  name: "Jana Alshaikh",
  email: "Janash@outlook.com",
};

export const personalInfo: InfoCardData = {
  id: "personal",
  rows: [
    { key: "fullName", value: "Jana Alshaikh" },
    { key: "email", value: "Janash@outlook.com" },
    { key: "phone", value: "540505484" },
    { key: "studentId", value: "2510454" },
  ],
};

export const academicInfo: InfoCardData = {
  id: "academic",
  rows: [
    { key: "university", value: "University of Jeddah" },
    { key: "major", value: "Software Engineering" },
    { key: "academicYear", value: "Third Year" },
  ],
};

export const socialLinks: SocialLink[] = [
  {
    platform: "github",
    value: "https://github.com/jana",
  },
  {
    platform: "linkedin",
    value: null,
  },
  {
    platform: "website",
    value: null,
  },
];
