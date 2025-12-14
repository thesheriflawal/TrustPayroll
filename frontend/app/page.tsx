import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { FeatureHybrid } from "@/components/landing/FeatureHybrid"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { HybridAdvantage } from "@/components/landing/HybridAdvantage"
import { MobileAppSection } from "@/components/landing/MobileAppSection"
import { Footer } from "@/components/landing/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeatureHybrid />
        <HowItWorks />
        <HybridAdvantage />
        <MobileAppSection />
        <Footer />
      </main>
    </div>
  )
}

