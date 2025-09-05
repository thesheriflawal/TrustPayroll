"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useWeb3 } from "@/lib/web3-provider"
import { useUserRole } from "@/hooks/use-user-role"
import { useContracts } from "@/hooks/use-contracts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"
import { AlertTriangle, Building2 } from "lucide-react"

interface EmployerLayoutProps {
  children: React.ReactNode
}

export function EmployerLayout({ children }: EmployerLayoutProps) {
  const { isConnected, account } = useWeb3()
  const { role, isLoading } = useUserRole()
  const { contracts } = useContracts()
  const router = useRouter()
  const [isEmployer, setIsEmployer] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)

  useEffect(() => {
    const checkEmployerStatus = async () => {
      if (isConnected && contracts && account && !isLoading) {
        try {
          const isOrg = await contracts.factory.isOrganization(account)
          setIsEmployer(isOrg)
          if (!isOrg && role !== "employee") {
            setShowRegistration(true)
          }
        } catch (error) {
          console.error("Error checking employer status:", error)
        }
      }
    }

    checkEmployerStatus()
  }, [isConnected, contracts, account, role, isLoading])

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Employer Dashboard</CardTitle>
            <CardDescription>Connect your wallet to access the employer dashboard</CardDescription>
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
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (role === "employee") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You are registered as an employee. Please use the employee dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push("/employee")}>Go to Employee Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showRegistration && !isEmployer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Register Your Organization</CardTitle>
            <CardDescription>You need to register as an organization to access the employer dashboard</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Register your organization on the platform to start managing employee salaries
            </p>
            <Button onClick={() => router.push("/register")}>Register Organization</Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
