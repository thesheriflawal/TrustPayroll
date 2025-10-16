import type { Metadata } from "next"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu"
import { submitWaitlistEmail } from "./lib/actions"
import { InputForm } from "./components/waitlist-form"
import { WaitlistWrapper } from "./components/box"

export const metadata: Metadata = {
  title: "TrustPayroll – Salary Streaming for Africa | Join the Waitlist",
  description:
    "TrustPayroll is a dual-rail payroll platform for African SMEs and gig workers. Stream salaries in NGN or USDT. Join the waitlist to get early access.",
}

export default function WaitlistPage() {
  return (
    <>
      {/* Top nav as its own fixed section */}
      <section aria-label="Primary navigation" className="fixed top-0 left-0 right-0 z-[2] pointer-events-none">
        <nav className="mx-auto max-w-6xl px-4 flex justify-center mt-4 pointer-events-auto">
          {/* Mobile dropdown */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full border border-white/10 bg-white/10 backdrop-blur-md shadow-sm px-4 py-2 text-xs text-white/90 hover:bg-white/15 transition">
                Menu
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="bg-white/90 text-black backdrop-blur-md border-white/40">
                <DropdownMenuItem asChild>
                  <a href="#overview">Overview</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#details">Details</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#join">Join</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Desktop pill nav */}
          <div className="hidden md:flex rounded-full border border-white/10 bg-white/10 backdrop-blur-md shadow-sm px-2 py-1 text-xs text-white/80 gap-1">
            <a className="px-3 py-1 rounded-full hover:bg-white/10 transition-colors" href="#overview">Overview</a>
            <a className="px-3 py-1 rounded-full hover:bg-white/10 transition-colors" href="#details">Details</a>
            <a className="px-3 py-1 rounded-full bg-[#27A74A] text-black hover:opacity-90 transition-colors" href="#join">Join</a>
          </div>
        </nav>
      </section>
        {/* Mobile spacer below fixed header */}
        <div className="block md:hidden h-16" />
      {/* Section 1: Hero (~80vh), centered */}
      <section className="relative min-h-[80dvh] grid place-items-center" id="overview">
        <div className="mx-auto max-w-5xl text-center flex flex-col items-center gap-6 px-2">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur-md w-fit">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#27A74A]" />
            Launching soon – Early access open
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
            Payroll that moves at the speed of your business
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl">
            TrustPayroll is a dual-rail salary streaming platform for African SMEs and the freelance economy. Pay via bank or
            wallet in real time. Supports NGN and USDT payments.
          </p>
          <div className="text-white/70 text-sm">
            FIAT and Web3 rails • Instant payouts • Attendance-aware streaming
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-4">
            <div className="rounded-xl bg-black/40 p-4 border border-white/10 hover:bg-black/50 transition text-left">
              <p className="text-white/70 text-xs">Pay Rails</p>
              <p className="text-white font-medium">NGN • USDT</p>
            </div>
            <div className="rounded-xl bg-black/40 p-4 border border-white/10 hover:bg-black/50 transition text-left">
              <p className="text-white/70 text-xs">Payouts</p>
              <p className="text-white font-medium">Instant • 24/7</p>
            </div>
            <div className="rounded-xl bg-black/40 p-4 border border-white/10 hover:bg-black/50 transition text-left">
              <p className="text-white/70 text-xs">Attendance</p>
              <p className="text-white font-medium">Auto • Manual • CSV</p>
            </div>
            <div className="rounded-xl bg-black/40 p-4 border border-white/10 hover:bg-black/50 transition text-left">
              <p className="text-white/70 text-xs">Visibility</p>
              <p className="text-white font-medium">Liabilities • Streams</p>
            </div>
          </div>
        </div>
      </section>
      {/* Section 2: Details (merged content) */}
      <section id="details" className="py-12">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 px-2">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition hover:bg-white/15">
            <h3 className="text-xl font-semibold">For Employers</h3>
            <p className="text-white/80 mt-2">
              Create your organization, add staff or freelancers, set salaries and work cycles, and start streaming payments. Fund once in NGN or USDT, TrustPayroll handles the rest.
            </p>
            <ul className="mt-4 grid gap-2 text-white/80 text-sm">
              <li>• Add individually or via CSV</li>
              <li>• Attendance defaults: mark all, remove absentees, or manual</li>
              <li>• Monitor remaining liability vs paid out</li>
              <li>• Optional employer liquidity/loans</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition hover:bg-white/15">
            <h3 className="text-xl font-semibold">For Employees & Contractors</h3>
            <p className="text-white/80 mt-2">
              Watch earnings accrue live based on attendance and work done. Withdraw anytime, straight to bank (NGN) or on-chain (USDT).
            </p>
            <ul className="mt-4 grid gap-2 text-white/80 text-sm">
              <li>• Live balance: earned-to-date and withdrawable</li>
              <li>• Instant bank transfers or USDT withdrawals</li>
              <li>• Transparent attendance and cycles</li>
              <li>• Join via invite link or email</li>
            </ul>
          </div>
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl hover:bg-white/15 transition">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span className="inline-block h-2 w-2 rounded-full bg-[#27A74A]" /> Path A – Fiat (Web2)
              </div>
              <ul className="mt-3 grid gap-2 text-white/80 text-sm">
                <li>• Email/Phone signup with OTP verification</li>
                <li>• KYC for employers (BVN, NIN, CAC)</li>
                <li>• NGN salary wallet and instant bank payouts</li>
                <li>• Attendance-aware daily accruals</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl hover:bg-white/15 transition">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span className="inline-block h-2 w-2 rounded-full bg-[#27A74A]" /> Path B – Web3 (Crypto)
              </div>
              <ul className="mt-3 grid gap-2 text-white/80 text-sm">
                <li>• Connect wallet (MetaMask, WalletConnect, or custodial)</li>
                <li>• No KYC required for crypto streaming</li>
                <li>• USDT salary streams via smart contracts</li>
                <li>• On-chain dashboards for live balances</li>
              </ul>
            </div>
          </div>
          {/* Features grid (MVP) */}
          <div className="lg:col-span-2 space-y-6 mt-4">
            <h2 className="text-2xl md:text-3xl font-semibold">Built for launch. Designed to scale.</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl hover:bg-white/15 transition shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-[#27A74A] font-medium">Feature</p>
                <h3 className="mt-1 font-semibold">Onboarding</h3>
                <p className="mt-2 text-white/80 text-sm leading-relaxed">Employers, employees, and web3 users can get started in minutes.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl hover:bg-white/15 transition shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-[#27A74A] font-medium">Feature</p>
                <h3 className="mt-1 font-semibold">Wallets</h3>
                <p className="mt-2 text-white/80 text-sm leading-relaxed">NGN wallets for fiat users; USDT wallets for crypto users.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl hover:bg-white/15 transition shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-[#27A74A] font-medium">Feature</p>
                <h3 className="mt-1 font-semibold">Streaming</h3>
                <p className="mt-2 text-white/80 text-sm leading-relaxed">Real-time salary accruals; employees see live earnings.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl hover:bg-white/15 transition shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-[#27A74A] font-medium">Feature</p>
                <h3 className="mt-1 font-semibold">Attendance</h3>
                <p className="mt-2 text-white/80 text-sm leading-relaxed">Flexible defaults and manual overrides; CSV import supported.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl hover:bg-white/15 transition shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-[#27A74A] font-medium">Feature</p>
                <h3 className="mt-1 font-semibold">Withdrawals</h3>
                <p className="mt-2 text-white/80 text-sm leading-relaxed">Instant payouts to bank (NGN) or on-chain (USDT).</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl hover:bg-white/15 transition shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-[#27A74A] font-medium">Feature</p>
                <h3 className="mt-1 font-semibold">Employer Loans</h3>
                <p className="mt-2 text-white/80 text-sm leading-relaxed">Optional liquidity for employers to smooth cash flow.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl hover:bg-white/15 transition shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-[#27A74A] font-medium">Feature</p>
                <h3 className="mt-1 font-semibold">Observability</h3>
                <p className="mt-2 text-white/80 text-sm leading-relaxed">Metrics on remaining liability vs paid out, in real time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: CTA Waitlist (compact) */}
      <section id="join" className="py-16 flex items-center justify-center px-2">
        <div className="w-full max-w-xl">
          <WaitlistWrapper>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-semibold">Join the TrustPayroll waitlist</h2>
              <p className="text-white/80 text-base leading-relaxed">
                Be first to know when we launch. Get early access, product updates, and occasional invites to pilot
                programs.
              </p>
            </div>
            <div className="px-1 flex flex-col w-full self-stretch">
              <InputForm
                buttonCopy={{ idle: "Join Waitlist", success: "You're on the list!", loading: "Joining..." }}
                formAction={submitWaitlistEmail}
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
          </WaitlistWrapper>
        </div>
      </section>
    </>
  )
}
// Auxiliary sections/components removed to keep to three full-screen sections as requested


