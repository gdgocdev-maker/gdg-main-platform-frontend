"use client";

import { ChevronDown, Search } from "lucide-react";
import { useId } from "react";
import { useTranslations } from "next-intl";
import { announcementCategories } from "@/lib/announcements/types";
import type { CategoryFilter, SortOrder } from "@/lib/announcements/query";

const filters: CategoryFilter[] = ["all", ...announcementCategories];

type AnnouncementControlsProps = {
  query: string;
  onQueryChange: (query: string) => void;
  category: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  sort: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  publishedCount: number;
};

export function AnnouncementControls({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  publishedCount,
}: AnnouncementControlsProps) {
  const t = useTranslations("announcements.controls");
  const tCategories = useTranslations("announcements.categories");
  const searchId = useId();
  const sortId = useId();

  return (
    <div className="flex flex-col gap-4 border-b border-border pb-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="search" className="relative w-full sm:max-w-[320px]">
          <label htmlFor={searchId} className="sr-only">
            {t("searchLabel")}
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="h-11 w-full rounded-full border border-border bg-surface ps-10 pe-4 text-sm text-foreground placeholder:text-gray-400 focus:border-gdg-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-gdg-blue/30"
          />
        </div>

        <div className="relative w-fit self-end sm:self-auto">
          <label htmlFor={sortId} className="sr-only">
            {t("sortLabel")}
          </label>
          <select
            id={sortId}
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortOrder)}
            className="h-11 cursor-pointer appearance-none rounded-xl border border-border bg-surface ps-4 pe-9 text-sm font-medium text-foreground focus:border-gdg-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-gdg-blue/30"
          >
            <option value="newest">{t("sort.newest")}</option>
            <option value="oldest">{t("sort.oldest")}</option>
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <div role="group" aria-label={t("filterLabel")} className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const selected = filter === category;

            return (
              <button
                key={filter}
                type="button"
                aria-pressed={selected}
                onClick={() => onCategoryChange(filter)}
                className={`h-9 rounded-full border px-4 text-sm font-medium leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gdg-blue ${
                  selected
                    ? "border-gdg-dark bg-gdg-dark text-[var(--white)]"
                    : "border-border bg-surface text-foreground hover:bg-surface-muted"
                }`}
              >
                {tCategories(filter)}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="ms-auto text-sm text-gray-400">
          {t("publishedCount", { count: publishedCount })}
        </p>
      </div>
    </div>
  );
}
