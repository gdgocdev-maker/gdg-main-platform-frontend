"use client";

import { useLeaderDashboard } from "./LeaderDashboardContext";
import { useTranslations } from "next-intl";
import type { CommitteeMember } from "./types";
import { Trophy, ArrowUpRight, ArrowDownRight, History } from "lucide-react";

interface PointsSectionProps {
  onOpenUpdatePoints: (member: CommitteeMember) => void;
}

export function PointsSection({ onOpenUpdatePoints }: PointsSectionProps) {
  const { members, pointHistory, canManagePoints } = useLeaderDashboard();
  const t = useTranslations("dashboard.leader");

  const totalPoints = members.reduce((sum, m) => sum + m.points, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner Metric */}
      <div className="flex flex-col gap-4 rounded-2xl border border-blue-200 bg-blue-50/80 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-blue-800/50 dark:bg-[#0f1f38]">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
            <Trophy className="size-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-950 dark:text-blue-100 sm:text-2xl">
              {t("points.totalBanner", { points: totalPoints.toLocaleString() })}
            </h2>
            <p className="text-xs text-blue-800/80 dark:text-blue-300/80">
              {t("points.description")}
            </p>
          </div>
        </div>
      </div>

      {/* Member Points Table */}
      <div className="rounded-2xl border border-border bg-surface shadow-2xs">
        <div className="flex items-center justify-between border-b border-border/80 p-5">
          <div>
            <h3 className="text-base font-bold text-foreground">
              {t("points.standings")}
            </h3>
            <p className="text-xs text-muted">
              {t("points.manageDescription")}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="border-b border-border text-[11px] font-semibold uppercase tracking-wider text-muted">
                <th className="px-5 py-3.5 text-start">{t("points.member")}</th>
                <th className="px-4 py-3.5 text-start">{t("points.role")}</th>
                <th className="px-4 py-3.5 text-start">{t("points.currentPoints")}</th>
                <th className="px-4 py-3.5 text-start">{t("points.tasksCompleted")}</th>
                <th className="px-4 py-3.5 text-start">{t("points.lastUpdated")}</th>
                <th className="px-5 py-3.5 text-end">{t("points.actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-muted">
                    {t("points.emptyMembers")}
                  </td>
                </tr>
              ) : members.map((member) => (
                <tr key={member.id} className="transition hover:bg-surface-muted/20">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${member.avatarBgColor}`}
                      >
                        {member.initials}
                      </div>
                      <span className="font-bold text-foreground">
                        {member.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-muted">{member.role}</td>
                  <td className="px-4 py-3.5 font-bold text-blue-600 dark:text-blue-400 text-sm">
                    {member.points.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5 text-foreground/80">{member.tasksCompleted}</td>
                  <td className="px-4 py-3.5 text-muted">{member.lastActivity}</td>
                  <td className="px-5 py-3.5 text-end">
                    {canManagePoints && (
                      <button
                        type="button"
                        onClick={() => onOpenUpdatePoints(member)}
                        className="rounded-xl border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-surface-muted"
                      >
                        {t("points.updatePoints")}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 shadow-2xs">
        <div className="flex items-center gap-2 border-b border-border/80 pb-3">
          <History className="size-4 text-blue-500" />
          <h3 className="text-sm font-bold text-foreground">
            {t("points.history")}
          </h3>
        </div>

        <div className="mt-3 divide-y divide-border/60 text-xs">
          {pointHistory.length === 0 ? (
            <p className="py-4 text-sm text-muted">{t("points.emptyHistory")}</p>
          ) : pointHistory.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex size-6 items-center justify-center rounded-full ${
                    item.pointsDelta >= 0
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                  }`}
                >
                  {item.pointsDelta >= 0 ? (
                    <ArrowUpRight className="size-3.5" />
                  ) : (
                    <ArrowDownRight className="size-3.5" />
                  )}
                </div>
                <div>
                  <span className="font-bold text-foreground">
                    {item.memberName}:
                  </span>{" "}
                  <span className="text-muted">{item.reason}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 ps-8 sm:ps-0">
                <span
                  className={`font-bold ${
                    item.pointsDelta >= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {item.pointsDelta >= 0 ? `+${item.pointsDelta}` : item.pointsDelta} pts
                </span>
                <span className="text-[11px] text-muted">{item.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
