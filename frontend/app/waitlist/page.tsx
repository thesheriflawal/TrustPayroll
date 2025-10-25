import type { Metadata } from "next"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu"
import { submitWaitlistEmail } from "./lib/actions"
import { InputForm } from "./components/waitlist-form"
import { WaitlistWrapper } from "./components/box"
import { ScrollToTopOnReload } from "./components/scroll-to-top"

export const metadata: Metadata = {
  title: "TrustPayroll – Salary Streaming for Africa | Join the Waitlist",
  description:
    "TrustPayroll is a payroll platform for African SMEs and gig workers. Only fiat funding (NGN). Join the waitlist to get early access.",
}

export default function WaitlistPage() {
  return (
    <>
      <ScrollToTopOnReload />
      {/* Top nav as its own fixed section */}
      <section aria-label="Primary navigation" className="fixed top-0 left-0 right-0 z-[2] pointer-events-none">
        <nav className="mx-auto max-w-6xl px-4 flex justify-end md:justify-center mt-4 pointer-events-auto">
          {/* Mobile dropdown */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full border border-emerald-300/50 dark:border-white/10 bg-white/30 dark:bg-white/10 backdrop-blur-md shadow-sm px-4 py-2 text-xs text-zinc-800 dark:text-white/90 hover:bg-white/40 dark:hover:bg-white/15 transition-all duration-300">
                Menu
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-white backdrop-blur-md border-emerald-200/50 dark:border-white/40 transition-colors duration-300">
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
          <div className="hidden md:flex rounded-full border border-emerald-300/50 dark:border-white/10 bg-white/30 dark:bg-white/10 backdrop-blur-md shadow-sm px-2 py-1 text-xs text-zinc-800 dark:text-white/80 gap-1 transition-all duration-300">
            <a className="px-3 py-1 rounded-full hover:bg-white/40 dark:hover:bg-white/10 transition-colors" href="#overview">Overview</a>
            <a className="px-3 py-1 rounded-full hover:bg-white/40 dark:hover:bg-white/10 transition-colors" href="#details">Details</a>
            <a className="px-3 py-1 rounded-full bg-[#27A74A] text-white hover:opacity-90 transition-colors" href="#join">Join</a>
          </div>
        </nav>
      </section>
        {/* Mobile spacer below fixed header */}
        <div className="block md:hidden h-16" />
      {/* Section 1: Hero (~80vh), centered */}
      <section className="relative min-h-[80dvh] grid place-items-center" id="overview">
        <div className="mx-auto max-w-5xl text-center flex flex-col items-center gap-6 px-2">
          <div className="flex items-center gap-2 rounded-full border border-white/20 dark:border-white/20 bg-white/10 dark:bg-white/5 px-3 py-1 text-xs text-zinc-800 dark:text-white/80 backdrop-blur-md w-fit transition-all duration-300">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#27A74A]" />
            Launching soon – Early access open
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-white transition-colors duration-300">
            Payroll that moves at the speed of your business
          </h1>
          <p className="text-zinc-700 dark:text-white/80 text-base md:text-lg max-w-3xl transition-colors duration-300">
            TrustPayroll is a salary streaming platform for African SMEs and the freelance economy. Pay via bank in real time.
            Only fiat funding (NGN).
          </p>
          <div className="text-zinc-600 dark:text-white/70 text-sm transition-colors duration-300">
            FIAT rails (NGN) • Instant payouts • Attendance-aware streaming
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-4">
            <div className="rounded-xl bg-white/40 dark:bg-black/40 p-4 border border-emerald-200/50 dark:border-white/10 hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 text-left backdrop-blur-lg">
              <p className="text-zinc-600 dark:text-white/70 text-xs transition-colors duration-300">Funding</p>
              <p className="text-zinc-900 dark:text-white font-medium transition-colors duration-300">NGN (Fiat only)</p>
            </div>
            <div className="rounded-xl bg-white/40 dark:bg-black/40 p-4 border border-emerald-200/50 dark:border-white/10 hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 text-left backdrop-blur-lg">
              <p className="text-zinc-600 dark:text-white/70 text-xs transition-colors duration-300">Payouts</p>
              <p className="text-zinc-900 dark:text-white font-medium transition-colors duration-300">Instant • 24/7</p>
            </div>
            <div className="rounded-xl bg-white/40 dark:bg-black/40 p-4 border border-emerald-200/50 dark:border-white/10 hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 text-left backdrop-blur-lg">
              <p className="text-zinc-600 dark:text-white/70 text-xs transition-colors duration-300">Attendance</p>
              <p className="text-zinc-900 dark:text-white font-medium transition-colors duration-300">Auto • Manual • CSV</p>
            </div>
            <div className="rounded-xl bg-white/40 dark:bg-black/40 p-4 border border-emerald-200/50 dark:border-white/10 hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-300 text-left backdrop-blur-lg">
              <p className="text-zinc-600 dark:text-white/70 text-xs transition-colors duration-300">Visibility</p>
              <p className="text-zinc-900 dark:text-white font-medium transition-colors duration-300">Liabilities • Streams</p>
            </div>
          </div>
        </div>
      </section>
      {/* Section 2: Details (merged content) */}
      <section id="details" className="py-12">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 px-2">
          <div className="rounded-2xl border border-emerald-200/50 dark:border-white/10 bg-white/50 dark:bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/60 dark:hover:bg-white/15 shadow-lg dark:shadow-none">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white transition-colors duration-300">For Employers</h3>
            <p className="text-zinc-700 dark:text-white/80 mt-2 transition-colors duration-300">
              Create your organization, add staff or freelancers, set salaries and work cycles, and start streaming payments. Fund once in NGN, TrustPayroll handles the rest.
            </p>
            <ul className="mt-4 grid gap-2 text-zinc-700 dark:text-white/80 text-sm transition-colors duration-300">
              <li>• Add individually or via CSV</li>
              <li>• Attendance defaults: mark all, remove absentees, or manual</li>
              <li>• Monitor remaining liability vs paid out</li>
              <li>• Optional employer liquidity/loans</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-200/50 dark:border-white/10 bg-white/50 dark:bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/60 dark:hover:bg-white/15 shadow-lg dark:shadow-none">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white transition-colors duration-300">For Employees & Contractors</h3>
            <p className="text-zinc-700 dark:text-white/80 mt-2 transition-colors duration-300">
              Watch earnings accrue live based on attendance and work done. Withdraw anytime, straight to bank (NGN).
            </p>
            <ul className="mt-4 grid gap-2 text-zinc-700 dark:text-white/80 text-sm transition-colors duration-300">
              <li>• Live balance: earned-to-date and withdrawable</li>
              <li>• Instant bank transfers</li>
              <li>• Transparent attendance and cycles</li>
              <li>• Join Organization via link or mail</li>
            </ul>
          </div>
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-emerald-200/50 dark:border-white/10 bg-white/50 dark:bg-white/10 p-6 backdrop-blur-xl hover:bg-white/60 dark:hover:bg-white/15 transition-all duration-300 shadow-lg dark:shadow-none">
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-white/70 transition-colors duration-300">
                <span className="inline-block h-2 w-2 rounded-full bg-[#27A74A]" /> Path A – Fiat Web2
              </div>
              <ul className="mt-3 grid gap-2 text-zinc-700 dark:text-white/80 text-sm transition-colors duration-300">
                <li>• Email/Phone signup with OTP verification</li>
                <li>• KYC for employers (BVN, NIN, CAC)</li>
                <li>• NGN salary wallet and instant bank payouts</li>
                <li>• Attendance-aware daily accruals</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-200/50 dark:border-white/10 bg-white/50 dark:bg-white/10 p-6 backdrop-blur-xl hover:bg-white/60 dark:hover:bg-white/15 transition-all duration-300 shadow-lg dark:shadow-none">
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-white/70 transition-colors duration-300">
                <span className="inline-block h-2 w-2 rounded-full bg-[#27A74A]" /> Path B – Web3
              </div>
              <ul className="mt-3 grid gap-2 text-zinc-700 dark:text-white/80 text-sm transition-colors duration-300">
                <li>• Connect wallet</li>
                <li>• No KYC required for crypto streaming</li>
                <li>• crypto salary streams</li>
                <li>• On-chain dashboards for live balances</li>
              </ul>
            </div>
          </div>
          {/* Features grid (MVP) */}
          <div className="lg:col-span-2 space-y-6 mt-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-white transition-colors duration-300">Built for launch. Designed to scale.</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl border border-emerald-200/50 dark:border-white/10 bg-white/50 dark:bg-white/10 p-5 backdrop-blur-xl hover:bg-white/60 dark:hover:bg-white/15 transition-all duration-300 shadow-lg dark:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-[#27A74A] font-medium">Feature</p>
                <h3 className="mt-1 font-semibold text-zinc-900 dark:text-white transition-colors duration-300">Onboarding</h3>
                <p className="mt-2 text-zinc-700 dark:text-white/80 text-sm leading-relaxed transition-colors duration-300">Employers, employees, and web3 users can get started in minutes.</p>
              </div>
              <div className="rounded-xl border border-emerald-200/50 dark:border-white/10 bg-white/50 dark:bg-white/10 p-5 backdrop-blur-xl hover:bg-white/60 dark:hover:bg-white/15 transition-all duration-300 shadow-lg dark:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-[#27A74A] font-medium">Feature</p>
                <h3 className="mt-1 font-semibold text-zinc-900 dark:text-white transition-colors duration-300">Wallets</h3>
                <p className="mt-2 text-zinc-700 dark:text-white/80 text-sm leading-relaxed transition-colors duration-300">NGN wallets for fiat funding.</p>
              </div>
              <div className="rounded-xl border border-emerald-200/50 dark:border-white/10 bg-white/50 dark:bg-white/10 p-5 backdrop-blur-xl hover:bg-white/60 dark:hover:bg-white/15 transition-all duration-300 shadow-lg dark:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-[#27A74A] font-medium">Feature</p>
                <h3 className="mt-1 font-semibold text-zinc-900 dark:text-white transition-colors duration-300">Streaming</h3>
                <p className="mt-2 text-zinc-700 dark:text-white/80 text-sm leading-relaxed transition-colors duration-300">Real-time salary accruals; employees see live earnings.</p>
              </div>
              <div className="rounded-xl border border-emerald-200/50 dark:border-white/10 bg-white/50 dark:bg-white/10 p-5 backdrop-blur-xl hover:bg-white/60 dark:hover:bg-white/15 transition-all duration-300 shadow-lg dark:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-[#27A74A] font-medium">Feature</p>
                <h3 className="mt-1 font-semibold text-zinc-900 dark:text-white transition-colors duration-300">Attendance</h3>
                <p className="mt-2 text-zinc-700 dark:text-white/80 text-sm leading-relaxed transition-colors duration-300">Flexible defaults and manual overrides; CSV import supported.</p>
              </div>
              <div className="rounded-xl border border-emerald-200/50 dark:border-white/10 bg-white/50 dark:bg-white/10 p-5 backdrop-blur-xl hover:bg-white/60 dark:hover:bg-white/15 transition-all duration-300 shadow-lg dark:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-[#27A74A] font-medium">Feature</p>
                <h3 className="mt-1 font-semibold text-zinc-900 dark:text-white transition-colors duration-300">Withdrawals</h3>
                <p className="mt-2 text-zinc-700 dark:text-white/80 text-sm leading-relaxed transition-colors duration-300">Instant payouts to bank (NGN).</p>
              </div>
              <div className="rounded-xl border border-emerald-200/50 dark:border-white/10 bg-white/50 dark:bg-white/10 p-5 backdrop-blur-xl hover:bg-white/60 dark:hover:bg-white/15 transition-all duration-300 shadow-lg dark:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-[#27A74A] font-medium">Feature</p>
                <h3 className="mt-1 font-semibold text-zinc-900 dark:text-white transition-colors duration-300">Employee Loans</h3>
                <p className="mt-2 text-zinc-700 dark:text-white/80 text-sm leading-relaxed transition-colors duration-300">Optional salary advances or loans for employees.</p>
              </div>
              <div className="rounded-xl border border-emerald-200/50 dark:border-white/10 bg-white/50 dark:bg-white/10 p-5 backdrop-blur-xl hover:bg-white/60 dark:hover:bg-white/15 transition-all duration-300 shadow-lg dark:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-[#27A74A] font-medium">Feature</p>
                <h3 className="mt-1 font-semibold text-zinc-900 dark:text-white transition-colors duration-300">Employer Loans</h3>
                <p className="mt-2 text-zinc-700 dark:text-white/80 text-sm leading-relaxed transition-colors duration-300">Optional liquidity for employers to smooth cash flow.</p>
              </div>
              <div className="rounded-xl border border-emerald-200/50 dark:border-white/10 bg-white/50 dark:bg-white/10 p-5 backdrop-blur-xl hover:bg-white/60 dark:hover:bg-white/15 transition-all duration-300 shadow-lg dark:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-[#27A74A] font-medium">Feature</p>
                <h3 className="mt-1 font-semibold text-zinc-900 dark:text-white transition-colors duration-300">Observability</h3>
                <p className="mt-2 text-zinc-700 dark:text-white/80 text-sm leading-relaxed transition-colors duration-300">Metrics on remaining liability vs paid out, in real time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: CTA Waitlist (compact) */}
      <section id="join" className="py-16 md:py-16 px-2 flex items-center justify-center min-h-[100dvh] md:min-h-0">
        <div className="w-full max-w-xl h-full">
          <WaitlistWrapper>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white transition-colors duration-300">Join the TrustPayroll waitlist</h2>
              <p className="text-zinc-700 dark:text-white/80 text-base leading-relaxed transition-colors duration-300">
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


