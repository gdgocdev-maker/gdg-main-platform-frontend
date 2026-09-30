import { Pin } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Announcement } from "@/lib/announcements/types";
import { AnnouncementMedia } from "./AnnouncementMedia";
import { AnnouncementMeta } from "./AnnouncementMeta";
import { CategoryBadge } from "./CategoryBadge";
import { PillAction } from "./PillAction";

export function PinnedAnnouncementCard({ announcement }: { announcement: Announcement }) {
  const t = useTranslations("announcements.pinned");

  return (
    <article className="grid overflow-hidden rounded-card border border-border bg-surface md:grid-cols-2">
      <div className="relative">
        <AnnouncementMedia
          media={announcement.media}
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-[16/10] h-full w-full md:aspect-auto md:min-h-[300px]"
        />
        <span className="absolute start-3 top-3 inline-flex items-center gap-1 rounded-full bg-[var(--white)] px-2.5 py-1 text-xs font-medium leading-none text-gdg-dark shadow-sm">
          <Pin aria-hidden="true" className="h-3 w-3 fill-gdg-red text-gdg-red" />
          {t("badge")}
        </span>
      </div>

      <div className="flex flex-col justify-center gap-4 p-6 lg:p-8">
        <CategoryBadge category={announcement.category} />

        <h3 className="text-2xl font-semibold leading-snug text-foreground lg:text-3xl lg:font-bold">
          {announcement.title}
        </h3>

        <p className="text-sm text-gray-500 sm:text-base">{announcement.excerpt}</p>

        <AnnouncementMeta announcement={announcement} />

        <PillAction href={`/announcements/${announcement.slug}`} className="w-fit">
          {t("viewDetails")}
          <span className="sr-only">: {announcement.title}</span>
        </PillAction>
      </div>
    </article>
  );
}
