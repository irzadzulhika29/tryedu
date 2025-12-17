// Main landing page for EduTry platform
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";
import Footer from "@/components/common/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-900">
      {/* Hero Section */}
      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="px-4 md:px-6 max-w-[99%] mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Modern Online Testing Platform
                </h1>
                <p className="max-w-[700px] text-zinc-600 dark:text-zinc-300 md:text-xl">
                  Secure and intuitive Computer Based Testing solution for
                  educators and students
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" asChild>
                  <Link href="/admin">Get Started as Admin</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/student">Enter as Student</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-zinc-800">
          <div className="px-4 md:px-6 max-w-[99%] mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Platform Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Question Management</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Create and manage various question types with rich text
                    editor and media support
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Secure Proctoring</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Capture camera feed and detect tab switching to maintain
                    exam integrity
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Analytics</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Track student progress and performance with comprehensive
                    dashboards
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6 max-w-[99%] mx-auto">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">
                  Ready to Transform Your Testing?
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Join thousands of educators using our platform today
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button size="lg" variant="secondary" className="text-primary">
                  Get Started Today
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
