"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import clsx from "clsx"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className={clsx(className, "w-10 h-10 opacity-0")} />
  }

  const prefersDark = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches
  const resolved = theme === "system" ? (prefersDark ? "dark" : "light") : theme
  const isDark = resolved === "dark"

  return (
    <button
      aria-label="Toggle theme"
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={clsx(
        className,
        "fixed z-[9999] right-4 top-4 inline-flex items-center justify-center rounded-full p-2 shadow-lg",
        "bg-white/90 dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100",
        "border border-[color:var(--border)]",
        "hover:scale-105 active:scale-95 transition-transform"
      )}
    >
      {isDark ? <Moon size={18} aria-hidden /> : <Sun size={18} aria-hidden />}
    </button>
  )
}
