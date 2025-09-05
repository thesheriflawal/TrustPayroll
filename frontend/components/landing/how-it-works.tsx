import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Organization Registration",
    description: "Companies register on the platform and set up their organization profile with basic details.",
    details: "Provide company name, email, and connect your wallet to get started with employee management.",
  },
  {
    step: "02",
    title: "Employee Onboarding",
    description: "Add employees to the system with their wallet addresses and salary details.",
    details: "Set daily salary amounts, probation periods, and contract duration. Employees approve their contracts.",
  },
  {
    step: "03",
    title: "Daily Attendance",
    description: "Generate unique attendance codes daily for employees to verify their presence.",
    details: "Employers create codes, employees input them to mark attendance. All records are stored on blockchain.",
  },
  {
    step: "04",
    title: "Automatic Payments",
    description: "Employees can withdraw their earned salary anytime based on verified attendance.",
    details: "Smart contracts calculate earnings automatically. Instant withdrawals with transparent calculations.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            How SalaryStream Works
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            Simple, transparent, and automated. Get started in minutes and transform how your organization handles
            salary payments.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-start gap-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                        <CardDescription className="text-base text-muted-foreground">
                          {step.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-18">
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.details}</p>
                  </CardContent>
                </Card>

                {index < steps.length - 1 && (
                  <div className="flex justify-center mt-6 mb-2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
