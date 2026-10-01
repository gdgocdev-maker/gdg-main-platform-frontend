"use client";

import { useEffect } from "react";
import { AnnouncementsErrorState } from "@/components/announcements/AnnouncementStates";
import { announcementsContainer } from "@/components/announcements/styles";

export default function AnnouncementsError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={`${announcementsContainer} pt-10`}>
      <AnnouncementsErrorState onRetry={retry} />
    </div>
  );
}
