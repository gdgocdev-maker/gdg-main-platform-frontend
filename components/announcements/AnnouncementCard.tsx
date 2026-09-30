import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Announcement } from "@/lib/announcements/types";
import { AnnouncementMedia } from "./AnnouncementMedia";
import { PublishedDate } from "./AnnouncementMeta";
import { CategoryBadge } from "./CategoryBadge";

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const t = useTranslations("announcements.card");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <AnnouncementMedia media={announcement.media} className="aspect-[16/9] w-full" />

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <CategoryBadge category={announcement.category} />

        <p className="text-xs text-gray-400">
          <PublishedDate date={announcement.publishedAt} />
        </p>

        <h3 className="text-xl font-semibold leading-snug text-foreground">
          {announcement.title}
        </h3>

        <p className="line-clamp-3 text-sm text-gray-500">{announcement.excerpt}</p>

        <div className="mt-auto border-t border-border pt-3">
          <Link
            href={`/announcements/${announcement.slug}`}
            className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-gdg-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gdg-blue"
          >
            {t("readMore")}
            <span className="sr-only">: {announcement.title}</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </article>
  );
}
