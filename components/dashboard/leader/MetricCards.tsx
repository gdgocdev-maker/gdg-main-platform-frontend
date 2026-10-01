"use client";

import { useLeaderDashboard } from "./LeaderDashboardContext";
import { Users, Calendar, Trophy, CheckSquare, CalendarCheck } from "lucide-react";

export function MetricCards() {
  const { events, members, tasks } = useLeaderDashboard();

  // Dynamic calculations based on state + baseline metrics
  const activeMembersCount = members.filter((m) => m.status === "Active").length;
  const awayMembersCount = members.filter((m) => m.status === "Away").length;
  const upcomingEventsCount = events.filter((e) => e.status === "Upcoming").length;
  const totalPointsCount = members.reduce((sum, m) => sum + m.points, 15000); // realistic committee baseline
  const activeTasksCount = tasks.filter((t) => t.status !== "Completed").length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {/* 1. Total Committee Members - Google Blue */}
      <div className="rounded-2xl border-2 border-gdg-blue bg-surface p-4 shadow-2xs transition-shadow hover:shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted">Total Committee Members</span>
          <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-gdg-blue dark:bg-blue-950/50">
            <Users className="size-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {20 + members.length}
          </span>
          <span className="mt-1 block text-xs text-muted">
            {activeMembersCount + 16} active · {awayMembersCount + 3} away
          </span>
        </div>
      </div>

      {/* 2. Upcoming Events - Google Red */}
      <div className="rounded-2xl border-2 border-gdg-red bg-surface p-4 shadow-2xs transition-shadow hover:shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted">Upcoming Events</span>
          <div className="flex size-9 items-center justify-center rounded-xl bg-red-50 text-gdg-red dark:bg-red-950/50">
            <Calendar className="size-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {upcomingEventsCount + 5}
          </span>
          <span className="mt-1 block text-xs text-muted">
            3 in the next 30 days
          </span>
        </div>
      </div>

      {/* 3. Total Points - Google Yellow */}
      <div className="rounded-2xl border-2 border-gdg-yellow bg-surface p-4 shadow-2xs transition-shadow hover:shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted">
            Total Points
          </span>
          <div className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-gdg-yellow dark:bg-amber-950/50">
            <Trophy className="size-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {totalPointsCount.toLocaleString()}
          </span>
          <span className="mt-1 block text-xs text-muted">
            +1,280 this month
          </span>
        </div>
      </div>

      {/* 4. Active Tasks - Google Green */}
      <div className="rounded-2xl border-2 border-gdg-green bg-surface p-4 shadow-2xs transition-shadow hover:shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted">Active Tasks</span>
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-gdg-green dark:bg-emerald-950/50">
            <CheckSquare className="size-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {activeTasksCount + 12}
          </span>
          <span className="mt-1 block text-xs text-muted">
            5 due this week
          </span>
        </div>
      </div>

      {/* 5. Events Created - Google Blue */}
      <div className="rounded-2xl border-2 border-gdg-blue bg-surface p-4 shadow-2xs transition-shadow hover:shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted">Events Created</span>
          <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-gdg-blue dark:bg-blue-950/50">
            <CalendarCheck className="size-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {events.length + 27}
          </span>
          <span className="mt-1 block text-xs text-muted">
            18 published this year
          </span>
        </div>
      </div>
    </div>
  );
}
