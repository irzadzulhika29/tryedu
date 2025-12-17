"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, LogOut, Home } from "lucide-react";

interface StudentLayoutProps {
  children: ReactNode;
}

export function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-white dark:bg-zinc-800 px-4 md:px-6">
        <Link href="/student" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">EduTry</span>
          <span className="text-sm text-muted-foreground">Student Portal</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/student">
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">Student User</p>
            </div>
          </div>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <LogOut className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
