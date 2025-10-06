import { submitWaitlistEmail } from "./lib/actions"
import { InputForm } from "./components/waitlist-form"
import { WaitlistWrapper } from "./components/box"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TrustPayroll - Join the Waitlist",
  description: "Be the first to experience the future of payroll management",
}

export default function WaitlistPage() {
  return (
    <WaitlistWrapper>
      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-12 font-sans">Join the TrustPayroll Waitlist</h1>
        <p className="text-slate-10 text-base leading-relaxed font-serif">
          Be the first to experience the future of payroll management. Sign up now for early access.
        </p>
      </div>
      {/* Form */}
      <div className="px-1 flex flex-col w-full self-stretch">
        <InputForm
          buttonCopy={{
            idle: "Join Waitlist",
            success: "You're on the list!",
            loading: "Joining...",
          }}
          formAction={submitWaitlistEmail}
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
    </WaitlistWrapper>
  )
}


