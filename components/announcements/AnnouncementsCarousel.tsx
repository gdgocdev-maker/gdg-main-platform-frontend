"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { GrNext, GrPrevious } from "react-icons/gr";
import type { Announcement } from "@/lib/announcements/types";
import { AnnouncementCard } from "./AnnouncementCard";

// Mobile/tablet horizontal slider for announcement cards, following the
// homepage FeaturedProjects pattern (snap-x row + centered previous/next).
// The parent remounts it (via `key`) when the list changes, so it restarts at
// the first card.
export function AnnouncementsCarousel({ announcements }: { announcements: Announcement[] }) {
  const t = useTranslations("announcements.carousel");
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const goTo = (index: number) => {
    if (index < 0 || index > announcements.length - 1) return;

    setActiveIndex(index);

    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  // Keep the arrows in sync when the user swipes: the active card is the one
  // closest to the scroller's centre (direction-agnostic, unlike scrollLeft).
  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // At either end the edge card counts as active, even if a neighbour is
    // equally close to the centre (e.g. two cards per view on tablet).
    const scrolled = Math.abs(scroller.scrollLeft);
    if (scrolled < 2) return setActiveIndex(0);
    if (scroller.scrollWidth - scroller.clientWidth - scrolled < 2) {
      return setActiveIndex(announcements.length - 1);
    }

    const { left, width } = scroller.getBoundingClientRect();
    const center = left + width / 2;
    let closest = 0;
    let closestDistance = Infinity;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      if (distance < closestDistance) {
        closest = index;
        closestDistance = distance;
      }
    });

    setActiveIndex(closest);
  };

  return (
    <div className="overflow-hidden">
      <ul
        ref={scrollerRef}
        onScroll={handleScroll}
        aria-label={t("label")}
        // `relative` contains the cards' absolutely positioned sr-only text, which
        // would otherwise widen the page instead of the scroller.
        className="scrollbar-hide relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {announcements.map((announcement, index) => (
          <li
            key={announcement.id}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            className="w-[85%] max-w-[360px] shrink-0 snap-center sm:w-[calc(50%-0.5rem)] sm:max-w-none"
          >
            <AnnouncementCard announcement={announcement} />
          </li>
        ))}
      </ul>

      {announcements.length > 1 && (
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            aria-label={t("previous")}
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-muted text-[var(--white)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gdg-blue disabled:cursor-default disabled:opacity-50"
          >
            <GrPrevious aria-hidden="true" className="rtl:-scale-x-100" />
          </button>

          <button
            type="button"
            aria-label={t("next")}
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === announcements.length - 1}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gdg-dark text-[var(--white)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gdg-blue disabled:cursor-default disabled:opacity-50"
          >
            <GrNext aria-hidden="true" className="rtl:-scale-x-100" />
          </button>
        </div>
      )}
    </div>
  );
}
