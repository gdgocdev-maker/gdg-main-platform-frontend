"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useTranslations } from "next-intl";
import CommitteeCard from "./CommitteeCard";
import { committees } from "@/data/home";
import { useTextDirection } from "@/i18n/useTextDirection";

export default function Committees() {
  const t = useTranslations("home.committees");
  const dir = useTextDirection();
  // scrollLeft is negative in RTL, so programmatic scrolls are flipped.
  const sign = dir === "rtl" ? -1 : 1;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(0);

  const getStep = () => {
    const el = scrollerRef.current;
    if (!el || el.children.length < 2) return el?.clientWidth ?? 0;
    const a = el.children[0] as HTMLElement;
    const b = el.children[1] as HTMLElement;
    return Math.abs(b.offsetLeft - a.offsetLeft);
  };

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = getStep() || 1;
    const pos = Math.abs(el.scrollLeft);
    const max = el.scrollWidth - el.clientWidth;

    setCanPrev(pos > 4);
    setCanNext(pos < max - 4);
    setPages(Math.max(1, Math.round(max / step) + 1));
    setActivePage(Math.min(Math.round(pos / step), Math.round(max / step)));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update, dir]);

  const scrollByCard = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({
      left: direction * sign * getStep(),
      behavior: "smooth",
    });
  };

  const goToPage = (index: number) => {
    scrollerRef.current?.scrollTo({
      left: sign * index * getStep(),
      behavior: "smooth",
    });
  };

  const arrowClass =
    "flex h-11 w-11 items-center justify-center rounded-full border-2 border-foreground/20 text-foreground transition hover:bg-foreground/10 disabled:pointer-events-none disabled:opacity-30";

  return (
    <section
      id="committees"
      className="px-6 py-16 lg:px-10 lg:py-20 sm:px-4 sm:py-16"
    >
      {/* Section Title */}
      <div className="max-w-2xl pb-6 sm:pb-8">
      <h2 className="text-4xl font-bold leading-snug text-foreground md:text-5xl">
        {t("title")}{" "}
        <span className="bg-gradient-to-r from-gdg-blue to-gdg-red bg-clip-text pe-1 italic text-transparent rtl:not-italic">
          {t("highlight")}
        </span>
      </h2>

      <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/60 md:text-lg">
        {t("subtitle")}
      </p>
      </div>

      {/* Cards row */}
      <div
        ref={scrollerRef}
        dir={dir}
        className="flex snap-x snap-mandatory items-stretch gap-1 overflow-x-auto py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {committees.map((committee, index) => (
          <div
            key={committee.id}
            className="flex shrink-0 basis-[92%] snap-start sm:basis-[90%] lg:basis-[88%] xl:basis-[915px]"
          >
            <CommitteeCard committee={committee} number={index + 1} />
          </div>
        ))}
      </div>

      {/* Arrows + dots (below the cards) */}
      <div
        dir={dir}
        className="mt-6 flex items-center justify-center gap-4"
      >
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
          aria-label="Previous"
          className={arrowClass}
        >
          <GrPrevious className="rtl:-scale-x-100" />
        </button>

        {/* {pages > 1 && (
          <div className="flex items-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToPage(i)}
                aria-label={`Go to ${i + 1}`}
                className={`h-2.5 rounded-full bg-foreground transition-all ${
                  i === activePage ? "w-7 opacity-100" : "w-2.5 opacity-25"
                }`}
              />
            ))}
          </div>
        )} */}

        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          aria-label="Next"
          className={arrowClass}
        >
          <GrNext className="rtl:-scale-x-100" />
        </button>
      </div>
    </section>
  );
}