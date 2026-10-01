import { CalendarDays, Clock, UserRound } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import type { Announcement } from "@/lib/announcements/types";

// Announcement dates are calendar dates (YYYY-MM-DD). Format them in UTC so the
// day never shifts with the viewer's timezone.
export function useAnnouncementDate() {
  const format = useFormatter();

  return (isoDate: string, day: "numeric" | "2-digit" = "2-digit") =>
    format.dateTime(new Date(`${isoDate}T00:00:00Z`), {
      month: "short",
      day,
      year: "numeric",
      timeZone: "UTC",
    });
}

export function PublishedDate({ date }: { date: string }) {
  const t = useTranslations("announcements.card");
  const formatDate = useAnnouncementDate();

  return (
    <span className="inline-flex items-center gap-1.5">
      <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
      <time dateTime={date}>{t("published", { date: formatDate(date) })}</time>
    </span>
  );
}

// Date, publisher and reading time — each shown only when the data has it.
export function AnnouncementMeta({
  announcement,
  className = "",
}: {
  announcement: Announcement;
  className?: string;
}) {
  const t = useTranslations("announcements.card");

  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500 ${className}`}
    >
      <PublishedDate date={announcement.publishedAt} />

      {announcement.publishedBy && (
        <span className="inline-flex items-center gap-1.5">
          <UserRound aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          {announcement.publishedBy}
        </span>
      )}

      {announcement.readTimeMinutes !== undefined && (
        <span className="inline-flex items-center gap-1.5">
          <Clock aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          {t("readTime", { minutes: announcement.readTimeMinutes })}
        </span>
      )}
    </div>
  );
}
