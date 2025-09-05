import type React from "react"
import { EmployerLayout } from "@/components/employer/employer-layout"

export default function EmployerLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <EmployerLayout>{children}</EmployerLayout>
}
