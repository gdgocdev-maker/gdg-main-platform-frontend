"use client";

import { sponsors } from "@/data/home";
import { useTranslations } from "next-intl";
import { useTextDirection } from "@/i18n/useTextDirection";

function SponsorGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="sponsors-marquee-group flex shrink-0 gap-3 pe-3 sm:gap-4 sm:pe-4"
      aria-hidden={hidden ? true : undefined}
    >
      {sponsors.map((sponsor) => (
        <div
          key={sponsor.id}
          className="h-[76px] w-[76px] shrink-0 overflow-hidden rounded-full border border-border sm:h-[84px] sm:w-[84px] lg:h-[132px] lg:w-[132px]"
        >
          <img
            src={sponsor.image}
            alt={hidden ? "" : sponsor.name}
            className="h-full w-full scale-110 rounded-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default function SponsorsSection() {
  const t = useTranslations("home.sponsors");
  const dir = useTextDirection();

  return (
    <section id="sponsors" className="p-8 lg:p-10">
      <h2 dir={dir} className="text-3xl font-bold leading-snug">
        {t("title")}
      </h2>

      <div className="mt-10 overflow-hidden">
        <div className="sponsors-marquee flex w-max">
          <SponsorGroup />
          <SponsorGroup hidden />
          <SponsorGroup hidden />
          <SponsorGroup hidden />
          <SponsorGroup hidden />
          <SponsorGroup hidden />
        </div>
      </div>
    </section>
  );
}