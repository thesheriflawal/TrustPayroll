import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Wallet, BarChart3, CheckCircle, Globe } from "lucide-react"

const features = [
  {
    icon: Building2,
    title: "For Organizations",
    description: "Register your company and manage employee contracts with transparent salary streaming.",
    benefits: ["Easy employee onboarding", "Automated payments", "Real-time analytics", "Reduced HR overhead"],
  },
  {
    icon: Users,
    title: "For Employees",
    description: "Get paid daily for your work with instant access to earned wages.",
    benefits: ["Daily salary access", "Transparent earnings", "No payment delays", "Blockchain security"],
  },
  {
    icon: Wallet,
    title: "Smart Contracts",
    description: "Automated salary distribution based on verified daily attendance.",
    benefits: ["Trustless payments", "Immutable records", "Reduced disputes", "Global accessibility"],
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive insights for both employers and employees.",
    benefits: ["Attendance tracking", "Payment history", "Performance metrics", "Financial planning"],
  },
  {
    icon: CheckCircle,
    title: "Attendance Verification",
    description: "Secure daily codes ensure accurate attendance tracking.",
    benefits: ["Unique daily codes", "Fraud prevention", "Real-time verification", "Mobile friendly"],
  },
  {
    icon: Globe,
    title: "Global Platform",
    description: "Borderless payments powered by blockchain technology.",
    benefits: ["Cross-border payments", "Multiple currencies", "Low transaction fees", "24/7 availability"],
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance">
            Everything you need for modern salary management
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground text-pretty">
            Our platform combines the best of blockchain technology with intuitive design to create a seamless
            experience for both employers and employees.
          </p>
        </div>

        <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:scale-105 h-full"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20 flex-shrink-0">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg sm:text-xl leading-tight">{feature.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-sm sm:text-base leading-relaxed mt-2">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
