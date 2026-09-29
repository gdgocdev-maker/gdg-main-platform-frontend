"use client";

import { useTranslations } from "next-intl";
import { useTextDirection } from "@/i18n/useTextDirection";

type TeamMember = {
  id: string;
  image: string;
  role: string;
  name: string;
};

type TeamCardProps = {
  member: TeamMember;
};

export default function TeamCard({ member }: TeamCardProps) {
  const t = useTranslations("home.leadership");
  const dir = useTextDirection();

  return (
    <div className="relative w-[172px] shrink-0 pt-[195px]">
      
      {/* Gradient background */}
      <div
        className="absolute left-0 top-0 h-[195px] w-[171.5px] rounded-[8px] bg-gradient-to-r from-[var(--committee-blue)] to-[var(--committee-red)]"
      />

      {/* Image */}
      <img
        src={member.image}
        alt={t(`team.${member.id}.name`)}
        className="absolute left-1/2 top-[-25px] z-10 h-[220px] w-[220px] -translate-x-1/2 object-cover"
      />

      {/* Info */}
      <div className="relative z-20 text-center">
        
        {/* Google Developer Group */}
        <p className="text-sm font-normal leading-normal">
          <span className="text-gdg-blue">G</span>
          <span className="text-gdg-red">o</span>
          <span className="text-gdg-yellow">o</span>
          <span className="text-gdg-blue">g</span>
          <span className="text-gdg-green">l</span>
          <span className="text-gdg-red">e</span>{" "}
          <span className="text-foreground">Developer Group</span>
        </p>

        {/* Role */}
        <p
          dir={dir}
          className="text-sm font-normal leading-normal text-foreground"
        >
          {t(`team.${member.id}.role`)}
        </p>

        {/* Name */}
        <h4
          dir={dir}
          className="mt-[10px] text-xl font-semibold leading-normal text-foreground"
        >
          {t(`team.${member.id}.name`)}
        </h4>
      </div>
    </div>
  );
}