'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import clsx from 'clsx'

const options = ['dark', 'system', 'light'] as const

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Handle mounting state
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={clsx(className, 'flex gap-1 opacity-0')}>
        {options.map((option, i) => (
          <React.Fragment key={option}>
            <button className="text-xs">
              <span>{option}</span>
            </button>
            {i < options.length - 1 && <span className="text-xs">/</span>}
          </React.Fragment>
        ))}
      </div>
    )
  }

  return (
    <div className={clsx(className, 'flex gap-1')}>
      {options.map((option, i) => (
        <React.Fragment key={option}>
          <button
            className={clsx(
              'text-xs text-zinc-600 dark:text-zinc-300 flex items-center justify-center gap-1 max-w-max cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100',
              theme === option && '!text-zinc-900 dark:!text-zinc-100 font-medium'
            )}
            style={{
              fontFeatureSettings: '"ss01"',
              fontVariationSettings: '"wght" 500',
            }}
            onClick={() => setTheme(option)}
          >
            <span className="first-letter:uppercase">{option}</span>
          </button>
          {i < options.length - 1 && (
            <span className="text-xs text-zinc-400 dark:text-zinc-500">/</span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
