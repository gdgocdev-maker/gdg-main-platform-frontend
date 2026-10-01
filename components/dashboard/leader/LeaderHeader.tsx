"use client";

import { usePathname } from "@/i18n/navigation";
import { Menu } from "lucide-react";

interface LeaderHeaderProps {
  onOpenMobileMenu?: () => void;
}

export function LeaderHeader({
  onOpenMobileMenu,
}: LeaderHeaderProps) {
  const pathname = usePathname();

  // Determine current section title based on pathname
  let pageTitle = "Overview";
  if (pathname.includes("/leader/events")) pageTitle = "Events";
  else if (pathname.includes("/leader/members")) pageTitle = "Members";
  else if (pathname.includes("/leader/tasks")) pageTitle = "Tasks";
  else if (pathname.includes("/leader/points")) pageTitle = "Points";
  else if (pathname.includes("/leader/settings")) pageTitle = "Settings";

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
              S
            </div>
            <div className="text-start">
              <span className="block text-xs font-semibold text-foreground leading-tight">
                Shahad
              </span>
              <span className="block text-[10px] text-muted leading-tight">
                Leader · UJ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
