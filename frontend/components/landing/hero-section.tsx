"use client";

import { Button } from "@/components/ui/button";
import { WalletConnect } from "@/components/wallet-connect";
import { useWeb3 } from "@/lib/web3-provider";
import { useUserRole } from "@/hooks/use-user-role";
import { ArrowRight, Clock, Shield, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const { isConnected } = useWeb3();
  const { role } = useUserRole();
  const router = useRouter();

  const handleGetStarted = () => {
    if (!isConnected) {
      return; // WalletConnect will handle this
    }

    if (role && role !== "unregistered") {
      // Redirect to appropriate dashboard
      switch (role) {
        case "admin":
          router.push("/admin");
          break;
        case "employer":
          router.push("/employer");
          break;
        case "employee":
          router.push("/employee");
          break;
      }
    } else {
      // Go to dashboard router for role selection
      router.push("/dashboard");
    }
  };

  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Stream Salaries Daily with{" "}
            <span className="text-primary">Blockchain Precision</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl leading-7 sm:leading-8 text-muted-foreground text-pretty max-w-3xl mx-auto">
            Revolutionary platform where organizations pay employees daily based
            on verified attendance. Transparent, automated, and powered by Web3
            technology.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
            {isConnected ? (
              <Button
                onClick={handleGetStarted}
                className="flex items-center gap-2 w-full sm:w-auto min-w-[140px]"
              >
                {role && role !== "unregistered"
                  ? "Go to Dashboard"
                  : "Get Started"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <div className="w-full sm:w-auto">
                <WalletConnect />
              </div>
            )}
            <a
              href="https://github.com/thesheriflawal/TrustPayroll"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent w-full sm:w-auto min-w-[120px]"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>

        <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 xl:mt-24 max-w-6xl">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            <div className="relative pl-12 sm:pl-16">
              <dt className="text-base sm:text-lg font-semibold leading-7 text-foreground">
                <div className="absolute left-0 top-0 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary">
                  <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
                </div>
                Daily Payments
              </dt>
              <dd className="mt-2 text-sm sm:text-base leading-6 sm:leading-7 text-muted-foreground">
                Employees get paid every day they show up to work. No more
                waiting for monthly salaries.
              </dd>
            </div>
            <div className="relative pl-12 sm:pl-16">
              <dt className="text-base sm:text-lg font-semibold leading-7 text-foreground">
                <div className="absolute left-0 top-0 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-accent">
                  <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-accent-foreground" />
                </div>
                Verified Attendance
              </dt>
              <dd className="mt-2 text-sm sm:text-base leading-6 sm:leading-7 text-muted-foreground">
                Secure attendance tracking with unique daily codes ensures
                accurate payment calculations.
              </dd>
            </div>
            <div className="relative pl-12 sm:pl-16 sm:col-span-2 lg:col-span-1">
              <dt className="text-base sm:text-lg font-semibold leading-7 text-foreground">
                <div className="absolute left-0 top-0 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-chart-3">
                  <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                Blockchain Powered
              </dt>
              <dd className="mt-2 text-sm sm:text-base leading-6 sm:leading-7 text-muted-foreground">
                Transparent, immutable records with smart contract automation
                for trust and efficiency.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
