import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="flex flex-col md:flex-row min-h-[100vh] w-full bg-[#053268] text-white overflow-hidden">

            {/* Left Side: Text Content (2/3 width) */}
            <div className="w-full md:w-2/3 flex items-end justify-center p-8 md:p-16 pb-32 z-10 pt-32 md:pt-0">
                <div className="max-w-2xl text-center">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                        <span className="block text-[#647c94]">The future of</span>
                        <span className="block">payroll is <span className="italic text-[#647c94]">hybrid</span></span>
                    </h1>

                    <p className="text-lg text-[#647c94] mb-8 font-medium">
                        Powered by blockchain for<br />
                        real businesses
                    </p>
                </div>
            </div>

            {/* Right Side: Image and Buttons (1/3 width) */}
            <div className="w-full md:w-1/3 relative min-h-[50vh] md:min-h-auto flex flex-col justify-end group">
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero.png"
                        alt="Hero Image"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Green Overlay */}
                    <div className="absolute inset-0 bg-[#2ea043]/30 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-green-900/20 mix-blend-multiply" />
                </div>

                {/* Buttons Overlay */}
                <div className="relative z-10 flex flex-row items-center justify-center gap-4 p-8 pb-12 w-full">
                    <Button asChild size="lg" className="flex-1 bg-[#2ea043] hover:bg-[#268538] text-white font-bold h-12 rounded-md uppercase tracking-wide border-0">
                        <Link href="/waitlist">Get Started</Link>
                    </Button>

                    <Button asChild size="lg" className="flex-1 bg-[#0b213b] text-white hover:bg-[#112a45] font-bold h-12 rounded-md uppercase tracking-wide border-[#1f3b5a] border">
                        <Link href="#">Watch Demo</Link>
                    </Button>
                </div>
            </div>

        </section>
    )
}
