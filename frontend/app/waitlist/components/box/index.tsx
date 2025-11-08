import clsx from "clsx"
import type { PropsWithChildren } from "react"
import Image from "next/image"

export function WaitlistWrapper({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        "w-full mx-auto max-w-[500px] h-full md:h-auto flex flex-col justify-center items-center pb-0 overflow-hidden rounded-2xl",
        // Use theme-aware CSS variables for background and borders so the wrapper adapts to light/dark
        "bg-[color:var(--color-card)] text-[color:var(--color-card-foreground)] backdrop-blur-2xl",
        "border shadow-[0_20px_80px_-20px_rgba(0,0,0,0.2),0_10px_40px_-10px_rgba(0,0,0,0.12)] border-[color:var(--color-border)]",
      )}
    >
      <div className="flex flex-col items-center gap-4 flex-1 text-center w-full p-8 pb-4">
        
          <Image src="/trustpayroll3.png" alt="TrustPayroll" width={240} height={40} priority />
        
        <div className="flex flex-col gap-10">{children}</div>
      </div>
      <footer className="flex justify-between items-center w-full self-stretch px-8 py-3 text-xs bg-[color:var(--popover)] backdrop-blur-xl border-t border-[color:var(--border)]">
        <p className="text-[color:var(--muted-foreground)]">© 2025 TrustPayroll. All rights reserved.</p>
      </footer>
    </div>
  )
}
