import type React from "react"
import type { Viewport } from "next"
import { Montserrat } from "next/font/google"
import { Providers } from "@/context"
import { Header } from "@/components/header"
import { MeshGradientComponent } from "@/components/mesh-gradient"
import "./globals.css"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  preload: true,
})

export const viewport: Viewport = {
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans antialiased max-w-screen min-h-svh bg-slate-1 text-slate-12`}>
        <Providers defaultTheme="light">
          <MeshGradientComponent
            colors={[
              "#04203E", // Primary brand color
              "#27A74A", // Secondary brand color
              "#0a3d5c", // Darker variant of primary
              "#1f8a3d", // Darker variant of secondary
            ]}
            speed={0.5}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 0,
              width: "100%",
              height: "100%",
            }}
          />
          <div className="max-w-screen-sm mx-auto w-full relative z-[1] flex flex-col min-h-screen">
            <div className="px-5 gap-8 flex flex-col flex-1 py-[12vh]">
              <Header />
              <main className="flex justify-center">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
