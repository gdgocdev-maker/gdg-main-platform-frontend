"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLeaderDashboard } from "../shared/LeaderDashboardContext";
import type { CommitteeEvent } from "../shared/types";
import { EditEventModal } from "./EditEventModal";
import { ConfirmModal } from "../shared/ConfirmModal";
import {
  Info,
  Eye,
  Pencil,
  Trash2,
  Send,
  Calendar,
  MapPin,
  Clock,
  X,
  LayoutGrid,
  List,
} from "lucide-react";

interface EventManagementTableProps {
  onEditEvent?: (event: CommitteeEvent) => void;
  isCompact?: boolean;
}

export function EventManagementTable({
  onEditEvent: externalOnEdit,
  isCompact = false,
}: EventManagementTableProps = {}) {
  const t = useTranslations("dashboard.leader");
  const {
    events,
    deleteEvent,
    publishDraft,
    canManageEvents,
    searchQuery,
    statusFilter,
    typeFilter,
  } = useLeaderDashboard();

  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [viewingEvent, setViewingEvent] = useState<CommitteeEvent | null>(null);
  const [editingEvent, setEditingEvent] = useState<CommitteeEvent | null>(null);
  const [eventToDelete, setEventToDelete] = useState<CommitteeEvent | null>(null);

  const handleEditClick = (event: CommitteeEvent) => {
    if (externalOnEdit) {
      externalOnEdit(event);
    } else {
      setEditingEvent(event);
    }
  };

  // Filter events
  const filteredEvents = events.filter((e) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = e.title.toLowerCase().includes(q);
      const matchLocation = e.location.toLowerCase().includes(q);
      if (!matchTitle && !matchLocation) return false;
    }
    if (statusFilter !== "all" && e.status !== statusFilter) {
      return false;
    }
    if (typeFilter !== "all" && e.type !== typeFilter) {
      return false;
    }
    return true;
  });

  const displayEvents = isCompact ? filteredEvents.slice(0, 5) : filteredEvents;

  const getStatusBadge = (status: CommitteeEvent["status"]) => {
    switch (status) {
      case "Upcoming":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
            <span className="size-1.5 rounded-full bg-blue-600" />
            {t("eventFilters.upcoming")}
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            <span className="size-1.5 rounded-full bg-emerald-600" />
            {t("eventFilters.completed")}
          </span>
        );
      case "Draft":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <span className="size-1.5 rounded-full bg-slate-400" />
            {t("eventFilters.draft")}
          </span>
        );
      case "Needs Update":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
            <span className="size-1.5 rounded-full bg-amber-600" />
            {t("eventFilters.needsUpdate")}
          </span>
        );
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-border bg-surface shadow-2xs">
        {/* Table Card Header with View Mode Switcher */}
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between border-b border-border/80">
          <div>
            <h2 className="text-base font-bold text-foreground">
              {t("eventManagement.title")}
            </h2>
            <p className="text-xs text-muted">
              {t("eventManagement.description")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle: Grid (مربعات) vs List/Table (ليسته) */}
            {!isCompact && (
              <div className="flex items-center rounded-xl border border-border bg-surface-muted/50 p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`rounded-lg p-1.5 transition ${
                    viewMode === "table"
                      ? "bg-surface text-foreground shadow-2xs font-semibold"
                      : "text-muted hover:text-foreground"
                  }`}
                  title={t("eventManagement.listView")}
                  aria-label={t("eventManagement.tableView")}
                >
                  <List className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-lg p-1.5 transition ${
                    viewMode === "grid"
                      ? "bg-surface text-foreground shadow-2xs font-semibold"
                      : "text-muted hover:text-foreground"
                  }`}
                  title={t("eventManagement.gridCardsView")}
                  aria-label={t("eventManagement.gridView")}
                >
                  <LayoutGrid className="size-4" />
                </button>
              </div>
            )}

            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted/50 px-3 py-1 text-xs font-medium text-foreground">
              <span className="size-1.5 rounded-full bg-blue-500" />
              <span>{t("eventManagement.eventsCount", { count: filteredEvents.length })}</span>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="border-b border-border bg-blue-50/70 p-3 text-xs text-blue-900 dark:border-blue-900/40 dark:bg-[#0e1b2e] dark:text-blue-200">
          <div className="flex items-center gap-2">
            <Info className="size-4 shrink-0 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-950 dark:text-blue-200">
              {t("eventManagement.permission")}
            </span>
          </div>
        </div>

        {/* Content: List (Table) vs Grid (Cards) */}
        {viewMode === "table" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead>
                <tr className="border-b border-border text-[11px] font-semibold uppercase tracking-wider text-muted">
                  <th className="px-5 py-3.5 text-start">{t("eventManagement.event")}</th>
                  <th className="px-4 py-3.5 text-start">{t("eventManagement.date")}</th>
                  <th className="px-4 py-3.5 text-start">{t("eventManagement.time")}</th>
                  <th className="px-4 py-3.5 text-start">{t("eventManagement.location")}</th>
                  <th className="px-4 py-3.5 text-start">{t("eventManagement.registered")}</th>
                  <th className="px-4 py-3.5 text-start">{t("eventManagement.status")}</th>
                  <th className="px-4 py-3.5 text-start">{t("eventManagement.created")}</th>
                  <th className="px-4 py-3.5 text-start">{t("eventManagement.updated")}</th>
                  <th className="px-5 py-3.5 text-end">{t("eventManagement.actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {displayEvents.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-sm text-muted">
                      {t("eventManagement.empty")}
                    </td>
                  </tr>
                ) : (
                  displayEvents.map((event) => (
                    <tr
                      key={event.id}
                      className="group transition-colors hover:bg-surface-muted/30"
                    >
                      {/* EVENT */}
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {event.title}
                        </div>
                        <div className="text-[11px] text-muted">{event.type}</div>
                      </td>

                      {/* DATE */}
                      <td className="px-4 py-3.5 text-foreground/80 whitespace-nowrap">
                        {event.date}
                      </td>

                      {/* TIME */}
                      <td className="px-4 py-3.5 text-foreground/80 whitespace-nowrap">
                        {event.time}
                      </td>

                      {/* LOCATION */}
                      <td className="px-4 py-3.5 text-foreground/80 max-w-[160px] truncate">
                        {event.location}
                      </td>

                      {/* REGISTERED */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {event.isDraft ? (
                          <span className="text-muted">—</span>
                        ) : (
                          <span className="font-bold text-foreground">
                            {event.registered} / {event.capacity}
                          </span>
                        )}
                      </td>

                      {/* STATUS */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {getStatusBadge(event.status)}
                      </td>

                      {/* CREATED */}
                      <td className="px-4 py-3.5 text-muted whitespace-nowrap">
                        {event.created}
                      </td>

                      {/* UPDATED */}
                      <td className="px-4 py-3.5 text-muted whitespace-nowrap">
                        {event.updated}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-3.5 text-end whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          {/* Publish Draft Action */}
                          {event.isDraft && canManageEvents && (
                            <button
                              type="button"
                              title={t("eventManagement.publishDraft")}
                              onClick={() => publishDraft(event.id)}
                              className="rounded-lg p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                            >
                              <Send className="size-3.5" />
                            </button>
                          )}

                          {/* View action */}
                          <button
                            type="button"
                            title={t("eventManagement.viewDetails")}
                            onClick={() => setViewingEvent(event)}
                            className="rounded-lg p-1 text-muted hover:bg-surface-muted hover:text-foreground"
                          >
                            <Eye className="size-3.5" />
                          </button>

                          {/* Edit action */}
                          {canManageEvents && (
                            <button
                              type="button"
                              title={t("eventManagement.edit")}
                              onClick={() => handleEditClick(event)}
                              className="rounded-lg p-1 text-muted hover:bg-surface-muted hover:text-foreground"
                            >
                              <Pencil className="size-3.5" />
                            </button>
                          )}

                          {/* Delete action */}
                          {canManageEvents && (
                            <button
                              type="button"
                              title={t("eventManagement.delete")}
                              onClick={() => setEventToDelete(event)}
                              className="rounded-lg p-1 text-muted hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid (Cards) View */
          <div className="p-5">
            {displayEvents.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted">
                No events found matching your search and filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {displayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-col justify-between rounded-xl border border-border bg-surface p-4 shadow-2xs transition-shadow hover:shadow-sm"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                          {event.type}
                        </span>
                        {getStatusBadge(event.status)}
                      </div>

                      <h3 className="mt-2 text-sm font-bold text-foreground line-clamp-2">
                        {event.title}
                      </h3>

                      <div className="mt-3 space-y-1.5 text-xs text-muted">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-3.5 text-muted shrink-0" />
                          <span>{event.date} · {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="size-3.5 text-muted shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-border/80 pt-3 flex items-center justify-between text-xs">
                      <div>
                        {event.isDraft ? (
                          <span className="text-muted">{t("eventManagement.draft")}</span>
                        ) : (
                          <span className="font-semibold text-foreground">
                            {event.registered}/{event.capacity} <span className="text-muted font-normal">{t("eventManagement.registeredCount")}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {event.isDraft && canManageEvents && (
                          <button
                            type="button"
                            title="Publish Draft"
                            onClick={() => publishDraft(event.id)}
                            className="rounded-lg p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                          >
                            <Send className="size-3.5" />
                          </button>
                        )}

                        <button
                          type="button"
                          title={t("eventManagement.viewDetails")}
                          onClick={() => setViewingEvent(event)}
                          className="rounded-lg p-1 text-muted hover:bg-surface-muted hover:text-foreground"
                        >
                          <Eye className="size-3.5" />
                        </button>

                        {canManageEvents && (
                          <button
                            type="button"
                            title="Edit Event"
                            onClick={() => handleEditClick(event)}
                            className="rounded-lg p-1 text-muted hover:bg-surface-muted hover:text-foreground"
                          >
                            <Pencil className="size-3.5" />
                          </button>
                        )}

                        {canManageEvents && (
                          <button
                            type="button"
                            title={t("eventManagement.delete")}
                            onClick={() => setEventToDelete(event)}
                            className="rounded-lg p-1 text-muted hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Table Footer / Pagination */}
        <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted">
          <span>
            {t("eventManagement.showing", { start: displayEvents.length > 0 ? "1" : "0", end: displayEvents.length, total: events.length })}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled
              className="rounded-lg border border-border px-2.5 py-1 text-xs opacity-50 cursor-not-allowed"
            >
              Previous
            </button>
            <span className="flex size-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
              1
            </span>
            <button
              type="button"
              disabled
              className="rounded-lg border border-border px-2.5 py-1 text-xs opacity-50 cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* View Event Details Modal */}
      {viewingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setViewingEvent(null)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {viewingEvent.type}
                  </span>
                  {getStatusBadge(viewingEvent.status)}
                </div>
                <h3 className="mt-1 text-lg font-bold text-foreground">
                  {viewingEvent.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingEvent(null)}
                className="rounded-lg p-1.5 text-muted hover:bg-surface-muted hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-foreground/80">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-blue-500" />
                <span>{viewingEvent.date}</span>
                <span>•</span>
                <Clock className="size-4 text-blue-500" />
                <span>{viewingEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-rose-500" />
                <span>{viewingEvent.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{t("eventManagement.capacityAttendance")}</span>
                <span>
                  {t("eventManagement.seatsFilled", { registered: viewingEvent.registered, capacity: viewingEvent.capacity, percent: Math.round((viewingEvent.registered / viewingEvent.capacity) * 100) })}
                </span>
              </div>
              {viewingEvent.description && (
                <div className="mt-3 rounded-xl border border-border bg-surface-muted/30 p-3">
                  <div className="font-semibold text-foreground mb-1">{t("eventManagement.descriptionLabel")}</div>
                  <p className="text-muted leading-relaxed">{viewingEvent.description}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => setViewingEvent(null)}
                className="rounded-xl border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-surface-muted"
              >
                {t("eventManagement.close")}
              </button>
              {canManageEvents && (
                <button
                  type="button"
                  onClick={() => {
                    const evt = viewingEvent;
                    setViewingEvent(null);
                    handleEditClick(evt);
                  }}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  {t("eventManagement.edit")}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      <EditEventModal
        isOpen={Boolean(editingEvent)}
        onClose={() => setEditingEvent(null)}
        event={editingEvent}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(eventToDelete)}
        onClose={() => setEventToDelete(null)}
        onConfirm={() => {
          if (eventToDelete) {
            deleteEvent(eventToDelete.id);
          }
        }}
        title="Delete Event"
        message={
          <>
            Are you sure you want to delete{" "}
            <strong className="text-foreground">{eventToDelete?.title}</strong>? This
            will permanently remove it from the committee schedule.
          </>
        }
        confirmText={t("eventManagement.delete")}
        cancelText={t("eventForm.cancel")}
        danger
      />
    </>
  );
}
