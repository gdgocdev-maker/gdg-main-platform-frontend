"use client";

export function LeaderGreeting() {
  const userName = "Shahad";

  // Formatted date matching Thursday, 1 October 2026
  const dateString = "Thursday, 1 October 2026";

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Good morning, {userName}
        </h2>
        <p className="mt-1 text-xs text-muted sm:text-sm">
          Keep event information accurate, publish-ready, and visible across the GDG UJ platform.
        </p>
      </div>
      <div className="shrink-0 text-xs font-medium text-muted sm:text-end">
        {dateString}
      </div>
    </div>
  );
}
