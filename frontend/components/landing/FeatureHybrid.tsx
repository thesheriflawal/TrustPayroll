import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FeatureHybrid() {
    return (
        <section className="min-h-[95vh] flex items-center justify-center py-20 bg-gray-200 text-center">
            <div className="container mx-auto px-4">

                {/* Headline Box */}
                <div className="bg-gray-100 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-sm mb-12">
                    <h2 className="text-2xl md:text-3xl font-medium text-[#112a45]">
                        Trust payroll enables you to manage salaries with blockchain precision and web 2 simplicity
                    </h2>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Card 1 */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-3xl aspect-square w-full shadow-sm"></div>
                        <p className="text-[#112a45] px-4">
                            Every salary streamed and verified on-chain for accountability
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-3xl aspect-square w-full shadow-sm"></div>
                        <p className="text-[#112a45] px-4">
                            Personal data stays encrypted- safe in a Secure database.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-3xl aspect-square w-full shadow-sm"></div>
                        <p className="text-[#112a45] px-4">
                            Switch between crypto and fiat. You decide how payroll flows.
                        </p>
                    </div>
                </div>

                <div className="mt-12">
                    <Button asChild size="lg" className="bg-[#2ea043] hover:bg-[#268538] text-white font-bold px-8 py-6 h-auto rounded-md uppercase tracking-wide">
                        <Link href="/waitlist">Explore the Platform</Link>
                    </Button>
                </div>

            </div>
        </section>
    )
}
