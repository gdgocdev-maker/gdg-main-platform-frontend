"use client";

import { usePathname } from "@/i18n/navigation";
import { Menu } from "lucide-react";
import { leaderCommitteeConfig } from "./committee-config";
import type { LeaderCommittee } from "./types";

interface LeaderHeaderProps {
  onOpenMobileMenu?: () => void;
  committee?: LeaderCommittee;
}

export function LeaderHeader({
  onOpenMobileMenu,
  committee = "data-analysis",
}: LeaderHeaderProps) {
  const pathname = usePathname();
  const config = leaderCommitteeConfig[committee];
  const routeRoot = config.routeBase;
  const leaderInitials = config.leaderDisplayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  // Determine current section title based on pathname
  let pageTitle = "Overview";
  if (pathname.startsWith(`${routeRoot}/events`)) {
    pageTitle = config.eventsLabel;
  } else if (pathname.startsWith(`${routeRoot}/members`)) pageTitle = "Members";
  else if (pathname.startsWith(`${routeRoot}/tasks`)) pageTitle = "Tasks";
  else if (pathname.startsWith(`${routeRoot}/points`)) pageTitle = "Points";
  else if (pathname.startsWith(`${routeRoot}/settings`)) pageTitle = "Settings";

  return (
    <div className="border-b border-border bg-surface px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Mobile hamburger & Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="p-1.5 text-foreground/70 hover:text-foreground lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="size-5" />
          </button>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {pageTitle}
            </h1>
          </div>
        </div>

        {/* Right: Profile Info */}
        <div className="flex items-center gap-3">
          {/* Profile Card */}
          <div className="flex items-center gap-2.5 rounded-xl border border-border bg-surface-muted/50 px-3 py-1.5">
              <div className="flex size-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/60 dark:text-blue-200">
              {leaderInitials}
            </div>
            <div className="text-start">
              <span className="block text-xs font-semibold text-foreground leading-tight">
                {config.leaderDisplayName}
              </span>
              <span className="block text-[10px] text-muted leading-tight">
                {config.headerSubtitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
