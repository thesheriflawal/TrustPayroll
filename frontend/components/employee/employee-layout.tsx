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
import { AlertTriangle, Users } from "lucide-react"

interface EmployeeLayoutProps {
  children: React.ReactNode
}

export function EmployeeLayout({ children }: EmployeeLayoutProps) {
  const { isConnected, account } = useWeb3()
  const { role, isLoading } = useUserRole()
  const { contracts } = useContracts()
  const router = useRouter()
  const [hasContracts, setHasContracts] = useState(false)
  const [checkingContracts, setCheckingContracts] = useState(true)

  useEffect(() => {
    const checkEmployeeContracts = async () => {
      if (isConnected && contracts && account && !isLoading) {
        try {
          setCheckingContracts(true)
          const employeeContracts = await contracts.employeeDashboard.getEmployeeContracts(account)
          const pendingApprovals = await contracts.employeeDashboard.getPendingApprovals(account)
          setHasContracts(employeeContracts.length > 0 || pendingApprovals.length > 0)
        } catch (error) {
          console.error("Error checking employee contracts:", error)
          setHasContracts(false)
        } finally {
          setCheckingContracts(false)
        }
      }
    }

    checkEmployeeContracts()
  }, [isConnected, contracts, account, isLoading])

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Employee Dashboard</CardTitle>
            <CardDescription>Connect your wallet to access your employee dashboard</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <WalletConnect />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading || checkingContracts) {
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

  if (role === "employer") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You are registered as an employer. Please use the employer dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push("/employer")}>Go to Employer Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!hasContracts && role === "unregistered") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <CardTitle>No Contracts Found</CardTitle>
            <CardDescription>
              You don't have any salary contracts yet. Ask your employer to create a contract for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Once an employer creates a salary contract for your wallet address, you'll be able to access this
              dashboard.
            </p>
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
