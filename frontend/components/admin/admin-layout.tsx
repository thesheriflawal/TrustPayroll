"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useWeb3 } from "@/lib/web3-provider"
import { useUserRole } from "@/hooks/use-user-role"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WalletConnect } from "@/components/wallet-connect"
import { AlertTriangle } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { isConnected } = useWeb3()
  const { role, isLoading } = useUserRole()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // For now, we'll allow any connected wallet to access admin
    // In production, you'd check if the wallet is in an admin list
    if (isConnected && !isLoading) {
      setIsAuthorized(true)
    }
  }, [isConnected, role, isLoading])

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>Connect your wallet to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <WalletConnect />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Verifying admin access...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Note: In production, you'd implement proper admin role checking here
  // For demo purposes, we'll allow access to any connected wallet
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have admin privileges to access this dashboard</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <button onClick={() => router.push("/")} className="text-primary hover:underline">
              Return to Home
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
