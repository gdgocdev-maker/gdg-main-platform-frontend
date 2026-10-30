"use client";

import { useLeaderDashboard } from "./LeaderDashboardContext";
import { useTranslations } from "next-intl";
import { leaderCommitteeConfig } from "./committee-config";
import { Users, Calendar, Trophy, CheckSquare, CalendarCheck, ClipboardList, CircleCheck, CircleX } from "lucide-react";
import { DASHBOARD_CARD } from "../members/card-styles";

export function MetricCards() {
  const { stats, committee, dashboardLoading, dashboardError } = useLeaderDashboard();
  const t = useTranslations("dashboard.leader");
  const isPr = leaderCommitteeConfig[committee].overviewMode === "registration-management";
  const unavailable = dashboardLoading || dashboardError !== null;
  const metrics = isPr
    ? [
        { label: t("metrics.committeeMembers"), value: unavailable ? "—" : stats.committeeMembers, detail: unavailable ? "—" : t("metrics.active", { count: stats.activeMembers }), icon: Users },
        { label: t("metrics.upcomingEvents"), value: unavailable ? "—" : stats.upcomingEvents, detail: t("metrics.availableForReview"), icon: Calendar },
        { label: t("metrics.pendingRegistrations"), value: unavailable ? "—" : stats.pendingRegistrations, detail: t("metrics.awaitingReview"), icon: ClipboardList },
        { label: t("metrics.acceptedRegistrations"), value: unavailable ? "—" : stats.acceptedRegistrations, detail: t("metrics.acceptedApplicants"), icon: CircleCheck },
        { label: t("metrics.rejectedRegistrations"), value: unavailable ? "—" : stats.rejectedRegistrations, detail: t("metrics.rejectedApplicants"), icon: CircleX },
      ]
    : [
        { label: t("metrics.totalCommitteeMembers"), value: unavailable ? "—" : stats.committeeMembers, detail: unavailable ? "—" : t("metrics.activeAway", { active: stats.activeMembers, away: stats.awayMembers }), icon: Users },
        { label: t("metrics.upcomingEvents"), value: unavailable ? "—" : stats.upcomingEvents, detail: unavailable ? "—" : t("metrics.next30Days", { count: stats.upcomingEventsInNext30Days }), icon: Calendar },
        { label: t("metrics.totalPoints"), value: unavailable ? "—" : stats.totalPoints.toLocaleString(), detail: unavailable ? "—" : t("metrics.thisMonth", { count: stats.pointsThisMonth.toLocaleString() }), icon: Trophy },
        { label: t("metrics.activeTasks"), value: unavailable ? "—" : stats.activeTasks, detail: unavailable ? "—" : t("metrics.dueThisWeek", { count: stats.tasksDueThisWeek }), icon: CheckSquare },
        { label: t("metrics.eventsCreated"), value: unavailable ? "—" : stats.eventsCreated, detail: unavailable ? "—" : t("metrics.publishedThisYear", { count: stats.eventsPublishedThisYear }), icon: CalendarCheck },
      ];
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
    {metrics.map(({ label, value, detail, icon: Icon }) => <div key={label} className={`${DASHBOARD_CARD} min-h-32`}>
      <div className="flex items-center justify-between gap-2"><span className="text-xs font-medium text-muted">{label}</span><span className="grid size-9 place-items-center rounded-xl bg-[var(--dashboard-blue-bg)] text-[var(--dashboard-blue-text)]"><Icon className="size-4.5" /></span></div>
      <div className="mt-3"><span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{value}</span><span className="mt-1 block text-xs text-muted">{detail}</span></div>
    </div>)}
  </div>;
}
