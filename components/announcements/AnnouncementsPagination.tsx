"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

type AnnouncementsPaginationProps = {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

// All pages when there are few; otherwise first, last and the current neighbourhood.
function visiblePages(current: number, count: number): (number | "gap")[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);

  const pages = new Set([1, count, current - 1, current, current + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= count).sort((a, b) => a - b);

  return sorted.flatMap((page, index) =>
    index > 0 && page - sorted[index - 1] > 1 ? (["gap", page] as const) : [page],
  );
}

const circle =
  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gdg-blue";

export function AnnouncementsPagination({
  currentPage,
  pageCount,
  onPageChange,
}: AnnouncementsPaginationProps) {
  const t = useTranslations("announcements.pagination");

  if (pageCount <= 1) return null;

  return (
    <nav aria-label={t("label")} className="flex justify-center">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label={t("previous")}
            className={`${circle} border border-border bg-surface text-foreground hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
          </button>
        </li>

        {visiblePages(currentPage, pageCount).map((page, index) =>
          page === "gap" ? (
            <li key={`gap-${index}`} aria-hidden="true" className="px-1 text-sm text-gray-400">
              …
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                onClick={() => onPageChange(page)}
                aria-label={t("page", { page })}
                aria-current={page === currentPage ? "page" : undefined}
                className={`${circle} ${
                  page === currentPage
                    ? "bg-gdg-dark text-[var(--white)]"
                    : "border border-border bg-surface text-foreground hover:bg-surface-muted"
                }`}
              >
                {page}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
            aria-label={t("next")}
            className={`${circle} border border-border bg-surface text-foreground hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
