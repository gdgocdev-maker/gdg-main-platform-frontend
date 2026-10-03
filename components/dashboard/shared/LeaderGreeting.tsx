"use client";

import { useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import { useLeaderDashboard } from "./LeaderDashboardContext";
import { leaderCommitteeConfig } from "./committee-config";

const subscribeToNothing = () => () => {};

export function LeaderGreeting() {
  const locale = useLocale();
  const { committee } = useLeaderDashboard();
  const config = leaderCommitteeConfig[committee];
  const userName = config.leaderDisplayName;
  const subtitle = config.description;
  const dateString = useSyncExternalStore(
    subscribeToNothing,
    () => new Date().toLocaleDateString(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      numberingSystem: "latn",
    }),
    () => "Today",
  );

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Good morning, {userName}
        </h2>
        <p className="mt-1 text-xs text-muted sm:text-sm">
          {subtitle}
        </p>
      </div>
      <div className="shrink-0 text-xs font-medium text-muted sm:text-end">
        {dateString}
      </div>
    </div>
  );
}
