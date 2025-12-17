// Forgot password page for EduTry platform
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    // In a real app, you would send a password reset email
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Card className="bg-white dark:bg-zinc-800 border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
              <CardDescription>
                We've sent a password reset link to {email}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                Didn't receive the email? Check your spam folder or try again.
              </p>
            </CardContent>
            
            <CardFooter className="flex flex-col">
              <Button 
                variant="outline" 
                className="w-full mb-4"
                onClick={() => setSubmitted(false)}
              >
                Resend Email
              </Button>
              
              <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                Remember your password?{" "}
                <Link 
                  href="/login" 
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="bg-white dark:bg-zinc-800 border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
            <CardDescription>
              Enter your email and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full mb-4">
                Send Reset Link
              </Button>
              
              <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                Remember your password?{" "}
                <Link 
                  href="/login" 
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}