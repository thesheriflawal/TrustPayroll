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
  icons: {
    icon: [
      { url: '/icon.png' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/icon.png',
  },
}

export default function WaitlistLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans antialiased max-w-screen min-h-svh bg-slate-1 text-slate-12`}>
        <Providers defaultTheme="dark">
          <MeshGradientComponent
            colors={["#04203E", "#27A74A", "#0a3d5c", "#1f8a3d"]}
            speed={0.5}
            style={{ position: "fixed", top: 0, left: 0, zIndex: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          />
          {/* Theme-aware overlay: softer white in light mode, darker in dark mode */}
          <div
            aria-hidden
            className="fixed inset-0 bg-white/80 dark:bg-black/65 transition-colors duration-300"
            style={{ zIndex: 0, pointerEvents: "none" }}
          />
          <div className="relative z-[1] min-h-[100dvh] w-full px-5 py-6">
            <main className="w-full max-w-6xl mx-auto flex flex-col gap-12">{children}</main>
          </div>
          <Toaster position="top-right" duration={3000} />
        </Providers>
      </body>
    </html>
  )
}


