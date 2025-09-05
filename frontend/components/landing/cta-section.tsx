"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WalletConnect } from "@/components/wallet-connect";
import { ArrowRight, Building2, Users } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance">
            Ready to transform your salary management?
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground text-pretty">
            Connect your wallet to get started. Choose your role and begin
            experiencing the future of workplace payments.
          </p>
        </div>

        <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-8 max-w-5xl">
          <Card className="bg-card border-border hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <Building2 className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              </div>
              <CardTitle className="text-xl sm:text-2xl">
                For Organizations
              </CardTitle>
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                Register your company and start managing employee salaries with
                blockchain transparency.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-muted-foreground space-y-2 sm:space-y-3 mb-6 text-left">
                <li className="flex items-center gap-2 sm:gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                  <span>Easy employee onboarding</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                  <span>Automated daily payments</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                  <span>Real-time analytics dashboard</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                  <span>Reduced administrative overhead</span>
                </li>
              </ul>
              <div className="w-full">
                <WalletConnect />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors">
                <Users className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />
              </div>
              <CardTitle className="text-xl sm:text-2xl">
                For Employees
              </CardTitle>
              <CardDescription className="text-sm sm:text-base leading-relaxed">
                Connect your wallet to view contracts, mark attendance, and
                withdraw your daily earnings.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-muted-foreground space-y-2 sm:space-y-3 mb-6 text-left">
                <li className="flex items-center gap-2 sm:gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0"></div>
                  <span>Daily salary access</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0"></div>
                  <span>Transparent earnings tracking</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0"></div>
                  <span>Instant withdrawals</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0"></div>
                  <span>Secure attendance verification</span>
                </li>
              </ul>
              <div className="w-full">
                <WalletConnect />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Need help getting started? Check out our documentation.
          </p>
          <a
            href="https://github.com/thesheriflawal/TrustPayroll"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="flex items-center gap-2 mx-auto bg-transparent hover:bg-muted/50 transition-colors w-full sm:w-auto"
            >
              View Documentation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
