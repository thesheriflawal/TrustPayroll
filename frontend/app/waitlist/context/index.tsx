"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"

export function Providers({
  children,
  defaultTheme,
  forcedTheme,
}: {
  children: React.ReactNode
  defaultTheme?: string
  forcedTheme?: string | null
}) {
  return (
    <ThemeProvider
      enableSystem
      disableTransitionOnChange={false}
      attribute="class"
      defaultTheme={defaultTheme || "dark"}
      forcedTheme={forcedTheme || undefined}
    >
      {children}
    </ThemeProvider>
  )
}
