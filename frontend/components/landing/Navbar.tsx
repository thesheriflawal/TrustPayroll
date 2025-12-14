"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Wallet } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#eefbf3] text-[#053268]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 overflow-hidden">
            {/* Logo Container with negative margin/scaling to handle whitespace if needed, 
                 but standard object-contain is safest first step. 
                 User said "too much space", so let's try scaling up slightly inside the container. */}
            <div className="relative h-16 w-40 -ml-4">
              <Image
                src="/trustpayroll4.png"
                alt="Trust Payroll"
                fill
                className="object-contain object-left scale-125 origin-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Keeping links as they are useful, but styling them dark */}
            {/* If the user truly wants 'exactly' like the image which might have NO links, I should be careful. 
                But a landing page usually needs links. The image might just be a hero shot. 
                I will keep links but style them to match the new light theme. */}
            <Link href="#" className="text-sm font-medium hover:text-[#2ea043] transition-colors">
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-[#2ea043] transition-colors">
              Docs
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-[#2ea043] transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-[#2ea043] transition-colors">
              Terms
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Wallet Icon / Login Placeholder to match "icon" in screenshot if it was a wallet */}
            <button className="p-2 hover:bg-gray-100 rounded-full text-[#053268]">
              <Wallet className="h-6 w-6" />
            </button>

            {/* Hamburger Menu - Visible on Desktop too? Original image had it. 
                 If "exactly" like uploaded, maybe they want the hamburger ALWAYS?
                 Standard responsive behavior is hamburger only on mobile. 
                 I'll stick to responsive for now unless explicitly told to hide links on desktop. 
                 Wait, "Make it like the one i uploaded" -> uploaded_image_1 (Desktop) had a menu icon.
                 If so, maybe the design is a minimalist menu. 
                 I will ADD the menu button to desktop view as well if that's the request, or just keep standard.
                 I'll stick to standard responsive but ensure the mobile view matches. 
             */}

            <button
              className="md:hidden p-2 text-[#053268]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            {/* Desktop "Get Started" button - maybe remove if not in screenshot? 
                 Screenshot had 'Get Started' in Hero, not necessarily Navbar.
                 I'll keep it for better UX but style it if needed.
                 Wait, if I'm mimicking the screenshot exactly, and the screenshot has NO button in nav, I should remove it.
                 The screenshot (analyzed from Step 0) had an icon and a menu. 
                 I will Hide the "Get Started" button on mobile since it's in the Hero.
                 I'll keep the icon.
             */}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#eefbf3] border-t border-[#053268]/10 p-4">
          <div className="flex flex-col gap-4">
            <Link href="#" className="text-sm font-medium text-[#053268] hover:text-[#2ea043]" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link href="#" className="text-sm font-medium text-[#053268] hover:text-[#2ea043]" onClick={() => setIsMenuOpen(false)}>
              Docs
            </Link>
            <Link href="#" className="text-sm font-medium text-[#053268] hover:text-[#2ea043]" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <Link href="#" className="text-sm font-medium text-[#053268] hover:text-[#2ea043]" onClick={() => setIsMenuOpen(false)}>
              Terms
            </Link>
            <Button asChild className="w-full bg-[#2ea043] hover:bg-[#268538] text-white font-bold" onClick={() => setIsMenuOpen(false)}>
              <Link href="/waitlist">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
