import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HybridAdvantage() {
    const advantages = [
        "On-chain salary execution",
        "Transparent fee structure",
        "Encrypted employee data",
        "Attendance + analytics",
        "Private data storage",
        "Future-ready compliance",
    ]

    return (
        <section className="min-h-[95vh] flex items-center justify-center py-20 bg-gray-200">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-[#112a45] mb-8 pl-4">The hybrid advantage</h2>

                <div className="bg-gray-100 rounded-3xl p-8 md:p-12 max-w-lg shadow-sm">
                    <ul className="space-y-6 mb-8">
                        {advantages.map((advantage, index) => (
                            <li key={index} className="flex items-center gap-3 text-[#112a45]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#112a45]" />
                                {advantage}
                            </li>
                        ))}
                    </ul>

                    <Button asChild size="lg" className="w-full bg-[#2ea043] hover:bg-[#268538] text-white font-bold px-8 py-6 h-auto rounded-md uppercase tracking-wide">
                        <Link href="/waitlist">Explore Hybrid Payroll</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
