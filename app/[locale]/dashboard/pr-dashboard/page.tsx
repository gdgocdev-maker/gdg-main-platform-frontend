"use client";

import { LeaderGreeting } from "@/components/dashboard/shared/LeaderGreeting";
import { MetricCards } from "@/components/dashboard/shared/MetricCards";
import { PROverviewRegistrations } from "@/components/dashboard/pr/PRRegistrationManagement";
import { TasksPreview } from "@/components/dashboard/shared/TasksPreview";

export default function PROverviewPage() {
  return (
    <div className="space-y-6">
      <LeaderGreeting />
      <MetricCards />
      <PROverviewRegistrations />
      <TasksPreview />
    </div>
  );
}
