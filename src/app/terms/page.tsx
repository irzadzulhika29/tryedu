// Terms of Service page for EduTry platform
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
        <Card className="bg-white dark:bg-zinc-800 border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-zinc-600 dark:text-zinc-300 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to EduTry. These terms and conditions outline the rules and regulations for the use of 
                EduTry's website and services.
              </p>
              <p>
                By accessing this website and using our services, we assume you accept these terms and conditions. 
                Do not continue to use EduTry if you do not agree to all the terms stated here.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property</h2>
              <p className="mb-4">
                Unless otherwise stated, EduTry and/or its licensors own the intellectual property rights for 
                all material on EduTry. All intellectual property rights are reserved.
              </p>
              <p>
                You may view and/or print pages from https://www.edutry.com for your own personal use subject 
                to restrictions set in these terms and conditions.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <p className="mb-4">
                When you create an account with us, you must provide accurate and complete information. 
                You are responsible for maintaining the security of your account and for all activities 
                that occur under your account.
              </p>
              <p>
                You agree not to share your account credentials with anyone else and to notify us immediately 
                of any unauthorized use of your account.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Prohibited Activities</h2>
              <p>You are specifically restricted from all of the following:</p>
              <ul className="list-disc pl-6 mb-4 mt-2">
                <li>publishing any website material in any other media</li>
                <li>selling, sublicensing and/or commercializing website material</li>
                <li>publicly performing and/or showing any website material</li>
                <li>using this website in any way that is or may be damaging to this website</li>
                <li>using this website in any way that impacts user access</li>
                <li>using this website contrary to applicable laws and regulations</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
              <p>
                In no event shall EduTry, nor any of its officers, directors and employees, be held liable 
                for anything arising out of or in any way connected with your use of this website whether 
                such liability is contractual, strict liability, or tort.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Changes to These Terms</h2>
              <p>
                We reserve the right to revise these terms at any time. By using our services, you agree 
                to be bound by the current version of these terms and conditions.
              </p>
            </section>
            
            <div className="flex justify-center mt-12">
              <Link href="/">
                <Button variant="outline">Return to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}