"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#053268] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
           <div className="relative h-8 w-32">
             <Image 
                src="/trustpayroll.png" 
                alt="Trust Payroll" 
                fill
                className="object-contain object-left"
                priority
             />
           </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-sm font-medium hover:text-green-400 transition-colors">
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-green-400 transition-colors">
              Docs
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-green-400 transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-green-400 transition-colors">
              Terms
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-[#053268]">
               <Link href="/waitlist">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#053268] border-t border-white/10 p-4">
          <div className="flex flex-col gap-4">
            <Link href="#" className="text-sm font-medium hover:text-green-400" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-green-400" onClick={() => setIsMenuOpen(false)}>
              Docs
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-green-400" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-green-400" onClick={() => setIsMenuOpen(false)}>
              Terms
            </Link>
             <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white font-bold" onClick={() => setIsMenuOpen(false)}>
               <Link href="/waitlist">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
