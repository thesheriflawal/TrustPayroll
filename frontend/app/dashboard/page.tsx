"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWeb3 } from "@/lib/web3-provider"
import { useUserRole } from "@/hooks/use-user-role"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"
import { Building2, Users, Shield, UserPlus } from "lucide-react"

export default function DashboardRouter() {
  const { isConnected, isCorrectNetwork } = useWeb3()
  const { role, isLoading } = useUserRole()
  const router = useRouter()

  useEffect(() => {
    if (!isConnected || !isCorrectNetwork || isLoading) {
      return
    }

    // Auto-redirect based on user role
    switch (role) {
      case "admin":
        router.push("/admin")
        break
      case "employer":
        router.push("/employer")
        break
      case "employee":
        router.push("/employee")
        break
      default:
        // Stay on this page for unregistered users
        break
    }
  }, [role, isConnected, isCorrectNetwork, isLoading, router])

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Access Dashboard</CardTitle>
            <CardDescription>Connect your wallet to access your personalized dashboard</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <WalletConnect />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isCorrectNetwork) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Wrong Network</CardTitle>
            <CardDescription>Please switch to Lisk Sepolia network to continue</CardDescription>
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
            <p className="text-muted-foreground">Detecting your role...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show role selection for unregistered users
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Welcome to SalaryStream</h1>
          <p className="text-lg text-muted-foreground mb-12">Choose your role to get started with the platform</p>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/admin")}>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Platform Admin</CardTitle>
                <CardDescription>Oversee all organizations and manage platform operations</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• View platform statistics</li>
                  <li>• Monitor all organizations</li>
                  <li>• Oversee contracts and payments</li>
                  <li>• Access comprehensive analytics</li>
                </ul>
                <Button className="w-full">Access Admin Dashboard</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/register")}>
              <CardHeader className="text-center">
                <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Organization</CardTitle>
                <CardDescription>Register your company and manage employee salaries</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• Register your organization</li>
                  <li>• Add and manage employees</li>
                  <li>• Generate attendance codes</li>
                  <li>• Track salary payments</li>
                </ul>
                <Button className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register Organization
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <CardTitle>Employee</CardTitle>
                <CardDescription>Access your salary contracts and manage attendance</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li>• View salary contracts</li>
                  <li>• Mark daily attendance</li>
                  <li>• Withdraw earned salary</li>
                  <li>• Track earnings history</li>
                </ul>
                <Button variant="outline" className="w-full bg-transparent" disabled>
                  Wait for Employer Invitation
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Ask your employer to create a contract for your wallet address
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">Need help getting started?</p>
            <Button variant="outline" onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
