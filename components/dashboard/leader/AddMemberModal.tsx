"use client";

import { useState } from "react";
import { useLeaderDashboard } from "./LeaderDashboardContext";
import type { MemberRole, MemberStatus } from "./types";
import { X, UserPlus } from "lucide-react";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {
  const { addMember, members, canManageMembers } = useLeaderDashboard();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<MemberRole>("Data Analyst");
  const [status, setStatus] = useState<MemberStatus>("Active");

  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>({});
  const [generalError, setGeneralError] = useState("");

  const validateNameField = (val: string): string => {
    const trimmed = val.trim();
    if (!trimmed) return "Member full name is required.";
    if (trimmed.length < 3) return "Name must be at least 3 characters.";
    if (trimmed.length > 100) return "Name cannot exceed 100 characters.";
    if (!/^[\p{L}\s.'-]+$/u.test(trimmed)) {
      return "Name can only include letters, spaces, and hyphens.";
    }
    return "";
  };

  const validateEmailField = (val: string): string => {
    const trimmed = val.trim();
    if (!trimmed) return "University email is required.";
    if (trimmed.length > 254) return "Email cannot exceed 254 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return "Please enter a valid email address (e.g. user@uj.edu.sa).";
    }
    const isDuplicate = members.some(
      (m) => m.email.toLowerCase() === trimmed.toLowerCase()
    );
    if (isDuplicate) {
      return "A committee member with this email already exists.";
    }
    return "";
  };

  const nameError = touched.name ? validateNameField(name) : "";
  const emailError = touched.email ? validateEmailField(email) : "";

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });

    const nErr = validateNameField(name);
    const eErr = validateEmailField(email);

    if (nErr || eErr) {
      setGeneralError("Please correct the errors in the form before submitting.");
      return;
    }

    addMember({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      status,
    });

    setName("");
    setEmail("");
    setTouched({});
    setGeneralError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              <UserPlus className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Add Committee Member</h2>
              <p className="text-xs text-muted">
                Add an active student to the Data Analysis Committee.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:bg-surface-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {!canManageMembers && (
          <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300">
            You must be a Leader or Co-Leader to add committee members.
          </div>
        )}

        {generalError && (
          <div className="mt-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-600">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Full Name */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-foreground">
                Full Name *
              </label>
              <span className="text-[10px] text-muted">
                {name.length}/100
              </span>
            </div>
            <input
              type="text"
              value={name}
              maxLength={100}
              onChange={(e) => {
                setName(e.target.value);
                if (generalError) setGeneralError("");
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              placeholder="e.g. Layla Al-Ghamdi"
              className={`mt-1 h-10 w-full rounded-xl border px-3 text-sm text-foreground outline-none transition ${
                nameError
                  ? "border-rose-500 bg-rose-50/20 dark:bg-rose-950/20 focus:border-rose-600"
                  : "border-border bg-surface-muted/30 focus:border-blue-500"
              }`}
            />
            {nameError && (
              <p className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                {nameError}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-foreground">
                University Email *
              </label>
              <span className="text-[10px] text-muted">
                {email.length}/254
              </span>
            </div>
            <input
              type="email"
              value={email}
              maxLength={254}
              onChange={(e) => {
                setEmail(e.target.value);
                if (generalError) setGeneralError("");
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              placeholder="e.g. layla@uj.edu.sa"
              className={`mt-1 h-10 w-full rounded-xl border px-3 text-sm text-foreground outline-none transition ${
                emailError
                  ? "border-rose-500 bg-rose-50/20 dark:bg-rose-950/20 focus:border-rose-600"
                  : "border-border bg-surface-muted/30 focus:border-blue-500"
              }`}
            />
            {emailError && (
              <p className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
                {emailError}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as MemberRole)}
                className="mt-1 h-10 w-full rounded-xl border border-border bg-surface-muted/30 px-3 text-xs text-foreground outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Data Analyst">Data Analyst</option>
                <option value="Data Coordinator">Data Coordinator</option>
                <option value="Event Data Member">Event Data Member</option>
                <option value="Database Member">Database Member</option>
                <option value="Research Member">Research Member</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as MemberStatus)}
                className="mt-1 h-10 w-full rounded-xl border border-border bg-surface-muted/30 px-3 text-xs text-foreground outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Away">Away</option>
              </select>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-surface-muted transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canManageMembers}
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95 disabled:opacity-50"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
