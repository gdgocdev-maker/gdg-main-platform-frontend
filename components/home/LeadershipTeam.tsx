"use client";

import { motion } from "framer-motion";
import TeamCard from "./TeamCard";
import { teamMembers } from "@/data/home";

export default function LeadershipTeam() {
  return (
    <section id="leadership" className="px-6 py-16 lg:px-10 lg:py-20">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="text-3xl font-bold leading-snug"
      >
        Our Leadership Team
      </motion.h2>

<div className="mx-auto mt-10 grid w-fit grid-cols-2 gap-x-16 gap-y-10 lg:grid-cols-4 lg:gap-x-20">
  {teamMembers.map((member, index) => (
    <motion.div
      key={member.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
        delay: index * 0.08,
      }}
    >
      <TeamCard member={member} />
    </motion.div>
  ))}
</div>
    </section>
  );
}