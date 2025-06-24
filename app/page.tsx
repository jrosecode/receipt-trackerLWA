"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import PDFDropzone from "@/components/PDFDropzone";
import { Upload, Brain, BarChart3, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex flex-col items-center">
          <Badge className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <Upload className="w-4 h-4" />
            Intelligent Receipt Scanning
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-center">
            Scan & Analyze
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {" "}
              Receipts
            </span>
            <br />
            Instantly with AI
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-center">
            Drop your PDF receipts below and let our AI extract, analyze, and
            organize your expenses in seconds.
          </p>

          <div className="w-full max-w-xl mb-8">
            <PDFDropzone />
            {selectedFile && (
              <div className="mt-4 text-center text-primary font-medium">
                Selected: {selectedFile.name}
              </div>
            )}
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Effortless Receipt Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The smartest way to upload, analyze, and gain insights from your
              receipts
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="flex flex-col items-center">
                <Upload className="w-8 h-8 text-primary mb-4" />
                <CardTitle>Easy Uploads</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Drag & drop PDFs or upload from any device. Fast, secure, and
                seamless.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-col items-center">
                <Brain className="w-8 h-8 text-primary mb-4" />
                <CardTitle>AI Analysis</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Our advanced AI extracts key data, categorizes expenses, and
                summarizes your receipts automatically.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-col items-center">
                <BarChart3 className="w-8 h-8 text-primary mb-4" />
                <CardTitle>Expense Insights</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Visualize your spending, track trends, and export reports for
                smarter budgeting.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible plans for every need. Start for free, upgrade anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <Card className="border border-border/50 shadow-sm flex flex-col h-full">
              <CardHeader className="items-center">
                <CardTitle className="text-2xl font-bold">Free</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 flex-1">
                <div className="text-4xl font-bold">
                  $0
                  <span className="text-xs text-muted-foreground align-top ml-1">
                    /month
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  $0/year
                </div>
                <ul className="text-left mb-4 space-y-1 text-sm">
                  <li>• 2 scans per month</li>
                  <li>• Basic data extraction</li>
                  <li>• 7-day history</li>
                </ul>
              </CardContent>
              <CardFooter className="w-full flex justify-center">
                <Button asChild className="w-full">
                  <Link href="/signup">Sign Up Free</Link>
                </Button>
              </CardFooter>
            </Card>
            {/* Starter Plan */}
            <Card className="border border-border/50 shadow-sm flex flex-col h-full">
              <CardHeader className="items-center">
                <CardTitle className="text-2xl font-bold">Starter</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 flex-1">
                <div className="text-4xl font-bold">
                  $4.99
                  <span className="text-xs text-muted-foreground align-top ml-1">
                    /month
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  $49.99/year
                </div>
                <ul className="text-left mb-4 space-y-1 text-sm">
                  <li>• 50 scans per month</li>
                  <li>• Enhanced data extraction</li>
                  <li>• 30-day history</li>
                  <li>• Basic export options</li>
                </ul>
              </CardContent>
              <CardFooter className="w-full flex justify-center">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/signup">Choose Plan</Link>
                </Button>
              </CardFooter>
            </Card>
            {/* Pro Plan (Popular) */}
            <Card className="border-2 border-primary shadow-md relative flex flex-col h-full">
              <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow">
                Popular
              </Badge>
              <CardHeader className="items-center">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  Pro <Star className="w-5 h-5 text-yellow-400" />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 flex-1">
                <div className="text-4xl font-bold">
                  $9.99
                  <span className="text-xs text-muted-foreground align-top ml-1">
                    /month
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  $99.99/year
                </div>
                <ul className="text-left mb-4 space-y-1 text-sm">
                  <li>• 300 scans per month</li>
                  <li>• Advanced AI data extraction</li>
                  <li>• AI summaries</li>
                  <li>• Expense categories & tags</li>
                  <li>• Advanced export options</li>
                  <li>• Unlimited history</li>
                </ul>
              </CardContent>
              <CardFooter className="w-full flex justify-center">
                <Button asChild className="w-full">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Final Info Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Revolutionize Your Expense Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of expense management with our AI-powered
              platform.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-background/80 py-8 mt-0">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="text-center md:text-left w-full md:w-auto">
            &copy; {new Date().getFullYear()} PaperTrail. All rights reserved.
          </div>
          <div className="flex flex-row gap-6 justify-center w-full md:w-auto">
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
