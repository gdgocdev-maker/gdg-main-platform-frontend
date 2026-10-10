"use client";

import { GrPrevious } from "react-icons/gr";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTextDirection } from "@/i18n/useTextDirection";
import { useState } from "react";

type Person = {
  name: string;
  image: string;
};

type SubCommittee = {
  id: string;
  name: string;
  description: string;
  lead: Person;
  coLeader?: Person;
};

type Committee = {
  id: string;
  name: string;
  color: string;
  description: string;
  lead: Person;
  coLeader?: Person;
  subCommittees?: SubCommittee[];
};

type CommitteeCardProps = {
  committee: Committee;
  number: number;
};

/* ---------- Leader photo + labels (shared by lead & co-lead) ---------- */

type LeaderProps = {
  image: string;
  alt: string;
  label: string;
  name: string;
  dir: "rtl" | "ltr";
  sizeClass: string;
  widthClass: string;
};

function Leader({
  image,
  alt,
  label,
  name,
  dir,
  sizeClass,
  widthClass,
}: LeaderProps) {
  return (
    <div className={`flex flex-col items-center ${widthClass}`}>
      <div className={`relative ${sizeClass}`}>
        {/* Gradient background */}
        <div className="absolute inset-0 rounded-[10px] bg-gradient-to-r from-[var(--committee-blue)] to-[var(--committee-red)]" />

        {/* Image */}
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="relative z-10 h-full w-full rounded-[10px] object-cover"
        />
      </div>

      <p
        dir={dir}
        className="mt-3 text-balance text-center text-xs font-bold leading-snug text-foreground sm:text-sm md:mt-4"
      >
        {label}
      </p>

      <p
        dir={dir}
        className="mt-1 text-balance text-center text-xs font-bold leading-snug text-foreground sm:text-sm"
      >
        {name}
      </p>
    </div>
  );
}

/* ---------- Card ---------- */

