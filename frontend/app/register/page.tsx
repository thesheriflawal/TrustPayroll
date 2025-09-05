"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useWeb3 } from "@/lib/web3-provider"
import { useContracts } from "@/hooks/use-contracts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WalletConnect } from "@/components/wallet-connect"
import { Building2, ArrowLeft } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

export default function RegisterPage() {
  const { isConnected } = useWeb3()
  const { contracts } = useContracts()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  const registerOrganization = async () => {
    if (!contracts?.factory || !formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      const tx = await contracts.factory.registerOrganization(formData.name, formData.email)
      await tx.wait()

      toast({
        title: "Success",
        description: "Organization registered successfully",
      })

      router.push("/employer")
    } catch (error) {
      console.error("Error registering organization:", error)
      toast({
        title: "Error",
        description: "Failed to register organization",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Register Organization</CardTitle>
            <CardDescription>Connect your wallet to register your organization</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <WalletConnect />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <Card>
            <CardHeader className="text-center">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Register Your Organization</CardTitle>
              <CardDescription>Create your organization profile to start managing employee salaries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Organization Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your organization name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="email">Organization Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your organization email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <Button
                onClick={registerOrganization}
                disabled={isLoading || !formData.name || !formData.email}
                className="w-full"
              >
                {isLoading ? "Registering..." : "Register Organization"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                By registering, you agree to use the platform responsibly and in accordance with applicable laws.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
