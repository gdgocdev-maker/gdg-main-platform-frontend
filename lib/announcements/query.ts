import type { Announcement, AnnouncementCategory } from "./types";

// Client-side search/filter/sort/pagination over the loaded announcements.
// Pure functions, independent of where the data came from. If the backend later
// takes these as query parameters (contract TBD), the explorer can pass them
// through instead.

export type CategoryFilter = AnnouncementCategory | "all";
export type SortOrder = "newest" | "oldest";

export const ANNOUNCEMENTS_PAGE_SIZE = 6;

export function filterAnnouncements(
  announcements: Announcement[],
  { query, category }: { query: string; category: CategoryFilter },
): Announcement[] {
  const needle = query.trim().toLowerCase();

  return announcements.filter((announcement) => {
    if (category !== "all" && announcement.category !== category) return false;
    if (!needle) return true;

    return [announcement.title, announcement.excerpt, announcement.publishedBy ?? ""]
      .some((field) => field.toLowerCase().includes(needle));
  });
}

export function sortAnnouncements(
  announcements: Announcement[],
  order: SortOrder,
): Announcement[] {
  const direction = order === "newest" ? -1 : 1;

  return [...announcements].sort(
    (a, b) => direction * a.publishedAt.localeCompare(b.publishedAt),
  );
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), pageCount);
  const start = (currentPage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    currentPage,
    pageCount,
  };
}
