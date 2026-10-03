"use client";

import { useState } from "react";
import { useLeaderDashboard } from "../shared/LeaderDashboardContext";
import type { CommitteeEvent, EventStatus, EventType } from "../shared/types";
import { X, Calendar, MapPin, Clock, Users } from "lucide-react";

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CommitteeEvent | null;
}

interface EditEventFormProps {
  event: CommitteeEvent;
  onClose: () => void;
}

function EditEventForm({ event, onClose }: EditEventFormProps) {
  const { updateEvent, canManageEvents } = useLeaderDashboard();

  const [title, setTitle] = useState(event.title);
  const [type, setType] = useState<EventType>(event.type);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [location, setLocation] = useState(event.location);
  const [capacity, setCapacity] = useState<number | string>(event.capacity);
  const [status, setStatus] = useState<EventStatus>(event.status);
  const [description, setDescription] = useState(event.description ?? "");

  const [touched, setTouched] = useState<{
    title?: boolean;
    location?: boolean;
    capacity?: boolean;
    date?: boolean;
    time?: boolean;
  }>({});
  const [generalError, setGeneralError] = useState("");

  const validateTitle = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return "Event title is required.";
    if (trimmed.length < 3) return "Title must be at least 3 characters.";
    if (trimmed.length > 150) return "Title cannot exceed 150 characters.";
    return "";
  };

  const validateLocation = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return "Event location is required.";
    if (trimmed.length < 3) return "Location must be at least 3 characters.";
    if (trimmed.length > 120) return "Location cannot exceed 120 characters.";
    return "";
  };

  const validateCapacity = (val: number | string) => {
    if (val === "" || val === undefined || isNaN(Number(val))) {
      return "Capacity must be a valid number.";
    }
    const num = Number(val);
    if (!Number.isInteger(num)) return "Capacity must be a whole integer.";
    if (num < 1) return "Capacity must be at least 1 attendee.";
    if (num > 5000) return "Capacity cannot exceed 5,000 attendees.";
    if (num < event.registered) {
      return `Capacity cannot be lower than existing registrations (${event.registered}).`;
    }
    return "";
  };

  const validateDate = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return "Date is required.";
    if (trimmed.length < 4) return "Please enter a descriptive date (e.g. Oct 28, 2026).";
    return "";
  };

  const validateTime = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return "Time is required.";
    return "";
  };

  const titleError = touched.title ? validateTitle(title) : "";
  const locationError = touched.location ? validateLocation(location) : "";
  const capacityError = touched.capacity ? validateCapacity(capacity) : "";
  const dateError = touched.date ? validateDate(date) : "";
  const timeError = touched.time ? validateTime(time) : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      title: true,
      location: true,
      capacity: true,
      date: true,
      time: true,
    });

    const tErr = validateTitle(title);
    const lErr = validateLocation(location);
    const cErr = validateCapacity(capacity);
    const dErr = validateDate(date);
    const tmErr = validateTime(time);

    if (tErr || lErr || cErr || dErr || tmErr) {
      setGeneralError("Please correct all highlighted errors before saving.");
      return;
    }

    updateEvent(event.id, {
      title: title.trim(),
      type,
      date: date.trim(),
      time: time.trim(),
      location: location.trim(),
      capacity: Number(capacity),
      status,
      description: description.trim(),
      isDraft: status === "Draft",
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Edit Event
          </h2>
          <p className="text-xs text-muted">
            Update event details and publishing status.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-muted hover:bg-surface-muted hover:text-foreground"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {generalError && (
          <div className="rounded-xl border border-rose-500/20 bg-rose-50/20 p-3 text-xs text-rose-600 dark:bg-rose-950/20 dark:text-rose-400">
            {generalError}
          </div>
        )}

        {/* Title */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-foreground">
              Event Title *
            </label>
            <span className="text-[10px] text-muted">
              {title.length}/150
            </span>
          </div>
          <input
            type="text"
            value={title}
            maxLength={150}
            onChange={(e) => {
              setTitle(e.target.value);
              if (generalError) setGeneralError("");
            }}
            onBlur={() => setTouched((p) => ({ ...p, title: true }))}
            className={`mt-1 h-10 w-full rounded-xl border px-3 text-sm text-foreground outline-none transition ${
              titleError
                ? "border-rose-500 bg-rose-50/20 dark:bg-rose-950/20 focus:border-rose-600"
                : "border-border bg-surface-muted/30 focus:border-blue-500"
            }`}
          />
          {titleError && (
            <p className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
              {titleError}
            </p>
          )}
        </div>

        {/* Type & Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground">
              Event Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as EventType)}
              className="mt-1 h-10 w-full rounded-xl border border-border bg-surface-muted/30 px-3 text-sm text-foreground outline-none focus:border-blue-500"
            >
              <option value="Workshop">Workshop</option>
              <option value="Conference">Conference</option>
              <option value="Talk">Talk</option>
              <option value="Panel">Panel</option>
              <option value="Hackathon">Hackathon</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as EventStatus)}
              className="mt-1 h-10 w-full rounded-xl border border-border bg-surface-muted/30 px-3 text-sm text-foreground outline-none focus:border-blue-500"
            >
              <option value="Upcoming">Upcoming (Published)</option>
              <option value="Completed">Completed</option>
              <option value="Needs Update">Needs Update</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Date, Time & Capacity */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-foreground">
              Date *
            </label>
            <div className="relative mt-1">
              <Calendar className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={date}
                maxLength={40}
                onChange={(e) => {
                  setDate(e.target.value);
                  if (generalError) setGeneralError("");
                }}
                onBlur={() => setTouched((p) => ({ ...p, date: true }))}
                className={`h-10 w-full rounded-xl border ps-8 pe-2 text-xs text-foreground outline-none transition ${
                  dateError
                    ? "border-rose-500 bg-rose-50/20 dark:bg-rose-950/20 focus:border-rose-600"
                    : "border-border bg-surface-muted/30 focus:border-blue-500"
                }`}
              />
            </div>
            {dateError && (
              <p className="mt-1 text-[10px] font-medium text-rose-600 dark:text-rose-400">
                {dateError}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground">
              Time *
            </label>
            <div className="relative mt-1">
              <Clock className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={time}
                maxLength={30}
                onChange={(e) => {
                  setTime(e.target.value);
                  if (generalError) setGeneralError("");
                }}
                onBlur={() => setTouched((p) => ({ ...p, time: true }))}
                className={`h-10 w-full rounded-xl border ps-8 pe-2 text-xs text-foreground outline-none transition ${
                  timeError
                    ? "border-rose-500 bg-rose-50/20 dark:bg-rose-950/20 focus:border-rose-600"
                    : "border-border bg-surface-muted/30 focus:border-blue-500"
                }`}
              />
            </div>
            {timeError && (
              <p className="mt-1 text-[10px] font-medium text-rose-600 dark:text-rose-400">
                {timeError}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground">
              Capacity *
            </label>
            <div className="relative mt-1">
              <Users className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
              <input
                type="number"
                min="1"
                max="5000"
                value={capacity}
                onChange={(e) => {
                  setCapacity(e.target.value === "" ? "" : Number(e.target.value));
                  if (generalError) setGeneralError("");
                }}
                onBlur={() => setTouched((p) => ({ ...p, capacity: true }))}
                className={`h-10 w-full rounded-xl border ps-8 pe-2 text-xs text-foreground outline-none transition ${
                  capacityError
                    ? "border-rose-500 bg-rose-50/20 dark:bg-rose-950/20 focus:border-rose-600"
                    : "border-border bg-surface-muted/30 focus:border-blue-500"
                }`}
              />
            </div>
            {capacityError && (
              <p className="mt-1 text-[10px] font-medium text-rose-600 dark:text-rose-400">
                {capacityError}
              </p>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-foreground">
              Location *
            </label>
            <span className="text-[10px] text-muted">
              {location.length}/120
            </span>
          </div>
          <div className="relative mt-1">
            <MapPin className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={location}
              maxLength={120}
              onChange={(e) => {
                setLocation(e.target.value);
                if (generalError) setGeneralError("");
              }}
              onBlur={() => setTouched((p) => ({ ...p, location: true }))}
              className={`h-10 w-full rounded-xl border ps-9 pe-3 text-sm text-foreground outline-none transition ${
                locationError
                  ? "border-rose-500 bg-rose-50/20 dark:bg-rose-950/20 focus:border-rose-600"
                  : "border-border bg-surface-muted/30 focus:border-blue-500"
              }`}
            />
          </div>
          {locationError && (
            <p className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
              {locationError}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-foreground">
              Description (Optional)
            </label>
            <span className="text-[10px] text-muted">
              {description.length}/1000
            </span>
          </div>
          <textarea
            rows={3}
            value={description}
            maxLength={1000}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border bg-surface-muted/30 p-3 text-sm text-foreground outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-surface-muted transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!canManageEvents}
          className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

export function EditEventModal({ isOpen, onClose, event }: EditEventModalProps) {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-xl rounded-2xl border border-border bg-surface p-6 shadow-2xl">
        <EditEventForm key={event.id} event={event} onClose={onClose} />
      </div>
    </div>
  );
}
