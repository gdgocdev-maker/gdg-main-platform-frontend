"use client";

import { GrPrevious } from "react-icons/gr";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTextDirection } from "@/i18n/useTextDirection";
import { useState } from "react";

type SubCommittee = {
  id: string;
  name: string;
  description: string;
  lead: {
    name: string;
    image: string;
  };
  coLeader?: {
    name: string;
    image: string;
  };
};

type Committee = {
  id: string;
  name: string;
  color: string;
  description: string;
  lead: {
    name: string;
    image: string;
  };
  coLeader?: {
    name: string;
    image: string;
  };
  subCommittees?: SubCommittee[];
};

type CommitteeCardProps = {
  committee: Committee;
};

export default function CommitteeCard({
  committee,
}: CommitteeCardProps) {
  const t = useTranslations("home.committees");
  const dir = useTextDirection();
  const [activeSubCommittee, setActiveSubCommittee] =
    useState<SubCommittee | null>(null);

  const activeCommittee = activeSubCommittee ?? committee;
  const isSubCommittee = activeSubCommittee !== null;

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

  return (
    <div
      className="relative w-full overflow-hidden rounded-[18px] border-3 bg-surface px-5 py-6 sm:px-7 sm:py-7 md:px-10 md:py-8"
      style={{ borderColor: committee.color }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCommittee.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
          className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between"
        >
          {/* Left Side */}
          <div className="flex-1">
            {/* Back Button */}
            {isSubCommittee && (
              <button
                type="button"
                onClick={() => setActiveSubCommittee(null)}
                className="mb-3 flex items-center gap-2 text-sm font-medium leading-normal text-foreground transition-opacity hover:opacity-60"
              >
                <GrPrevious />
                <span dir={dir}>{t("backToDevelopers")}</span>
              </button>
            )}

            {/* Committee Name */}
            <h3
              dir={dir}
              className="pt-1 text-2xl font-semibold leading-snug"
              style={{ color: committee.color }}
            >
              {activeName}
            </h3>

            {/* Description */}
            <div className="mt-8 sm:mt-10 md:mt-16">
              <p
                dir={dir}
                className="max-w-[540px] text-justify text-base font-normal leading-normal text-foreground"
              >
                {activeDescription}
              </p>

              {/* Sub Committees */}
              {!isSubCommittee && committee.subCommittees && (
                <div className="mt-6 flex max-w-[560px] flex-wrap gap-2.5 sm:mt-8 sm:gap-4">
                  {committee.subCommittees.map((subCommittee) => (
                    <button
                      key={subCommittee.id}
                      type="button"
                      dir={dir}
                      onClick={() =>
                        setActiveSubCommittee(subCommittee)
                      }
                      className="rounded-[9px] border-2 border-transparent px-3 py-2 text-xs font-medium text-foreground transition duration-200 hover:scale-105 sm:px-4 sm:text-sm"
                      style={{
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

          {/* Right / Bottom Side */}
          <div
            className={`flex shrink-0 flex-col items-center ${
              activeCommittee.coLeader
                ? "md:w-[340px]"
                : "md:w-[220px]"
            }`}
          >
            {/* Leaders Images */}
            <div
              className={`flex items-end justify-center ${
                activeCommittee.coLeader ? "gap-3" : ""
              }`}
            >
              {/* Leader */}
              <div className="flex flex-col items-center">
                <div
                  className={
                    activeCommittee.coLeader
                      ? "relative h-[145px] w-[105px] sm:h-[165px] sm:w-[120px] md:h-[185px] md:w-[135px]"
                      : "relative h-[180px] w-[140px] sm:h-[200px] sm:w-[160px] md:h-[250px] md:w-[180px]"
                  }
                >
                  {/* Gradient Background */}
                  <div
                    className={
                      activeCommittee.coLeader
                        ? "absolute inset-0 rounded-[10px] bg-gradient-to-r from-[var(--committee-blue)] to-[var(--committee-red)]"
                        : "absolute bottom-0 left-1/2 h-[180px] w-[140px] -translate-x-1/2 rounded-[10px] bg-gradient-to-r from-[var(--committee-blue)] to-[var(--committee-red)] sm:h-[200px] sm:w-[160px] md:h-[250px] md:w-[180px]"
                    }
                  />

                  {/* Image */}
                  <img
                    src={activeCommittee.lead.image}
                    alt={activeLeadName}
                    className="relative z-10 h-full w-full rounded-[10px] object-cover"
                  />
                </div>

                <p
                  dir={dir}
                  className="mt-3 text-center text-sm font-bold leading-normal text-foreground md:mt-4"
                >
                  {t("leadLabel", { name: activeName })}
                </p>

                <p
                  dir={dir}
                  className="mt-1 text-center text-sm font-bold leading-normal text-foreground"
                >
                  {activeLeadName}
                </p>
              </div>

              {/* Co-Leader */}
              {activeCommittee.coLeader && activeCoLeaderName && (
                <div className="flex flex-col items-center">
                  <div className="relative h-[145px] w-[105px] sm:h-[165px] sm:w-[120px] md:h-[185px] md:w-[135px]">
                    {/* Gradient Background */}
                    <div className="absolute inset-0 rounded-[10px] bg-gradient-to-r from-[var(--committee-blue)] to-[var(--committee-red)]" />

                    {/* Image */}
                    <img
                      src={activeCommittee.coLeader.image}
                      alt={activeCoLeaderName}
                      className="relative z-10 h-full w-full rounded-[10px] object-cover"
                    />
                  </div>

                  <p
                    dir={dir}
                    className="mt-3 text-center text-sm font-bold leading-normal text-foreground md:mt-4"
                  >
                    {t("coLeaderLabel", { name: activeName })}
                  </p>

                  <p
                    dir={dir}
                    className="mt-1 text-center text-sm font-bold leading-normal text-foreground"
                  >
                    {activeCoLeaderName}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}