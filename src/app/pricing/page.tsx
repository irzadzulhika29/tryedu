// Pricing page for EduTry platform
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for individual educators and small classes",
      features: [
        "Up to 5 assessments per month",
        "Basic question types",
        "Simple analytics",
        "Email support",
        "Up to 50 students"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      description: "Ideal for schools and training organizations",
      features: [
        "Unlimited assessments",
        "All question types",
        "Advanced analytics",
        "Priority support",
        "Up to 500 students",
        "Basic proctoring",
        "Custom branding"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large institutions and corporations",
      features: [
        "Unlimited everything",
        "Advanced proctoring",
        "API access",
        "Dedicated support",
        "Custom integrations",
        "Data export options",
        "SSO integration",
        "Custom contracts"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="w-full py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Simple, transparent pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for your educational needs. All plans include our core features with options for additional capabilities.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`flex flex-col ${plan.popular ? "ring-2 ring-primary relative" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-6 pt-6">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Free" && plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full mt-8" 
                  size="lg" 
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href={plan.name === "Enterprise" ? "/contact" : "/admin"}>
                    {plan.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Can I switch plans later?</h3>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated based on your billing cycle.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a free trial available?</h3>
              <p className="text-muted-foreground">Yes, all plans include a 14-day free trial with full access to features. No credit card required.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-muted-foreground">Absolutely. You can cancel your subscription at any time, though we'll be sad to see you go.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}