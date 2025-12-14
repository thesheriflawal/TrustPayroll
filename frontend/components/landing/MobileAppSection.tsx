import { Button } from "@/components/ui/button"
import Link from "next/link"

export function MobileAppSection() {
    return (
        <section className="min-h-[95vh] flex items-center justify-center py-20 bg-gray-200">
            <div className="container mx-auto px-4 flex flex-col items-center text-center">

                <h2 className="text-3xl font-bold text-[#112a45] mb-4">Payroll on the go</h2>

                <p className="max-w-md text-[#112a45] mb-8">
                    Manage salaries, approvals and withdrawals from your phone.
                    Web responsive today- native app coming soon.
                </p>

                <Button asChild variant="outline" size="lg" className="bg-transparent border-[#2ea043] text-[#2ea043] hover:bg-[#2ea043] hover:text-white font-bold px-8 py-6 h-auto rounded-full uppercase tracking-wide">
                    <Link href="/waitlist">Join Waitlist for Mobile App</Link>
                </Button>

            </div>
        </section>
    )
}
