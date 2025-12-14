import Link from "next/link"
import Image from "next/image"
import { Twitter, Mail, Globe } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-[#021a35] text-white pt-16 pb-8">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                    <div className="flex flex-col gap-4">
                        <div className="relative h-10 w-40">
                            <Image
                                src="/trustpayroll.png"
                                alt="Trust Payroll"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-sm text-gray-400">Join TrustPayroll.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
                        <div className="flex flex-col gap-2">
                            <Link href="#" className="text-sm text-gray-400 hover:text-white">About</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white">Contact</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white">Fee</Link>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Link href="#" className="text-sm text-gray-400 hover:text-white">Docs</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white">Terms</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="#" className="text-gray-400 hover:text-white">
                        <span className="sr-only">X (Twitter)</span>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                        </svg>
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-white">
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-white">
                        <Globe className="h-5 w-5" />
                        <span className="sr-only">Website</span>
                    </Link>
                </div>

            </div>
        </footer>
    )
}
