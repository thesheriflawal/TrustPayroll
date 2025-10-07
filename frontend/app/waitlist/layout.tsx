import type React from "react"
import type { Viewport, Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Providers } from "./context"
// import { Header } from "./components/header"
import { MeshGradientComponent } from "./components/mesh-gradient"
import { Toaster } from "./components/ui/sonner"
import "./globals.css"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  preload: true,
})

export const viewport: Viewport = {
  maximumScale: 1,
}

export const metadata: Metadata = {
  generator: "v0.app",
}

export default function WaitlistLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans antialiased max-w-screen min-h-svh bg-slate-1 text-slate-12`}>
        <Providers defaultTheme="system">
          <MeshGradientComponent
            colors={["#04203E", "#27A74A", "#0a3d5c", "#1f8a3d"]}
            speed={0.5}
            style={{ position: "fixed", top: 0, left: 0, zIndex: 0, width: "100%", height: "100%" }}
          />
          <div className="relative z-[1] min-h-[100dvh] h-[100dvh] w-full flex items-center justify-center px-5 overflow-hidden">
            <main className="w-full max-w-screen-sm flex justify-center">{children}</main>
          </div>
          <Toaster position="top-right" duration={3000} />
        </Providers>
      </body>
    </html>
  )
}


