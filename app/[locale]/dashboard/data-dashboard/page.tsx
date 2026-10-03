"use client";

import { useState } from "react";
import { LeaderGreeting } from "@/components/dashboard/shared/LeaderGreeting";
import { MetricCards } from "@/components/dashboard/shared/MetricCards";
import { EventsFilterBar } from "@/components/dashboard/data-analysis/EventsFilterBar";
import { EventManagementTable } from "@/components/dashboard/data-analysis/EventManagementTable";
import { UpcomingEventsSection } from "@/components/dashboard/data-analysis/UpcomingEventsSection";
import { TasksPreview } from "@/components/dashboard/shared/TasksPreview";
import { MemberPointsPreview } from "@/components/dashboard/data-analysis/MemberPointsPreview";
import { RecentActivityPreview } from "@/components/dashboard/data-analysis/RecentActivityPreview";
import { PointsModal } from "@/components/dashboard/shared/PointsModal";
import type { CommitteeMember } from "@/components/dashboard/shared/types";

export default function LeaderOverviewPage() {
  const [memberForPoints, setMemberForPoints] = useState<CommitteeMember | null>(null);
  const [pointsModalOpen, setPointsModalOpen] = useState(false);

  const handleUpdatePoints = (member: CommitteeMember) => {
    setMemberForPoints(member);
    setPointsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Greeting Row */}
      <LeaderGreeting />

      {/* 5 Summary Metric Cards */}
      <MetricCards />

      {/* Filter Bar */}
      <EventsFilterBar />

      {/* Event Management Card / Table */}
      <EventManagementTable />

      {/* Upcoming Events Section */}
      <UpcomingEventsSection />

      {/* Bottom Grid: Member Points & Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[65%_35%]">
        <MemberPointsPreview onUpdatePoints={handleUpdatePoints} />
        <RecentActivityPreview />
      </div>

      {/* Active Tasks Preview */}
      <TasksPreview />

      {/* Points Adjustment Modal */}
      <PointsModal
        isOpen={pointsModalOpen}
        onClose={() => setPointsModalOpen(false)}
        member={memberForPoints}
      />
    </div>
  );
}
