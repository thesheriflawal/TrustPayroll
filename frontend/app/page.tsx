import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorksSection } from "@/components/landing/how-it-works"
import { StatsSection } from "@/components/landing/stats-section"
import { CTASection } from "@/components/landing/cta-section"
import { RoleRedirect } from "@/components/auth/role-redirect"

export default function HomePage() {
  return (
    <RoleRedirect>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <StatsSection />
          <CTASection />
        </main>
        <footer className="border-t border-border bg-muted/30 py-12">
          <div className="container text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 SalaryStream. Built on blockchain technology for transparent salary management.
            </p>
          </div>
        </footer>
      </div>
    </RoleRedirect>
  )
}
