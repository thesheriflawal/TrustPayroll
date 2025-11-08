"use client"

import { Toaster as Sonner, ToasterProps } from "sonner"

// Permanent dark mode: hardcode theme to 'dark' for the Sonner Toaster.
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={"dark"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
