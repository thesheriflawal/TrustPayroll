"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"
import { ModeToggle } from "@/components/mode-toggle"
import { useUserRole } from "@/hooks/use-user-role"
import { useWeb3 } from "@/lib/web3-provider"
import { Coins, Menu, X } from "lucide-react"
import Link from "next/link"

export function Header() {
  const { role } = useUserRole()
  const { isConnected } = useWeb3()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary">
            <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-foreground hidden xs:block">SalaryStream</span>
          <span className="text-lg font-bold text-foreground xs:hidden">SS</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="h-8 w-8 p-0"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <Button variant="ghost" size="sm" className="text-sm">
            Features
          </Button>
          <Button variant="ghost" size="sm" className="text-sm">
            How it Works
          </Button>
          <Button variant="ghost" size="sm" className="text-sm">
            Documentation
          </Button>
          {isConnected && (
            <>
              {role === "admin" && (
                <Button variant="ghost" size="sm" asChild className="text-sm">
                  <Link href="/admin">Admin Dashboard</Link>
                </Button>
              )}
              {role === "employer" && (
                <Button variant="ghost" size="sm" asChild className="text-sm">
                  <Link href="/employer">Employer Dashboard</Link>
                </Button>
              )}
              {role === "employee" && (
                <Button variant="ghost" size="sm" asChild className="text-sm">
                  <Link href="/employee">Employee Dashboard</Link>
                </Button>
              )}
              {role === "unregistered" && (
                <Button variant="ghost" size="sm" asChild className="text-sm">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              )}
            </>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <ModeToggle />
          <WalletConnect />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="container px-4 sm:px-6 py-4 space-y-4">
            <nav className="flex flex-col space-y-1">
              <Button variant="ghost" size="sm" className="justify-start h-10 px-3">
                Features
              </Button>
              <Button variant="ghost" size="sm" className="justify-start h-10 px-3">
                How it Works
              </Button>
              <Button variant="ghost" size="sm" className="justify-start h-10 px-3">
                Documentation
              </Button>
              {isConnected && (
                <>
                  {role === "admin" && (
                    <Button variant="ghost" size="sm" className="justify-start h-10 px-3" asChild>
                      <Link href="/admin">Admin Dashboard</Link>
                    </Button>
                  )}
                  {role === "employer" && (
                    <Button variant="ghost" size="sm" className="justify-start h-10 px-3" asChild>
                      <Link href="/employer">Employer Dashboard</Link>
                    </Button>
                  )}
                  {role === "employee" && (
                    <Button variant="ghost" size="sm" className="justify-start h-10 px-3" asChild>
                      <Link href="/employee">Employee Dashboard</Link>
                    </Button>
                  )}
                  {role === "unregistered" && (
                    <Button variant="ghost" size="sm" className="justify-start h-10 px-3" asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                  )}
                </>
              )}
            </nav>
            <div className="pt-3 border-t border-border">
              <WalletConnect />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
