import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    value: "100%",
    label: "Transparent",
    description: "All transactions recorded on blockchain",
  },
  {
    value: "24/7",
    label: "Available",
    description: "Access your earnings anytime, anywhere",
  },
  {
    value: "0%",
    label: "Payment Delays",
    description: "Instant withdrawals when you need them",
  },
  {
    value: "∞",
    label: "Scalable",
    description: "From startups to enterprise organizations",
  },
]

export function StatsSection() {
  return (
    <section className="py-24 sm:py-32 bg-primary/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Trusted by forward-thinking organizations
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            Join the revolution in salary management with blockchain-powered transparency and efficiency.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-card border-border text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-primary">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold text-foreground mb-2">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
