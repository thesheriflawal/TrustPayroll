"use client"

import { useState, useEffect } from "react"
import { useWeb3 } from "@/lib/web3-provider"
import { useContracts } from "./use-contracts"

export type UserRole = "admin" | "employer" | "employee" | "unregistered" | null

export function useUserRole() {
  const { account, isConnected } = useWeb3()
  const { contracts } = useContracts()
  const [role, setRole] = useState<UserRole>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const detectRole = async () => {
      if (!account || !contracts || !isConnected) {
        setRole(null)
        return
      }

      setIsLoading(true)
      try {
        // Check if user is an organization (employer)
        const isOrg = await contracts.factory.isOrganization(account)
        if (isOrg) {
          setRole("employer")
          return
        }

        // Check if user has any employee contracts
        const employeeContracts = await contracts.employeeDashboard.getEmployeeContracts(account)
        if (employeeContracts.length > 0) {
          setRole("employee")
          return
        }

        // Check if user has pending approvals (also makes them an employee)
        const pendingApprovals = await contracts.employeeDashboard.getPendingApprovals(account)
        if (pendingApprovals.length > 0) {
          setRole("employee")
          return
        }

        // Default to unregistered
        setRole("unregistered")
      } catch (error) {
        console.error("Error detecting user role:", error)
        setRole("unregistered")
      } finally {
        setIsLoading(false)
      }
    }

    detectRole()
  }, [account, contracts, isConnected])

  return { role, isLoading }
}
