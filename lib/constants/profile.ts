export type SocialLink = {
  platform: "github" | "linkedin" | "website";
  label: string;
  value: string | null;
};

export type InfoRow = {
  key: string;
  label: string;
  value: string;
};

export type InfoCardData = {
  heading: string;
  rows: InfoRow[];
};

export const sampleProfile = {
  initials: "J",
  name: "Jana Alshaikh",
  email: "Janash@outlook.com",
  bioPlaceholder:
    "Tell the GDG Community about yourself, your interests, your projects, or what you're learning",
};

export const personalInfo: InfoCardData = {
  heading: "Personal Information",
  rows: [
    { key: "fullName", label: "Full name", value: "Jana Alshaikh" },
    { key: "email", label: "Email", value: "Janash@outlook.com" },
    { key: "phone", label: "Phone", value: "540505484" },
    { key: "studentId", label: "Student ID", value: "2510454" },
  ],
};

export const academicInfo: InfoCardData = {
  heading: "Academic information",
  rows: [
    { key: "university", label: "University", value: "University of Jeddah" },
    { key: "major", label: "Major", value: "Software Engineering" },
    { key: "academicYear", label: "Academic year", value: "Third Year" },
  ],
};

export const socialLinks: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    value: "https://github.com/jana",
  },
  {
    platform: "linkedin",
    label: "Linkedin",
    value: null,
  },
  {
    platform: "website",
    label: "Personal Website",
    value: null,
  },
];
