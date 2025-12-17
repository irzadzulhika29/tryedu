"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 sm:px-6 md:px-8">
        <div className="flex h-16 items-center justify-between max-w-[99%] mx-auto">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">EduTry</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-foreground/80"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>

            {/* Mobile Nav Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Nav Content */}
        {isOpen && (
          <div className="md:hidden border-t border-border/40 py-4 bg-background">
            <nav className="flex flex-col space-y-4 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-foreground/80 px-2 py-1.5 rounded-md hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="outline"
                  asChild
                  className="w-full justify-start"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="w-full justify-start">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
