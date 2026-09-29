"use client";

import { useSyncExternalStore } from "react";

// Stores an ISO date (not formatted text) so the page can format it in the active language.
const STORAGE_KEY = "gdg-member-since-date";

// There's no auth/database yet, so this simulates an account-creation date by
// recording it in localStorage the first time the profile loads in this browser,
// then reusing that same date on every later visit. Swap for a real "createdAt"
// field from the user's account once auth exists.
// Cached so repeated snapshots return the same string (React re-renders forever otherwise).
let fallbackIso: string | null = null;

function nowIso(): string {
  fallbackIso ??= new Date().toISOString();
  return fallbackIso;
}

function getSnapshot(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    const iso = nowIso();
    localStorage.setItem(STORAGE_KEY, iso);
    return iso;
  } catch {
    return nowIso();
  }
}

function getServerSnapshot(): string {
  return "";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

// Returns an ISO date string, or "" during server rendering.
export function useMemberSince(): string {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
