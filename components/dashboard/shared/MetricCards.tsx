"use client";

import { useLeaderDashboard } from "./LeaderDashboardContext";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("dashboard.leader");
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
      { label: t("metrics.committeeMembers"), value: members.length, detail: t("metrics.active", { count: members.filter((m) => m.status === "Active").length }), icon: Users, border: "border-gdg-blue", iconStyle: "bg-blue-50 text-gdg-blue dark:bg-blue-950/50" },
      { label: t("metrics.upcomingEvents"), value: events.filter((e) => e.status === "Upcoming").length, detail: t("metrics.availableForReview"), icon: Calendar, border: "border-gdg-red", iconStyle: "bg-red-50 text-gdg-red dark:bg-red-950/50" },
      { label: t("metrics.pendingRegistrations"), value: registrations.filter((r) => r.status === "Pending").length, detail: t("metrics.awaitingReview"), icon: ClipboardList, border: "border-gdg-yellow", iconStyle: "bg-amber-50 text-gdg-yellow dark:bg-amber-950/50" },
      { label: t("metrics.acceptedRegistrations"), value: registrations.filter((r) => r.status === "Accepted").length, detail: t("metrics.acceptedApplicants"), icon: CircleCheck, border: "border-gdg-green", iconStyle: "bg-emerald-50 text-gdg-green dark:bg-emerald-950/50" },
      { label: t("metrics.rejectedRegistrations"), value: registrations.filter((r) => r.status === "Rejected").length, detail: t("metrics.rejectedApplicants"), icon: CircleX, border: "border-gdg-blue", iconStyle: "bg-blue-50 text-gdg-blue dark:bg-blue-950/50" },
      { label: t("metrics.totalPoints"), value: members.reduce((sum, member) => sum + member.points, 0).toLocaleString(), detail: t("metrics.committeeMemberPoints"), icon: Trophy, border: "border-gdg-red", iconStyle: "bg-red-50 text-gdg-red dark:bg-red-950/50" },
      { label: t("metrics.activeTasks"), value: activeTasksCount, detail: t("metrics.todoOrInProgress"), icon: CheckSquare, border: "border-gdg-green", iconStyle: "bg-emerald-50 text-gdg-green dark:bg-emerald-950/50" },
    ]
    : [
      { label: t("metrics.totalCommitteeMembers"), value: baseline.committeeMembers + members.length, detail: t("metrics.activeAway", { active: activeMembersCount + baseline.activeMembers, away: awayMembersCount + baseline.awayMembers }), icon: Users, border: "border-gdg-blue", iconStyle: "bg-blue-50 text-gdg-blue dark:bg-blue-950/50" },
      { label: t("metrics.upcomingEvents"), value: upcomingEventsCount + baseline.upcomingEvents, detail: t("metrics.next30Days", { count: baseline.upcomingEventsInNext30Days }), icon: Calendar, border: "border-gdg-red", iconStyle: "bg-red-50 text-gdg-red dark:bg-red-950/50" },
      { label: t("metrics.totalPoints"), value: totalPointsCount.toLocaleString(), detail: t("metrics.thisMonth", { count: baseline.pointsThisMonth.toLocaleString() }), icon: Trophy, border: "border-gdg-yellow", iconStyle: "bg-amber-50 text-gdg-yellow dark:bg-amber-950/50" },
      { label: t("metrics.activeTasks"), value: activeTasksCount + baseline.activeTasks, detail: t("metrics.dueThisWeek", { count: baseline.tasksDueThisWeek }), icon: CheckSquare, border: "border-gdg-green", iconStyle: "bg-emerald-50 text-gdg-green dark:bg-emerald-950/50" },
      { label: t("metrics.eventsCreated"), value: events.length + baseline.eventsCreated, detail: t("metrics.publishedThisYear", { count: baseline.eventsPublishedThisYear }), icon: CalendarCheck, border: "border-gdg-blue", iconStyle: "bg-blue-50 text-gdg-blue dark:bg-blue-950/50" },
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