export default function CommitteeCard({
  committee,
  number,
}: CommitteeCardProps) {
  const t = useTranslations("home.committees");
  const dir = useTextDirection();
  const reduceMotion = useReducedMotion();

  // Framer Motion x is physical: flip the switch animation in RTL.
  const sign = dir === "rtl" ? -1 : 1;
  const offset = reduceMotion ? 0 : 20 * sign;

  const [activeSubCommittee, setActiveSubCommittee] =
    useState<SubCommittee | null>(null);

  const activeCommittee = activeSubCommittee ?? committee;
  const isSubCommittee = activeSubCommittee !== null;
  const hasCoLeader = Boolean(activeCommittee.coLeader);

  // Sub-committees are nested under their parent committee's translation entry.
  const basePath = isSubCommittee
    ? `items.${committee.id}.subCommittees.${activeCommittee.id}`
    : `items.${committee.id}`;

  const activeName = t(`${basePath}.name`);
  const activeDescription = t(`${basePath}.description`);
  const activeLeadName = t(`${basePath}.leadName`);

  const activeCoLeaderName = activeCommittee.coLeader
    ? t(`items.${committee.id}.coLeaderName`)
    : null;

  // Photo sizes: one source of truth for every breakpoint.
  const leaderSize = hasCoLeader
    ? "h-[145px] w-[105px] sm:h-[170px] sm:w-[125px] md:h-[210px] md:w-[155px] lg:h-[185px] lg:w-[135px]"
    : "h-[180px] w-[140px] sm:h-[210px] sm:w-[160px] md:h-[240px] md:w-[175px] lg:h-[250px] lg:w-[180px]";

  // Column width = photo width, so long labels wrap under the photo
  // instead of pushing the layout sideways on small phones.
  const leaderWidth = hasCoLeader
    ? "w-[105px] sm:w-[125px] md:w-[155px] lg:w-[135px]"
    : "w-[140px] sm:w-[160px] md:w-[175px] lg:w-[180px]";

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border-3 bg-[var(--committee-card-surface)] px-4 py-5 sm:rounded-[18px] sm:px-7 sm:py-7 lg:px-10 lg:py-8"
      style={{ borderColor: committee.color }}
    >
      {/* Soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 0% 100%, color-mix(in srgb, ${committee.color} 14%, transparent), transparent 60%)`,
        }}
      />

      {/* Big watermark number */}
      <span
        aria-hidden
        className="pointer-events-none absolute end-2 top-1/2 -translate-y-1/2 select-none text-[140px] font-black leading-none tracking-tighter sm:text-[200px] md:text-[260px] lg:end-auto lg:start-4 lg:text-[360px] xl:text-[400px]"
        style={{ color: committee.color, opacity: 0.05 }}
      >
        {String(number).padStart(2, "0")}
      </span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeCommittee.id}
          initial={{ opacity: 0, x: offset }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -offset }}
          transition={{
            duration: reduceMotion ? 0.01 : 0.35,
            ease: "easeInOut",
          }}
          className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10"
        >
          {/* Start Side */}
          <div className="min-w-0 flex-1">
            {/* Back Button */}
            {isSubCommittee && (
              <button
                type="button"
                onClick={() => setActiveSubCommittee(null)}
                className="-ms-1 mb-3 flex min-h-[40px] items-center gap-2 rounded-md px-1 text-sm font-medium leading-normal text-foreground transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ outlineColor: committee.color }}
              >
                <GrPrevious className="shrink-0 rtl:-scale-x-100" />
                <span dir={dir}>{t("backToDevelopers")}</span>
              </button>
            )}

            {/* Committee Name */}
            <h3
              dir={dir}
              className="text-balance break-words pt-1 text-xl font-semibold leading-snug sm:text-2xl"
              style={{ color: committee.color }}
            >
              {activeName}
            </h3>

            {/* Description */}
            <div className="mt-5 sm:mt-8 lg:mt-14">
              <p
                dir={dir}
                className="max-w-full text-start text-sm font-normal leading-relaxed text-foreground sm:text-base sm:leading-normal md:max-w-[620px] md:text-justify lg:max-w-[540px]"
              >
                {activeDescription}
              </p>

              {/* Sub Committees */}
              {!isSubCommittee && committee.subCommittees && (
                <div className="mt-5 flex max-w-[560px] flex-wrap gap-2.5 sm:mt-8 sm:gap-4">
                  {committee.subCommittees.map((subCommittee) => (
                    <button
                      key={subCommittee.id}
                      type="button"
                      dir={dir}
                      onClick={() => setActiveSubCommittee(subCommittee)}
                      className="min-h-[40px] rounded-[9px] border-2 border-transparent px-3 py-2 text-xs font-medium text-foreground transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-4 sm:text-sm md:hover:scale-105"
                      style={{
                        outlineColor: committee.color,
                        background:
                          "linear-gradient(var(--surface), var(--surface)) padding-box, linear-gradient(90deg, var(--committee-gradient-blue), var(--committee-gradient-red), var(--committee-gradient-yellow), var(--committee-gradient-green)) border-box",
                      }}
                    >
                      {t(
                        `items.${committee.id}.subCommittees.${subCommittee.id}.name`,
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* End / Bottom Side */}
          <div
            className={`flex w-full shrink-0 flex-col items-center lg:w-auto ${
              hasCoLeader ? "lg:w-[340px]" : "lg:w-[220px]"
            }`}
          >
            <div
              className={`flex items-end justify-center ${
                hasCoLeader ? "gap-3 sm:gap-4 lg:gap-3" : ""
              }`}
            >
              <Leader
                image={activeCommittee.lead.image}
                alt={activeLeadName}
                label={t("leadLabel", { name: activeName })}
                name={activeLeadName}
                dir={dir}
                sizeClass={leaderSize}
                widthClass={leaderWidth}
              />

              {activeCommittee.coLeader && activeCoLeaderName && (
                <Leader
                  image={activeCommittee.coLeader.image}
                  alt={activeCoLeaderName}
                  label={t("coLeaderLabel", { name: activeName })}
                  name={activeCoLeaderName}
                  dir={dir}
                  sizeClass={leaderSize}
                  widthClass={leaderWidth}
                />
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}