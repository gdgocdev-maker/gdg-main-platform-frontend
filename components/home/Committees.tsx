"use client";

import CommitteeCard from "./CommitteeCard";
import { committees } from "@/data/home";
import { useTranslations } from "next-intl";
import { useTextDirection } from "@/i18n/useTextDirection";

export default function Committees() {
  const t = useTranslations("home.committees");
  const dir = useTextDirection();

  return (
    <section
      id="committees"
      className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
    >
      {/* Section Title — scrolls with the section. Pinning it would drop an
          opaque band over every card that stacks up into that offset. */}
      <div className="pb-6 sm:pb-8">
        <h2
          dir={dir}
          className="text-start text-3xl font-bold leading-snug text-foreground"
        >
          {t("title")}
        </h2>
      </div>

      {/* Committee Cards */}
      <div className="mx-auto max-w-[915px]">
        {committees.map((committee, index) => (
          <div
            key={committee.id}
            className="sticky mb-6 sm:mb-8"
            style={{
              // Each card parks a little lower than the one above, building the
              // deck. 24px clears the floating navbar; nothing else is pinned.
              top: `calc(var(--home-nav-height) + ${24 + index * 28}px)`,
              zIndex: index + 1,
            }}
          >
            <CommitteeCard committee={committee} />
          </div>
        ))}
      </div>
    </section>
  );
}