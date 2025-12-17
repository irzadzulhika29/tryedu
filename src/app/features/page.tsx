// Features page for EduTry platform
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Lock, 
  BarChart3, 
  MonitorCog,
  Users,
  FileQuestion
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="w-full py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Platform Features</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive tools to create, manage, and deliver online assessments with security and ease
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Question Management</CardTitle>
              <CardDescription>Create and organize various question types</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p>Manage multiple choice, short answer, fill-in-the-blank, and matching questions with our intuitive editor. Organize questions in banks and reuse them across different assessments.</p>
            </CardContent>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileQuestion className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Exam Creation</CardTitle>
              <CardDescription>Build custom assessments with ease</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p>Design exams with time limits, randomized questions, and different sections. Set specific rules such as number of attempts, allowed resources, and proctoring requirements.</p>
            </CardContent>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MonitorCog className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Secure Proctoring</CardTitle>
              <CardDescription>Ensure exam integrity with AI monitoring</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p>Advanced proctoring tools including face detection, tab switching alerts, and screen recording to maintain test security and prevent cheating during online assessments.</p>
            </CardContent>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Real-time Analytics</CardTitle>
              <CardDescription>Track performance and gain insights</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p>Monitor student progress during exams, view detailed reports, and identify trends in performance. Comprehensive dashboards for educators and administrators.</p>
            </CardContent>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage roles and permissions effectively</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p>Control access with role-based permissions for administrators, teachers, and students. Manage class enrollment, user accounts, and customize access levels.</p>
            </CardContent>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Data Security</CardTitle>
              <CardDescription>Protect sensitive information</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p>Enterprise-grade security with encrypted data storage, secure transmission, and compliance with privacy regulations to protect student information and assessment data.</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to enhance your assessments?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of educators who trust our platform for secure and effective online testing
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/admin">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">Schedule Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}