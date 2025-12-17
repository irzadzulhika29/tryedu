// RootLayout with navigation for the EduTry platform
"use client";

import "./globals.css";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();

  // Routes that have their own special layouts with their own headers
  const hasSpecialLayout =
    pathname?.startsWith("/admin") || pathname?.startsWith("/student");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative flex min-h-screen flex-col bg-background">
          {!hasSpecialLayout && <Navbar />}
          <div className="flex-1">{children}</div>
          {!hasSpecialLayout && <Footer />}
        </div>
      </body>
    </html>
  );
}
