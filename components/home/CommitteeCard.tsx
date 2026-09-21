"use client";
import { GrPrevious } from "react-icons/gr";
import { AnimatePresence, motion } from "framer-motion";
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
  const [activeSubCommittee, setActiveSubCommittee] =
    useState<SubCommittee | null>(null);

  const activeCommittee = activeSubCommittee ?? committee;
  const isSubCommittee = activeSubCommittee !== null;

  return (
    <div
      className="relative w-full overflow-hidden rounded-[18px] border-3 bg-white px-5 py-6 sm:px-7 sm:py-7 md:px-10 md:py-8"
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
                className="mb-3 flex items-center gap-2 text-sm font-medium leading-normal text-black transition-opacity hover:opacity-60"
              >
                <GrPrevious/>
                Back To Developers 
              </button>
            )}

            {/* Committee Name */}
            <h3
              className="pt-1 text-2xl font-semibold leading-snug"
              style={{ color: committee.color }}
            >
              {activeCommittee.name}
            </h3>

            {/* Description */}
            <div className="mt-8 sm:mt-10 md:mt-16">
              <p className="max-w-[540px] text-base font-normal leading-normal text-black">
                {activeCommittee.description}
              </p>

              {/* Sub Committees */}
              {!isSubCommittee &&
                committee.subCommittees && (
                  <div className="mt-6 flex max-w-[560px] flex-wrap gap-2.5 sm:mt-8 sm:gap-4">
                    {committee.subCommittees.map(
                      (subCommittee) => (
                        <button
                          key={subCommittee.id}
                          type="button"
                          onClick={() =>
                            setActiveSubCommittee(subCommittee)
                          }
                            className="rounded-[9px] border-2 border-transparent px-3 py-2 text-xs font-medium text-black transition duration-200 hover:scale-105 sm:px-4 sm:text-sm"
                            style={{
                            background:
                            "linear-gradient(white, white) padding-box, linear-gradient(90deg, #2D5495, #C44744, #EABB4E, #458B69) border-box",
                            }}
                        >
                          {subCommittee.name}
                        </button>
                      )
                    )}
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
            ? "relative h-[135px] w-[105px] sm:h-[155px] sm:w-[120px] md:h-[175px] md:w-[135px]"
            : "relative h-[160px] w-[140px] sm:h-[180px] sm:w-[160px] md:h-[205px] md:w-[180px]"
        }
      >
        {/* Gradient Background */}
        <div
          className={
            activeCommittee.coLeader
              ? "absolute inset-0 rounded-[10px] bg-gradient-to-r from-[#4967A4] to-[#B85D55]"
              : "absolute bottom-0 left-1/2 h-[160px] w-[140px] -translate-x-1/2 rounded-[10px] bg-gradient-to-r from-[#4967A4] to-[#B85D55] sm:h-[180px] sm:w-[160px] md:h-[205px] md:w-[180px]"
          }
        />

        {/* Image */}
        <img
          src={activeCommittee.lead.image}
          alt={activeCommittee.lead.name}
          className="relative z-10 h-full w-full rounded-[10px] object-cover"
        />
      </div>

      <p className="mt-3 text-center text-sm font-normal leading-normal text-black md:mt-4">
        {activeCommittee.name} Committee Lead
      </p>

      <p className="mt-1 text-center text-sm font-normal leading-normal text-black">
        {activeCommittee.lead.name}
      </p>
    </div>

    {/* Co-Leader */}
    {activeCommittee.coLeader && (
      <div className="flex flex-col items-center">
        <div className="relative h-[135px] w-[105px] sm:h-[155px] sm:w-[120px] md:h-[175px] md:w-[135px]">
          {/* Gradient Background */}
          <div className="absolute inset-0 rounded-[10px] bg-gradient-to-r from-[#4967A4] to-[#B85D55]" />

          {/* Image */}
          <img
            src={activeCommittee.coLeader.image}
            alt={activeCommittee.coLeader.name}
            className="relative z-10 h-full w-full rounded-[10px] object-cover"
          />
        </div>

        <p className="mt-3 text-center text-sm font-normal leading-normal text-black md:mt-4">
          {activeCommittee.name} Committee Co-Leader
        </p>

        <p className="mt-1 text-center text-sm font-normal leading-normal text-black">
          {activeCommittee.coLeader.name}
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



