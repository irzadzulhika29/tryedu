// Privacy Policy page for EduTry platform
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
        <Card className="bg-white dark:bg-zinc-800 border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-zinc-600 dark:text-zinc-300 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                use our services, or communicate with us.
              </p>
              <p className="mb-4">Information we may collect includes:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Name and contact information</li>
                <li>Educational institution details</li>
                <li>Account credentials</li>
                <li>Test scores and performance data</li>
                <li>Technical information about your device and browser</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>To provide and maintain our services</li>
                <li>To create and manage your account</li>
                <li>To monitor and analyze educational performance</li>
                <li>To provide customer support</li>
                <li>To comply with legal obligations</li>
                <li>To improve our services</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p>
                Our security measures include encryption, secure server infrastructure, and access controls. 
                However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
              <p className="mb-4">
                We do not sell, trade, or rent your personal identification information to others except 
                as described in this privacy policy.
              </p>
              <p>
                We may share your information with third-party service providers who assist us in operating 
                our website, conducting business, or serving our users, so long as those parties agree to 
                maintain the confidentiality of your information.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Student Privacy</h2>
              <p>
                We take special care with student data. Educational records and student performance data 
                are treated with heightened security protocols. Access to student data is restricted to 
                authorized teachers and administrators associated with the respective students.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access your personal information</li>
                <li>Rectify inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Restrict processing of your personal information</li>
                <li>Data portability</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
              <p>
                Our services do not address anyone under the age of 13. We do not knowingly collect 
                personal identifiable information from children under 13. If you are a parent or guardian 
                and believe your child has provided us with personal information, please contact us.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "last updated" date.
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