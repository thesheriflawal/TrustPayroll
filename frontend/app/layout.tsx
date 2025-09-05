import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Web3Provider } from "@/lib/web3-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrustPayroll - Decentralized Salary Streaming Platform",
  description:
    "A blockchain-based platform for organizations to stream salaries to employees based on daily attendance",
  icons: {
    icon: "/trustpayroll.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <Web3Provider>
              {children}
              <Toaster />
            </Web3Provider>
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
