"use client"

import { useSyncExternalStore } from "react"

const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)"

function subscribe(onChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY)
  mediaQuery.addEventListener("change", onChange)

  return () => mediaQuery.removeEventListener("change", onChange)
}

function getSnapshot() {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches
}

function getServerSnapshot() {
  return true
}

export default function useDesktopMediaQuery() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
