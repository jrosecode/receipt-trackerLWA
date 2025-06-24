"use client";
import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              href="/"
              aria-label="Go to homepage"
              className="flex items-center gap-3 hover:opacity-80 transition-all duration-200 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 shadow-sm">
                  <Image
                    src="/logo.png"
                    alt="PaperTrail Logo"
                    width={48}
                    height={48}
                    className="drop-shadow-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  PaperTrail
                </span>
                <span className="text-xs text-muted-foreground -mt-1">
                  Receipt Tracker
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
            <Link href="/receipts" aria-label="My Receipts">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                My Receipts
              </Button>
            </Link>
            <Link href="/manage-plan" aria-label="Manage Plan">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                Manage Plan
              </Button>
            </Link>
          </nav>

          {/* Theme Toggle + Auth Section */}
          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            <SignedIn>
              <div className="flex items-center gap-3">
                <div className="h-6 w-px bg-border" aria-hidden="true" />
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard: "shadow-lg border border-border",
                    },
                  }}
                />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  >
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    variant="default"
                    size="sm"
                    className="shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    Create account
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}

function ThemeToggleButton() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </Button>
  );
}

export default Header;
