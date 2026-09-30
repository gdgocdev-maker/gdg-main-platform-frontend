// Client component: loading.tsx gets no route params, so translating on the
// server here would make next-intl read request headers and turn the route dynamic.
"use client";

import { AnnouncementsHero } from "@/components/announcements/AnnouncementsHero";
import { AnnouncementsLoading } from "@/components/announcements/AnnouncementsLoading";

export default function Loading() {
  return (
    <>
      <AnnouncementsHero />
      <AnnouncementsLoading />
    </>
  );
}
