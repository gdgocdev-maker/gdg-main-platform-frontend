import { useTranslations } from "next-intl";
import { announcementsContainer } from "./styles";

const block = "rounded-full bg-surface-muted";

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="aspect-[16/9] bg-surface-muted" />
      <div className="flex flex-col gap-3 p-5">
        <div className={`h-5 w-20 ${block}`} />
        <div className={`h-3 w-32 ${block}`} />
        <div className={`h-5 w-4/5 ${block}`} />
        <div className={`h-3 w-full ${block}`} />
        <div className={`h-3 w-2/3 ${block}`} />
        <div className="mt-2 border-t border-border pt-3">
          <div className={`h-4 w-24 ${block}`} />
        </div>
      </div>
    </div>
  );
}

// Placeholder shaped like the listing (controls, pinned card, grid), or like the
// details page. Rendered by the routes' loading.tsx while data is being fetched.
export function AnnouncementsLoading({ variant = "list" }: { variant?: "list" | "details" }) {
  const t = useTranslations("announcements.loading");

  return (
    <div
      role="status"
      aria-live="polite"
      className={`${announcementsContainer} animate-pulse motion-reduce:animate-none ${variant === "details" ? "pt-10" : ""}`}
    >
      <span className="sr-only">{t("label")}</span>

      {variant === "list" ? (
        <div aria-hidden="true" className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 border-b border-border pb-6">
            <div className="flex justify-between gap-3">
              <div className={`h-11 w-full max-w-[320px] ${block}`} />
              <div className="h-11 w-32 rounded-xl bg-surface-muted" />
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className={`h-9 w-24 ${block}`} />
              ))}
            </div>
          </div>

          <div className="grid overflow-hidden rounded-card border border-border md:grid-cols-2">
            <div className="aspect-[16/10] bg-surface-muted md:aspect-auto md:min-h-[300px]" />
            <div className="flex flex-col gap-4 p-6 lg:p-8">
              <div className={`h-5 w-24 ${block}`} />
              <div className={`h-7 w-4/5 ${block}`} />
              <div className={`h-4 w-full ${block}`} />
              <div className={`h-4 w-3/4 ${block}`} />
              <div className={`h-10 w-36 ${block}`} />
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      ) : (
        <div aria-hidden="true" className="flex flex-col gap-5">
          <div className={`h-3 w-64 ${block}`} />
          <div className={`h-5 w-24 ${block}`} />
          <div className={`h-10 w-3/4 ${block}`} />
          <div className={`h-3 w-72 ${block}`} />
          <div className="mt-4 aspect-[21/9] rounded-card bg-surface-muted" />
          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="flex flex-col gap-3">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className={`h-4 ${i % 3 === 2 ? "w-2/3" : "w-full"} ${block}`} />
              ))}
            </div>
            <div className="h-64 rounded-card bg-surface-muted" />
          </div>
        </div>
      )}
    </div>
  );
}
