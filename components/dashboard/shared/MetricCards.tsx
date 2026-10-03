"use client";

import { useLeaderDashboard } from "./LeaderDashboardContext";
import { leaderCommitteeConfig } from "./committee-config";
import { dataAnalysisMetricBaseline } from "../data-analysis/mock-data";
import {
  Users,
  Calendar,
  Trophy,
  CheckSquare,
  CalendarCheck,
  ClipboardList,
  CircleCheck,
  CircleX,
} from "lucide-react";

export function MetricCards() {
  const { events, members, tasks, registrations, committee: activeCommittee } = useLeaderDashboard();
  const isRegistrationDashboard =
    leaderCommitteeConfig[activeCommittee].overviewMode === "registration-management";
  const baseline = dataAnalysisMetricBaseline;

  const activeMembersCount = members.filter((m) => m.status === "Active").length;
  const awayMembersCount = members.filter((m) => m.status === "Away").length;
  const upcomingEventsCount = events.filter((e) => e.status === "Upcoming").length;
  const totalPointsCount = members.reduce((sum, m) => sum + m.points, baseline.totalPoints);
  const activeTasksCount = tasks.filter((t) => t.status !== "Completed").length;

  const metrics = isRegistrationDashboard
    ? [
      { label: "Committee Members", value: members.length, detail: `${members.filter((m) => m.status === "Active").length} active`, icon: Users, border: "border-gdg-blue", iconStyle: "bg-blue-50 text-gdg-blue dark:bg-blue-950/50" },
      { label: "Upcoming Events", value: events.filter((e) => e.status === "Upcoming").length, detail: "Available for registration review", icon: Calendar, border: "border-gdg-red", iconStyle: "bg-red-50 text-gdg-red dark:bg-red-950/50" },
      { label: "Pending Registrations", value: registrations.filter((r) => r.status === "Pending").length, detail: "Awaiting review", icon: ClipboardList, border: "border-gdg-yellow", iconStyle: "bg-amber-50 text-gdg-yellow dark:bg-amber-950/50" },
      { label: "Accepted Registrations", value: registrations.filter((r) => r.status === "Accepted").length, detail: "Accepted applicants", icon: CircleCheck, border: "border-gdg-green", iconStyle: "bg-emerald-50 text-gdg-green dark:bg-emerald-950/50" },
      { label: "Rejected Registrations", value: registrations.filter((r) => r.status === "Rejected").length, detail: "Rejected applicants", icon: CircleX, border: "border-gdg-blue", iconStyle: "bg-blue-50 text-gdg-blue dark:bg-blue-950/50" },
      { label: "Total Points", value: members.reduce((sum, member) => sum + member.points, 0).toLocaleString(), detail: "Committee member points", icon: Trophy, border: "border-gdg-red", iconStyle: "bg-red-50 text-gdg-red dark:bg-red-950/50" },
      { label: "Active Tasks", value: activeTasksCount, detail: "To Do or in progress", icon: CheckSquare, border: "border-gdg-green", iconStyle: "bg-emerald-50 text-gdg-green dark:bg-emerald-950/50" },
    ]
    : [
      { label: "Total Committee Members", value: baseline.committeeMembers + members.length, detail: `${activeMembersCount + baseline.activeMembers} active · ${awayMembersCount + baseline.awayMembers} away`, icon: Users, border: "border-gdg-blue", iconStyle: "bg-blue-50 text-gdg-blue dark:bg-blue-950/50" },
      { label: "Upcoming Events", value: upcomingEventsCount + baseline.upcomingEvents, detail: `${baseline.upcomingEventsInNext30Days} in the next 30 days`, icon: Calendar, border: "border-gdg-red", iconStyle: "bg-red-50 text-gdg-red dark:bg-red-950/50" },
      { label: "Total Points", value: totalPointsCount.toLocaleString(), detail: `+${baseline.pointsThisMonth.toLocaleString()} this month`, icon: Trophy, border: "border-gdg-yellow", iconStyle: "bg-amber-50 text-gdg-yellow dark:bg-amber-950/50" },
      { label: "Active Tasks", value: activeTasksCount + baseline.activeTasks, detail: `${baseline.tasksDueThisWeek} due this week`, icon: CheckSquare, border: "border-gdg-green", iconStyle: "bg-emerald-50 text-gdg-green dark:bg-emerald-950/50" },
      { label: "Events Created", value: events.length + baseline.eventsCreated, detail: `${baseline.eventsPublishedThisYear} published this year`, icon: CalendarCheck, border: "border-gdg-blue", iconStyle: "bg-blue-50 text-gdg-blue dark:bg-blue-950/50" },
    ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {metrics.map(({ label, value, detail, icon: Icon, border, iconStyle }) => (
        <div key={label} className={`rounded-2xl border-2 ${border} bg-surface p-4 shadow-2xs transition-shadow hover:shadow-sm`}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-muted">{label}</span>
            <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}>
              <Icon className="size-4.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{value}</span>
            <span className="mt-1 block text-xs text-muted">{detail}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
