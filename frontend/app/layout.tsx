import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "../components/ui/theme-toggle";

export const metadata: Metadata = {
  title: "TrustPayroll",
  icons: { icon: "/trustpayroll.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
