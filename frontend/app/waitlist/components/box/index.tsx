import clsx from "clsx"
import type { PropsWithChildren } from "react"
import Image from "next/image"
import { ThemeSwitcher } from "../switch-theme"

export function WaitlistWrapper({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        "w-full mx-auto max-w-[500px] h-full md:h-auto flex flex-col justify-center items-center pb-0 overflow-hidden rounded-2xl transition-all duration-300",
        // Light mode: frosted glass with subtle green tinge
        "bg-white/60 backdrop-blur-2xl border border-emerald-300/50 shadow-[0_10px_50px_-15px_rgba(39,167,74,0.4),0_8px_32px_-12px_rgba(4,32,62,0.25)]",
        // Dark mode: solid dark surface
        "dark:bg-zinc-900/95 dark:backdrop-blur-xl dark:border-zinc-700/70 dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6),0_10px_30px_-10px_rgba(0,0,0,0.4)]",
      )}
    >
      <div className="flex flex-col items-center gap-4 flex-1 text-center w-full p-8 pb-4">
        
          <Image src="/trustpayroll3.png" alt="TrustPayroll" width={240} height={40} priority />
        
        <div className="flex flex-col gap-10">{children}</div>
      </div>
      <footer className="flex justify-between items-center w-full self-stretch px-8 py-3 text-xs bg-emerald-50/80 backdrop-blur-xl dark:bg-zinc-800/90 transition-colors duration-300">
        <p className="text-3xs text-zinc-700 dark:text-zinc-300">© 2025 TrustPayroll. All rights reserved.</p>
        <ThemeSwitcher />
      </footer>
    </div>
  )
}
