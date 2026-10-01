"use client";

import { useLeaderDashboard } from "./LeaderDashboardContext";
import { Link } from "@/i18n/navigation";
import { CheckSquare } from "lucide-react";

export function TasksPreview() {
  const { tasks } = useLeaderDashboard();

  const previewTasks = tasks.slice(0, 4);

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case "High":
        return <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">High</span>;
      case "Medium":
        return <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">Medium</span>;
      default:
        return <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">Low</span>;
    }
  };

  const getStatusBadge = (s: string) => {
    switch (s) {
      case "Completed":
        return <span className="text-emerald-600 dark:text-emerald-400 font-semibold">● Completed</span>;
      case "In Progress":
        return <span className="text-blue-600 dark:text-blue-400 font-semibold">● In Progress</span>;
      default:
        return <span className="text-slate-500 font-semibold">● To Do</span>;
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-2xs">
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div>
          <h2 className="text-base font-bold text-foreground">
            Active committee tasks
          </h2>
          <p className="text-xs text-muted">
            High priority work assigned to committee members.
          </p>
        </div>
        <Link
          href="/dashboard/leader/tasks"
          className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
        >
          View all tasks
        </Link>
      </div>

      <div className="mt-3 divide-y divide-border/60">
        {previewTasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-2.5">
              <CheckSquare className="mt-0.5 size-4 shrink-0 text-blue-500" />
              <div>
                <span className="block text-xs font-bold text-foreground">
                  {task.title}
                </span>
                <span className="block text-[11px] text-muted">
                  Assigned to <strong>{task.assignedMemberName}</strong> · Due {task.dueDate}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              {getPriorityBadge(task.priority)}
              <span className="text-[11px]">{getStatusBadge(task.status)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
