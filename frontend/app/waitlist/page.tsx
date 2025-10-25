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
              <DropdownMenuTrigger className="rounded-full border border-white/10 bg-white/10 backdrop-blur-md shadow-sm px-4 py-2 text-xs text-white/90 hover:bg-white/15 transition">
                Menu
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="bg-zinc-900/95 text-white backdrop-blur-md border-white/20">
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
            <a className="px-3 py-1 rounded-full bg-[#27A74A] text-white hover:opacity-90 transition-colors" href="#join">Join</a>
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
            TrustPayroll is a salary streaming platform for African SMEs and the freelance economy. Pay via bank in real time.
            Only fiat funding (NGN).
          </p>
          <div className="text-white/70 text-sm">
            FIAT rails (NGN) • Instant payouts • Attendance-aware streaming
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-4">
            <div className="rounded-xl bg-black/40 p-4 border border-white/10 hover:bg-black/50 transition text-left backdrop-blur-sm">
              <p className="text-white/70 text-xs">Funding</p>
              <p className="text-white font-medium">NGN (Fiat only)</p>
            </div>
            <div className="rounded-xl bg-black/40 p-4 border border-white/10 hover:bg-black/50 transition text-left backdrop-blur-sm">
              <p className="text-white/70 text-xs">Payouts</p>
              <p className="text-white font-medium">Instant • 24/7</p>
            </div>
            <div className="rounded-xl bg-black/40 p-4 border border-white/10 hover:bg-black/50 transition text-left backdrop-blur-sm">
              <p className="text-white/70 text-xs">Attendance</p>
              <p className="text-white font-medium">Auto • Manual • CSV</p>
            </div>
            <div className="rounded-xl bg-black/40 p-4 border border-white/10 hover:bg-black/50 transition text-left backdrop-blur-sm">
              <p className="text-white/70 text-xs">Visibility</p>
              <p className="text-white font-medium">Liabilities • Streams</p>
            </div>
          </div>
        </div>
      </section>
      {/* Section 2: Details - Bento Grid Layout */}
      <section id="details" className="py-12">
        <div className="w-full max-w-6xl mx-auto px-2">
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
            
            {/* Large card - For Employers */}
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-zinc-900/90 to-emerald-950/40 p-8 backdrop-blur-xl hover:border-emerald-500/30 transition-all group shadow-xl">
              <div className="flex flex-col h-full justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                    <span className="text-emerald-400 text-xs font-medium">For Employers</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">
                    Streamline Your Payroll
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed mb-6">
                    Create your organization, add staff or freelancers, set salaries and work cycles, and start streaming payments. Fund once in NGN, TrustPayroll handles the rest.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl bg-black/30 p-4 border border-white/10 hover:border-emerald-500/30 transition-all">
                    <div className="text-emerald-400 text-sm font-medium mb-1">Add Staff</div>
                    <p className="text-white/60 text-xs">Individually or via CSV bulk import</p>
                  </div>
                  <div className="rounded-xl bg-black/30 p-4 border border-white/10 hover:border-emerald-500/30 transition-all">
                    <div className="text-emerald-400 text-sm font-medium mb-1">Attendance</div>
                    <p className="text-white/60 text-xs">Auto mark all or manual control</p>
                  </div>
                  <div className="rounded-xl bg-black/30 p-4 border border-white/10 hover:border-emerald-500/30 transition-all">
                    <div className="text-emerald-400 text-sm font-medium mb-1">Liability</div>
                    <p className="text-white/60 text-xs">Monitor remaining vs paid out</p>
                  </div>
                  <div className="rounded-xl bg-black/30 p-4 border border-white/10 hover:border-emerald-500/30 transition-all">
                    <div className="text-emerald-400 text-sm font-medium mb-1">Liquidity</div>
                    <p className="text-white/60 text-xs">Optional employer loans</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tall card - For Employees */}
            <div className="lg:row-span-2 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-zinc-900/90 to-blue-950/40 p-8 backdrop-blur-xl hover:border-blue-500/30 transition-all group shadow-xl">
              <div className="flex flex-col h-full gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                    <span className="text-blue-400 text-xs font-medium">For Employees</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                    Get Paid Instantly
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    Watch earnings accrue live based on attendance and work done. Withdraw anytime, straight to bank (NGN).
                  </p>
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-white/5 hover:border-blue-500/20 transition-all">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <div className="text-sm text-white/80">Live balance: earned-to-date and withdrawable</div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-white/5 hover:border-blue-500/20 transition-all">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <div className="text-sm text-white/80">Instant bank transfers</div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-white/5 hover:border-blue-500/20 transition-all">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <div className="text-sm text-white/80">Transparent attendance and cycles</div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-white/5 hover:border-blue-500/20 transition-all">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <div className="text-sm text-white/80">Join Organization via link or mail</div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-white/5 hover:border-blue-500/20 transition-all">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <div className="text-sm text-white/80">Optional salary advances or loans</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Path A - Fiat */}
            <div className="md:col-span-1 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-zinc-900/90 to-purple-950/40 p-6 backdrop-blur-xl hover:border-purple-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block h-2 w-2 rounded-full bg-purple-400" />
                <span className="text-purple-400 text-sm font-semibold">Path A – Fiat Web2</span>
              </div>
              <ul className="space-y-2.5 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">•</span>
                  <span>Email/Phone signup with OTP</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">•</span>
                  <span>KYC for employers (BVN, NIN, CAC)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">•</span>
                  <span>NGN salary wallet & instant payouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">•</span>
                  <span>Attendance-aware daily accruals</span>
                </li>
              </ul>
            </div>

            {/* Path B - Web3 */}
            <div className="md:col-span-1 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-zinc-900/90 to-amber-950/40 p-6 backdrop-blur-xl hover:border-amber-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-amber-400 text-sm font-semibold">Path B – Web3</span>
              </div>
              <ul className="space-y-2.5 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>Connect wallet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>No KYC required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>Crypto salary streams</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>On-chain dashboards</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Features - Modern Grid */}
      <section className="py-12">
        <div className="w-full max-w-6xl mx-auto px-2">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">Built for launch. Designed to scale.</h2>
          <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to manage payroll efficiently, from onboarding to instant payouts
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6 backdrop-blur-xl hover:border-emerald-500/30 transition-all shadow-lg hover:shadow-emerald-500/10">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-all">
                <span className="text-emerald-400 text-lg">👋</span>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors">Onboarding</h3>
              <p className="text-white/60 text-sm leading-relaxed">Get started in minutes, no complex setup</p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6 backdrop-blur-xl hover:border-blue-500/30 transition-all shadow-lg hover:shadow-blue-500/10">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-all">
                <span className="text-blue-400 text-lg">💰</span>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">Wallets</h3>
              <p className="text-white/60 text-sm leading-relaxed">NGN wallets for fiat funding</p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6 backdrop-blur-xl hover:border-purple-500/30 transition-all shadow-lg hover:shadow-purple-500/10">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-all">
                <span className="text-purple-400 text-lg">📊</span>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition-colors">Streaming</h3>
              <p className="text-white/60 text-sm leading-relaxed">Real-time salary accruals</p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6 backdrop-blur-xl hover:border-amber-500/30 transition-all shadow-lg hover:shadow-amber-500/10">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-all">
                <span className="text-amber-400 text-lg">✓</span>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-amber-400 transition-colors">Attendance</h3>
              <p className="text-white/60 text-sm leading-relaxed">Flexible tracking with CSV support</p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6 backdrop-blur-xl hover:border-emerald-500/30 transition-all shadow-lg hover:shadow-emerald-500/10">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-all">
                <span className="text-emerald-400 text-lg">⚡</span>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors">Withdrawals</h3>
              <p className="text-white/60 text-sm leading-relaxed">Instant payouts to bank (NGN)</p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6 backdrop-blur-xl hover:border-blue-500/30 transition-all shadow-lg hover:shadow-blue-500/10">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-all">
                <span className="text-blue-400 text-lg">🎯</span>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">Employee Loans</h3>
              <p className="text-white/60 text-sm leading-relaxed">Salary advances for employees</p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6 backdrop-blur-xl hover:border-purple-500/30 transition-all shadow-lg hover:shadow-purple-500/10">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-all">
                <span className="text-purple-400 text-lg">💳</span>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition-colors">Employer Loans</h3>
              <p className="text-white/60 text-sm leading-relaxed">Liquidity to smooth cash flow</p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6 backdrop-blur-xl hover:border-amber-500/30 transition-all shadow-lg hover:shadow-amber-500/10">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-all">
                <span className="text-amber-400 text-lg">📈</span>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-amber-400 transition-colors">Observability</h3>
              <p className="text-white/60 text-sm leading-relaxed">Real-time liability metrics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: CTA Waitlist */}
      <section id="join" className="py-16 md:py-16 px-2 flex items-center justify-center min-h-[100dvh] md:min-h-0">
        <div className="w-full max-w-xl h-full">
          <WaitlistWrapper>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-semibold">Join the TrustPayroll waitlist</h2>
              <p className="text-white/70 text-base leading-relaxed">
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


