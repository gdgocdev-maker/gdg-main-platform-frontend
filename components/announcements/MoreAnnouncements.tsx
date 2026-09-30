import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Announcement } from "@/lib/announcements/types";
import { AnnouncementCard } from "./AnnouncementCard";

export function MoreAnnouncements({ announcements }: { announcements: Announcement[] }) {
  const t = useTranslations("announcements.details.more");

  if (announcements.length === 0) return null;

  return (
    <section aria-labelledby="more-announcements-heading" className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2
          id="more-announcements-heading"
          className="text-3xl font-bold leading-snug text-foreground"
        >
          {t("title")}
        </h2>
        <Link
          href="/announcements"
          className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-gray-500 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gdg-blue"
        >
          {t("viewAll")}
          <ArrowRight aria-hidden="true" className="h-4 w-4 text-gdg-blue rtl:-scale-x-100" />
        </Link>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement) => (
          <li key={announcement.id}>
            <AnnouncementCard announcement={announcement} />
          </li>
        ))}
      </ul>
    </section>
  );
}
