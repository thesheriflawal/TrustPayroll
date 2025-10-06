import clsx from "clsx"
import type { PropsWithChildren } from "react"
import { ThemeSwitcher } from "../switch-theme"

export function WaitlistWrapper({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        "w-full mx-auto max-w-[500px] flex flex-col justify-center items-center pb-0 overflow-hidden rounded-2xl",
        "bg-white dark:bg-zinc-900",
        "shadow-[0_20px_60px_-15px_rgba(4,32,62,0.3),0_10px_30px_-10px_rgba(4,32,62,0.2)]",
        "dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_10px_30px_-10px_rgba(0,0,0,0.3)]",
        "border border-zinc-200 dark:border-zinc-700",
      )}
    >
      <div className="flex flex-col items-center gap-4 flex-1 text-center w-full p-8 pb-4">
        <div className="flex justify-center w-32 h-16 items-center mx-auto bg-zinc-100 dark:bg-zinc-800 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700">
          <span className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">Your Logo</span>
        </div>
        <div className="flex flex-col gap-10">{children}</div>
      </div>
      <footer className="flex justify-between items-center w-full self-stretch px-8 py-3 text-sm bg-zinc-100 dark:bg-zinc-800">
        <p className="text-xs text-zinc-600 dark:text-zinc-300">© 2025 TrustPayroll. All rights reserved.</p>
        <ThemeSwitcher />
      </footer>
    </div>
  )
}
