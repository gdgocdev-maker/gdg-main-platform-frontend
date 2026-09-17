"use client";

import { motion } from "framer-motion";
import { InfoCard } from "@/components/profile/InfoCard";
import type { InfoCardData } from "@/lib/constants/profile";

type PersonalAcademicPanelProps = {
  personalInfo: InfoCardData;
  academicInfo: InfoCardData;
  isEditing: boolean;
  values: Record<string, string>;
  errors: Record<string, string | null>;
  onChange: (key: string, value: string) => void;
};

export function PersonalAcademicPanel({
  personalInfo,
  academicInfo,
  isEditing,
  values,
  errors,
  onChange,
}: PersonalAcademicPanelProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className="flex flex-col gap-4 md:flex-row"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 8 },
          visible: { opacity: 1, y: 0 },
        }}
        className="flex min-w-0 flex-1"
      >
        <InfoCard
          data={personalInfo}
          isEditing={isEditing}
          values={values}
          errors={errors}
          onChange={onChange}
        />
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 8 },
          visible: { opacity: 1, y: 0 },
        }}
        className="flex min-w-0 flex-1"
      >
        <InfoCard
          data={academicInfo}
          isEditing={isEditing}
          values={values}
          errors={errors}
          onChange={onChange}
        />
      </motion.div>
    </motion.div>
  );
}
