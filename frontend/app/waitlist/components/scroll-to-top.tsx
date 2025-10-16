"use client"

import { useEffect } from "react"

export function ScrollToTopOnReload() {
  useEffect(() => {
    let isReload = false
    // Detect reload using Navigation Timing Level 2
    try {
      const entries = (performance.getEntriesByType?.("navigation") || []) as PerformanceNavigationTiming[]
      if (entries.length > 0 && entries[0].type === "reload") {
        isReload = true
      }
      // Fallback for older browsers
      // @ts-ignore - legacy API
      if (!isReload && performance.navigation && performance.navigation.type === 1) {
        isReload = true
      }
    } catch {
      // no-op
    }

    if (isReload) {
      // Prevent browser restoring scroll and anchor auto-jump
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual"
      }
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search)
      }
      // Scroll to top after a tick
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
      }, 0)
    }
  }, [])

  return null
}
