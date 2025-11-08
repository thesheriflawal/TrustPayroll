import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

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
    // Force dark mode site-wide by adding the `dark` class on the <html> element.
    <html lang="en" className="dark">
      <body>
        {children}
      </body>
    </html>
  );
}
