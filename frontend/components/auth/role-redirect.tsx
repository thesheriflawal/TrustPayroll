"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserRole } from "@/hooks/use-user-role"
import { useWeb3 } from "@/lib/web3-provider"

interface RoleRedirectProps {
  children: React.ReactNode
}

export function RoleRedirect({ children }: RoleRedirectProps) {
  const { role, isLoading } = useUserRole()
  const { isConnected, isCorrectNetwork } = useWeb3()
  const router = useRouter()

  useEffect(() => {
    if (!isConnected || !isCorrectNetwork || isLoading) {
      return
    }

    // Only redirect if user has a specific role and is on the home page
    if (role && role !== "unregistered" && window.location.pathname === "/") {
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
      }
    }
  }, [role, isConnected, isCorrectNetwork, isLoading, router])

  return <>{children}</>
}
