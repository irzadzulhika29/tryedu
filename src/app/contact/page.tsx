// Contact page for EduTry platform
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // In a real app, you would send this data to your backend
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
            Have questions? We&apos;d love to hear from you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

            <div className="space-y-6">
              <Card className="bg-white dark:bg-zinc-800 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="mr-3 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                      📍
                    </div>
                    Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    123 Education Street
                    <br />
                    Learning City, LC 12345
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-zinc-800 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="mr-3 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                      📧
                    </div>
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>support@edutry.com</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                    For general inquiries
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-zinc-800 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="mr-3 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                      ☎️
                    </div>
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>+1 (555) 123-4567</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                    Mon-Fri, 9am-5pm EST
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-white dark:bg-zinc-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-1"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-1"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
