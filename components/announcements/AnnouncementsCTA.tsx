import { useTranslations } from "next-intl";
import { PillAction } from "./PillAction";
import { announcementsContainer } from "./styles";

export function AnnouncementsCTA() {
  const t = useTranslations("announcements.cta");

  return (
    <section aria-labelledby="announcements-cta-heading" className={`${announcementsContainer} py-16 lg:py-20`}>
      <div className="rounded-card bg-[linear-gradient(100deg,var(--gdg-blue)_0%,color-mix(in_srgb,var(--gdg-blue)_40%,var(--gdg-red))_28%,var(--gdg-red)_52%,var(--gdg-yellow)_78%,var(--gdg-green)_100%)] px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
        <h2
          id="announcements-cta-heading"
          className="max-w-[640px] text-2xl font-bold leading-snug text-[var(--white)] sm:text-3xl"
        >
          {t("title")}
        </h2>
        <p className="mt-3 max-w-[520px] text-sm text-[var(--white)]/90 sm:text-base">
          {t("description")}
        </p>
        <PillAction href="/signup" variant="light" className="mt-6 border-transparent">
          {t("button")}
        </PillAction>
      </div>
    </section>
  );
}
