'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import clsx from 'clsx'
import { Sun, Moon } from 'lucide-react'

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    // Prevent hydration mismatch — keep layout space but hidden
    return <div className={clsx(className, 'w-10 h-10 opacity-0')} />
  }

  const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const resolvedTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      aria-label="Toggle color theme"
      title={isDark ? 'Switch to light' : 'Switch to dark'}
      className={clsx(
        className,
        'inline-flex items-center justify-center rounded-full p-2 shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'bg-white/80 dark:bg-zinc-900/70 text-zinc-900 dark:text-zinc-100',
        'hover:bg-white dark:hover:bg-zinc-900/90'
      )}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Moon size={16} aria-hidden /> : <Sun size={16} aria-hidden />}
    </button>
  )
}
