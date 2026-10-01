"use client";

import { useLeaderDashboard } from "./LeaderDashboardContext";
import { Search, RotateCcw, Calendar, ChevronDown } from "lucide-react";

export function EventsFilterBar() {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    dateFilter,
    setDateFilter,
    resetFilters,
  } = useLeaderDashboard();

  const isFiltered =
    searchQuery !== "" ||
    statusFilter !== "all" ||
    typeFilter !== "all" ||
    dateFilter !== "all";

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-3 sm:flex-row sm:items-center sm:justify-between shadow-2xs">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search events by name or location"
          className="h-10 w-full rounded-xl border border-border bg-surface-muted/40 ps-9 pe-12 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-muted">
          ⌘ K
        </span>
      </div>

      {/* Dropdown Filters & Clear */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status Dropdown */}
        <div className="relative flex items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 appearance-none rounded-xl border border-border bg-surface px-3 pe-8 text-xs font-medium text-foreground outline-none transition hover:bg-surface-muted focus:border-blue-500 cursor-pointer"
          >
            <option value="all">All statuses</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Draft">Draft</option>
            <option value="Needs Update">Needs Update</option>
          </select>
          <ChevronDown className="pointer-events-none absolute end-2.5 size-3.5 text-muted" />
        </div>

        {/* Date Dropdown */}
        <div className="relative flex items-center">
          <Calendar className="pointer-events-none absolute start-2.5 size-3.5 text-muted" />
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="h-10 appearance-none rounded-xl border border-border bg-surface ps-8 pe-8 text-xs font-medium text-foreground outline-none transition hover:bg-surface-muted focus:border-blue-500 cursor-pointer"
          >
            <option value="all">Any date</option>
            <option value="upcoming">Next 30 days</option>
            <option value="october">October 2026</option>
            <option value="november">November 2026</option>
          </select>
          <ChevronDown className="pointer-events-none absolute end-2.5 size-3.5 text-muted" />
        </div>

        {/* Event Type Dropdown */}
        <div className="relative flex items-center">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-10 appearance-none rounded-xl border border-border bg-surface px-3 pe-8 text-xs font-medium text-foreground outline-none transition hover:bg-surface-muted focus:border-blue-500 cursor-pointer"
          >
            <option value="all">All types</option>
            <option value="Workshop">Workshop</option>
            <option value="Conference">Conference</option>
            <option value="Talk">Talk</option>
            <option value="Panel">Panel</option>
          </select>
          <ChevronDown className="pointer-events-none absolute end-2.5 size-3.5 text-muted" />
        </div>

        {/* Clear Filter button */}
        {isFiltered && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-dashed border-border px-3 text-xs font-medium text-muted transition hover:border-foreground/30 hover:text-foreground"
          >
            <RotateCcw className="size-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}
