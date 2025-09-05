"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useWeb3 } from "@/lib/web3-provider"
import { useUserRole, type UserRole } from "@/hooks/use-user-role"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"
import { AlertTriangle, Shield } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
  requireConnection?: boolean
}

export function AuthGuard({ children, allowedRoles = [], redirectTo = "/", requireConnection = true }: AuthGuardProps) {
  const { isConnected, isCorrectNetwork } = useWeb3()
  const { role, isLoading } = useUserRole()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!requireConnection) {
      setIsAuthorized(true)
      return
    }

    if (!isConnected) {
      setIsAuthorized(false)
      return
    }

    if (!isCorrectNetwork) {
      setIsAuthorized(false)
      return
    }

    if (isLoading) {
      return
    }

    if (allowedRoles.length === 0) {
      // No role restrictions, just need to be connected
      setIsAuthorized(true)
      return
    }

    if (role && allowedRoles.includes(role)) {
      setIsAuthorized(true)
    } else {
      setIsAuthorized(false)
      // Auto-redirect based on user role
      if (role === "admin") {
        router.push("/admin")
      } else if (role === "employer") {
        router.push("/employer")
      } else if (role === "employee") {
        router.push("/employee")
      } else {
        router.push(redirectTo)
      }
    }
  }, [isConnected, isCorrectNetwork, role, isLoading, allowedRoles, redirectTo, requireConnection, router])

  // Show loading state
  if (requireConnection && (isLoading || (!isConnected && !isAuthorized))) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              {isLoading ? "Verifying your access..." : "Connect your wallet to continue"}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {isLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            ) : (
              <WalletConnect />
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show network error
  if (requireConnection && isConnected && !isCorrectNetwork) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle>Wrong Network</CardTitle>
            <CardDescription>Please switch to Lisk Sepolia network to use this application</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <WalletConnect />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show unauthorized access
  if (requireConnection && !isAuthorized && !isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this page</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push("/")}>Return to Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
