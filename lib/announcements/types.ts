// Frontend view model for the Announcements UI.
//
// These types describe only what the approved Announcements design renders.
// They are NOT the backend DTO: the Announcements API contract is not published
// yet (TBD). When it is, map the Swagger response onto this model inside
// lib/announcements/provider.ts so the components stay unchanged.

// The category chips shown in the approved design. Backend enum values are TBD.
export const announcementCategories = [
  "events",
  "recruitment",
  "workshops",
  "results",
  "community",
] as const;

export type AnnouncementCategory = (typeof announcementCategories)[number];

// Abstract GDG-coloured artwork used until real announcement media exists.
export type AnnouncementArtwork = "navy" | "forest" | "plum" | "ember" | "ocean" | "pine";

export type AnnouncementMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "artwork"; artwork: AnnouncementArtwork };

// Inline text with optional bold runs, e.g. "Applications close on **Oct 5**".
export type RichText = string | { text: string; strong?: boolean }[];

export type AnnouncementBlock =
  | { type: "paragraph"; text: RichText }
  | { type: "heading"; text: string }
  | { type: "list"; items: { label?: string; text: string }[] }
  | { type: "callout"; title: string; text: string };

export type AnnouncementAction = {
  label: string;
  href: string;
};

export type Announcement = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: AnnouncementCategory;
  media: AnnouncementMedia;
  // ISO 8601 date (YYYY-MM-DD).
  publishedAt: string;
  publishedBy?: string;
  readTimeMinutes?: number;
  pinned?: boolean;
  // Optional details-page content. Every field below renders only when present.
  body?: AnnouncementBlock[];
  deadline?: { label: string; date: string };
  status?: "open" | "closed";
  primaryAction?: AnnouncementAction;
};
