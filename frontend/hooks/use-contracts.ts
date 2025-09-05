"use client"

import { useMemo } from "react"
import { ethers } from "ethers"
import { useWeb3 } from "@/lib/web3-provider"
import { CONTRACT_ADDRESSES } from "@/lib/contracts"
import {
  FACTORY_ABI,
  ADMIN_DASHBOARD_ABI,
  EMPLOYER_DASHBOARD_ABI,
  EMPLOYEE_DASHBOARD_ABI,
  SALARY_CONTRACT_ABI,
} from "@/lib/contract-abis"

export function useContracts() {
  const { provider, signer } = useWeb3()

  const contracts = useMemo(() => {
    if (!provider || !signer) return null

    return {
      factory: new ethers.Contract(CONTRACT_ADDRESSES.FACTORY, FACTORY_ABI, signer),
      adminDashboard: new ethers.Contract(CONTRACT_ADDRESSES.ADMIN_DASHBOARD, ADMIN_DASHBOARD_ABI, signer),
      employerDashboard: new ethers.Contract(CONTRACT_ADDRESSES.EMPLOYER_DASHBOARD, EMPLOYER_DASHBOARD_ABI, signer),
      employeeDashboard: new ethers.Contract(CONTRACT_ADDRESSES.EMPLOYEE_DASHBOARD, EMPLOYEE_DASHBOARD_ABI, signer),
    }
  }, [provider, signer])

  const getSalaryContract = (contractAddress: string) => {
    if (!signer) return null
    return new ethers.Contract(contractAddress, SALARY_CONTRACT_ABI, signer)
  }

  return {
    contracts,
    getSalaryContract,
  }
}
