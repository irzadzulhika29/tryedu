// About page for EduTry platform
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">About EduTry</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
            Revolutionizing online education with secure testing solutions
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
                At EduTry, we believe that assessment is the cornerstone of learning. Our mission is to provide educators and institutions with a robust, secure, and intuitive platform for conducting online assessments that promote fairness and academic integrity.
              </p>
              <p className="text-lg text-zinc-700 dark:text-zinc-300">
                We are committed to bridging the gap between traditional classroom testing and modern digital learning environments, ensuring that every assessment experience is seamless, reliable, and secure.
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-4xl mb-4">🎓</div>
                  <h3 className="text-xl font-semibold">Transforming Education</h3>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-300">Through innovative technology</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 bg-white dark:bg-zinc-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Integrity</CardTitle>
                <CardDescription>Ensuring fair and honest assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <p>We implement advanced proctoring features to maintain the highest standards of academic honesty.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-white dark:bg-zinc-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Innovation</CardTitle>
                <CardDescription>Pushing boundaries in educational tech</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Constantly evolving our platform with cutting-edge technology to enhance the learning experience.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-white dark:bg-zinc-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Accessibility</CardTitle>
                <CardDescription>Making education available to all</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Creating inclusive solutions that work for everyone, regardless of technical limitations.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-32 flex items-center justify-center">
                  <div className="text-4xl">👤</div>
                </div>
                <CardHeader className="text-center pt-4">
                  <CardTitle className="text-lg">Team Member {item}</CardTitle>
                  <CardDescription>Role Description</CardDescription>
                </CardHeader>
                <CardContent className="text-center pb-4">
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">Brief bio about team member</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl text-white">
          <div className="text-center max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 text-blue-100">
              Join thousands of educators who trust EduTry for secure online testing
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="text-primary">
                <Link href="/admin">Create Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}