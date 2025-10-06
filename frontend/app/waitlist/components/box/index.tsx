import clsx from "clsx"
import type { PropsWithChildren } from "react"
import { ThemeSwitcher } from "../switch-theme"

export function WaitlistWrapper({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        "w-full mx-auto max-w-[500px] flex flex-col justify-center items-center pb-0 overflow-hidden rounded-2xl",
        "bg-slate-1/95 backdrop-blur-sm",
        "shadow-[0_20px_60px_-15px_rgba(4,32,62,0.3),0_10px_30px_-10px_rgba(4,32,62,0.2)]",
        "dark:bg-slate-2/95 dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_10px_30px_-10px_rgba(0,0,0,0.3)]",
        "border border-slate-6/50 dark:border-slate-7/50",
      )}
    >
      <div className="flex flex-col items-center gap-4 flex-1 text-center w-full p-8 pb-4">
        <div className="flex justify-center w-32 h-16 items-center mx-auto bg-slate-3 rounded-lg border-2 border-dashed border-slate-6">
          <span className="text-xs text-slate-9 font-medium">Your Logo</span>
        </div>
        <div className="flex flex-col gap-10">{children}</div>
      </div>
      <footer className="flex justify-between items-center w-full self-stretch px-8 py-3 text-sm bg-slate-3/50 dark:bg-slate-3/30 overflow-hidden backdrop-blur-sm">
        <p className="text-xs text-slate-10">© 2025 TrustPayroll. All rights reserved.</p>
        <ThemeSwitcher />
      </footer>
    </div>
  )
}
