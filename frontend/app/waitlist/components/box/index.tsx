import clsx from "clsx"
import type { PropsWithChildren } from "react"
import Image from "next/image"

export function WaitlistWrapper({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        "w-full mx-auto max-w-[500px] h-full md:h-auto flex flex-col justify-center items-center pb-0 overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-zinc-900/95 via-zinc-900/90 to-emerald-950/90 backdrop-blur-2xl",
        "border border-emerald-500/20 shadow-[0_20px_80px_-20px_rgba(39,167,74,0.3),0_10px_40px_-10px_rgba(0,0,0,0.5)]",
      )}
    >
      <div className="flex flex-col items-center gap-4 flex-1 text-center w-full p-8 pb-4">
        
          <Image src="/trustpayroll3.png" alt="TrustPayroll" width={240} height={40} priority />
        
        <div className="flex flex-col gap-10">{children}</div>
      </div>
      <footer className="flex justify-between items-center w-full self-stretch px-8 py-3 text-xs bg-black/30 backdrop-blur-xl border-t border-emerald-500/10">
        <p className="text-zinc-400">© 2025 TrustPayroll. All rights reserved.</p>
      </footer>
    </div>
  )
}
