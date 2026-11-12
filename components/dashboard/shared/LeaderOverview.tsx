"use client";

import { useLeaderDashboard } from "./LeaderDashboardContext";
import { LeaderGreeting } from "./LeaderGreeting";
import { MetricCards } from "./MetricCards";
import { EventReportsPanel } from "../data-analysis/EventReportsPanel";
import { TasksPreview } from "./TasksPreview";
import { MemberPointsPreview } from "../data-analysis/MemberPointsPreview";
import { RecentActivityPreview } from "../data-analysis/RecentActivityPreview";

export function LeaderOverview() {
  const { committee, canManageRegistrations } = useLeaderDashboard();

  return (
    <div className="space-y-6">
      <LeaderGreeting />
      <MetricCards />
      {committee === "data-analysis" && canManageRegistrations && <EventReportsPanel />}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[65%_35%]">
        <MemberPointsPreview />
        <RecentActivityPreview />
      </div>
      <TasksPreview />
    </div>
  );
}
