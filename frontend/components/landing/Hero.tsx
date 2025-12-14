import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="relative min-h-[100vh] flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-32 bg-[#053268] text-white overflow-hidden">
            {/* Background Elements (Placeholder for abstract shapes if needed) */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green-400 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                    <span className="block text-gray-300">The future of</span>
                    <span className="block">payroll is <span className="italic text-gray-300">hybrid</span></span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10">
                    Powered by blockchain for real businesses
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="w-full sm:w-auto bg-[#2ea043] hover:bg-[#268538] text-white font-bold px-8 h-12 rounded-md uppercase tracking-wide">
                        <Link href="/waitlist">Get Started</Link>
                    </Button>

                    <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-[#0a1e35] border-[#1f3b5a] text-green-400 hover:bg-[#112a45] hover:text-green-300 font-bold px-8 h-12 rounded-md uppercase tracking-wide">
                        <Link href="#">Watch Demo</Link>
                    </Button>
                </div>
            </div>
            {/* Image overlap section could go here if the design demands an image cutting into the next section */}
        </section>
    )
}
