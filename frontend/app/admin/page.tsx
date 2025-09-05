"use client"

import { useEffect, useState } from "react"
import { useWeb3 } from "@/lib/web3-provider"
import { useContracts } from "@/hooks/use-contracts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Users, DollarSign, TrendingUp, Search, Eye } from "lucide-react"
import { WalletConnect } from "@/components/wallet-connect"
import { formatEther } from "ethers"

interface PlatformStats {
  totalOrganizations: bigint
  totalEmployees: bigint
  totalSalariesLocked: bigint
  totalWithdrawn: bigint
  activeContracts: bigint
  terminatedContracts: bigint
}

interface OrganizationSummary {
  orgAddress: string
  name: string
  email: string
  totalEmployees: bigint
  totalSalariesLocked: bigint
  activeContracts: bigint
  isActive: boolean
  createdAt: bigint
}

interface EmployeeContractSummary {
  contractAddress: string
  employer: string
  employee: string
  dailySalary: bigint
  attendanceCount: bigint
  totalWithdrawn: bigint
  isActive: boolean
  employeeApproved: boolean
  startDate: bigint
}

export default function AdminDashboard() {
  const { isConnected, account } = useWeb3()
  const { contracts } = useContracts()
  const [stats, setStats] = useState<PlatformStats | null>(null)
  const [organizations, setOrganizations] = useState<OrganizationSummary[]>([])
  const [recentContracts, setRecentContracts] = useState<EmployeeContractSummary[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null)
  const [orgEmployees, setOrgEmployees] = useState<EmployeeContractSummary[]>([])

  const loadPlatformStats = async () => {
    if (!contracts?.adminDashboard) return

    try {
      const platformStats = await contracts.adminDashboard.getPlatformStats()
      setStats(platformStats)
    } catch (error) {
      console.error("Error loading platform stats:", error)
    }
  }

  const loadOrganizations = async () => {
    if (!contracts?.adminDashboard) return

    try {
      const orgs = await contracts.adminDashboard.getAllOrganizationsSummary()
      setOrganizations(orgs)
    } catch (error) {
      console.error("Error loading organizations:", error)
    }
  }

  const loadRecentContracts = async () => {
    if (!contracts?.adminDashboard) return

    try {
      const contracts_data = await contracts.adminDashboard.getRecentContracts(10)
      setRecentContracts(contracts_data)
    } catch (error) {
      console.error("Error loading recent contracts:", error)
    }
  }

  const loadOrgEmployees = async (orgAddress: string) => {
    if (!contracts?.adminDashboard) return

    try {
      const employees = await contracts.adminDashboard.getOrganizationEmployees(orgAddress)
      setOrgEmployees(employees)
    } catch (error) {
      console.error("Error loading organization employees:", error)
    }
  }

  const searchOrganizations = async () => {
    if (!contracts?.adminDashboard || !searchTerm.trim()) {
      loadOrganizations()
      return
    }

    try {
      const results = await contracts.adminDashboard.searchOrganizationByName(searchTerm)
      setOrganizations(results)
    } catch (error) {
      console.error("Error searching organizations:", error)
    }
  }

  useEffect(() => {
    if (isConnected && contracts) {
      setIsLoading(true)
      Promise.all([loadPlatformStats(), loadOrganizations(), loadRecentContracts()]).finally(() => setIsLoading(false))
    }
  }, [isConnected, contracts])

  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.orgAddress.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>Connect your wallet to access the admin dashboard</CardDescription>
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
      <div className="border-b border-border bg-card">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Platform overview and organization management</p>
            </div>
            <WalletConnect />
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Platform Statistics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats ? stats.totalOrganizations.toString() : "0"}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats ? stats.totalEmployees.toString() : "0"}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Locked (ETH)</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats ? Number.parseFloat(formatEther(stats.totalSalariesLocked)).toFixed(4) : "0"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats ? stats.activeContracts.toString() : "0"}</div>
              <p className="text-xs text-muted-foreground">
                {stats ? stats.terminatedContracts.toString() : "0"} terminated
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="organizations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="contracts">Recent Contracts</TabsTrigger>
            <TabsTrigger value="employees">Organization Employees</TabsTrigger>
          </TabsList>

          <TabsContent value="organizations" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Organizations</CardTitle>
                    <CardDescription>All registered organizations on the platform</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Search organizations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                    <Button onClick={searchOrganizations} size="sm">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOrganizations.map((org) => (
                    <div
                      key={org.orgAddress}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{org.name}</h3>
                          <Badge variant={org.isActive ? "default" : "secondary"}>
                            {org.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{org.email}</p>
                        <p className="text-xs text-muted-foreground font-mono">{org.orgAddress}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">{org.totalEmployees.toString()}</span> employees
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{org.activeContracts.toString()}</span> active contracts
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {Number.parseFloat(formatEther(org.totalSalariesLocked)).toFixed(4)} ETH locked
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedOrg(org.orgAddress)
                            loadOrgEmployees(org.orgAddress)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Employees
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Contracts</CardTitle>
                <CardDescription>Latest salary contracts created on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentContracts.map((contract) => (
                    <div
                      key={contract.contractAddress}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">Contract</h3>
                          <Badge variant={contract.isActive ? "default" : "secondary"}>
                            {contract.isActive ? "Active" : "Inactive"}
                          </Badge>
                          {contract.employeeApproved && <Badge variant="outline">Approved</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Employee: {contract.employee.slice(0, 6)}...{contract.employee.slice(-4)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Employer: {contract.employer.slice(0, 6)}...{contract.employer.slice(-4)}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">
                            {Number.parseFloat(formatEther(contract.dailySalary)).toFixed(4)} ETH
                          </span>{" "}
                          daily
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{contract.attendanceCount.toString()}</span> days worked
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {Number.parseFloat(formatEther(contract.totalWithdrawn)).toFixed(4)} ETH withdrawn
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Employees</CardTitle>
                <CardDescription>
                  {selectedOrg
                    ? `Employees for organization: ${selectedOrg.slice(0, 6)}...${selectedOrg.slice(-4)}`
                    : "Select an organization to view its employees"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedOrg ? (
                  <div className="space-y-4">
                    {orgEmployees.map((employee) => (
                      <div
                        key={employee.contractAddress}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">
                              {employee.employee.slice(0, 6)}...{employee.employee.slice(-4)}
                            </h3>
                            <Badge variant={employee.isActive ? "default" : "secondary"}>
                              {employee.isActive ? "Active" : "Inactive"}
                            </Badge>
                            {employee.employeeApproved && <Badge variant="outline">Approved</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground font-mono">
                            Contract: {employee.contractAddress}
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="text-sm">
                            <span className="font-medium">
                              {Number.parseFloat(formatEther(employee.dailySalary)).toFixed(4)} ETH
                            </span>{" "}
                            daily
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">{employee.attendanceCount.toString()}</span> days worked
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {Number.parseFloat(formatEther(employee.totalWithdrawn)).toFixed(4)} ETH withdrawn
                          </div>
                        </div>
                      </div>
                    ))}
                    {orgEmployees.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No employees found for this organization
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Select an organization from the Organizations tab to view its employees
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
