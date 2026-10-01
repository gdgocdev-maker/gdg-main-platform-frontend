"use client";

import { useLeaderDashboard } from "./LeaderDashboardContext";
import { Calendar, Pencil, Trophy, AlertTriangle } from "lucide-react";
import { useState } from "react";

export function RecentActivityPreview() {
  const { recentActivities } = useLeaderDashboard();
  const [showAllModal, setShowAllModal] = useState(false);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "event_published":
        return (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300">
            <Calendar className="size-4" />
          </div>
        );
      case "details_updated":
        return (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300">
            <Pencil className="size-4" />
          </div>
        );
      case "points_awarded":
        return (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300">
            <Trophy className="size-4" />
          </div>
        );
      default:
        return (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300">
            <AlertTriangle className="size-4" />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 shadow-2xs">
      <div>
        <div className="border-b border-border/80 pb-4">
          <h2 className="text-base font-bold text-foreground">
            Recent activity
          </h2>
          <p className="text-xs text-muted">
            Committee changes and publishing activity.
          </p>
        </div>

        <div className="mt-4 space-y-4">
          {recentActivities.slice(0, 4).map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-3 text-xs">
              <div className="flex items-start gap-3">
                {getActivityIcon(item.type)}
                <div>
                  <h3 className="font-bold text-foreground leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
              <span className="shrink-0 text-[11px] text-muted">
                {item.timeAgo}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-3">
        <button
          type="button"
          onClick={() => setShowAllModal(true)}
          className="w-full rounded-xl border border-border py-2 text-center text-xs font-semibold text-foreground transition hover:bg-surface-muted"
        >
          View all activity
        </button>
      </div>

      {showAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setShowAllModal(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl">
            <h3 className="text-base font-bold text-foreground mb-4">
              All Committee Activity
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pe-1">
              {recentActivities.map((item) => (
                <div key={item.id} className="flex items-start gap-3 border-b border-border/60 pb-3 text-xs">
                  {getActivityIcon(item.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">{item.title}</span>
                      <span className="text-[10px] text-muted">{item.timeAgo}</span>
                    </div>
                    <p className="text-muted mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="rounded-xl border border-border px-4 py-1.5 text-xs font-medium text-foreground hover:bg-surface-muted"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
