import type React from "react"
import { EmployeeLayout } from "@/components/employee/employee-layout"

export default function EmployeeLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <EmployeeLayout>{children}</EmployeeLayout>
}
