import { announcementFixtures } from "@/data/announcements";
import type { Announcement } from "./types";

// Single data entry point for the Announcements UI.
//
// TEMPORARY: backed by local fixtures because the Announcements API contract is
// not published yet. When it is, replace these function bodies with calls to the
// documented endpoints and map the response onto the `Announcement` model. The
// signatures are async so pages, loading.tsx and error.tsx already behave as they
// will with a real network request.

export async function getAnnouncements(): Promise<Announcement[]> {
  return announcementFixtures;
}

export async function getAnnouncementBySlug(
  slug: string,
): Promise<Announcement | undefined> {
  return announcementFixtures.find((announcement) => announcement.slug === slug);
}

// "More announcements" on the details page: the newest others. Deliberately simple.
export async function getRelatedAnnouncements(
  current: Announcement,
  limit = 3,
): Promise<Announcement[]> {
  return announcementFixtures
    .filter((announcement) => announcement.id !== current.id)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}
