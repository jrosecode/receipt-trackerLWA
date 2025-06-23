'use client';
import React from "react";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 border-b bg-background">
      <div className="flex items-center gap-2">
        <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-md">
            <Image src="/logo.png" alt="PaperTrail Logo" width={36} height={36} />
          </span>
          <span className="text-xl font-bold tracking-tight">PaperTrail</span>
        </Link>
      </div>
      <nav className="flex items-center gap-4">
        <Link href="/receipts" aria-label="My Receipts">
          <Button variant="ghost" className="hover:bg-primary/10 transition-colors">My Receipts</Button>
        </Link>
        <Link href="/manage-plan" aria-label="Manage Plan">
          <Button variant="ghost" className="hover:bg-primary/10 transition-colors">Manage Plan</Button>
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <span className="h-6 w-px bg-border mx-2" aria-hidden="true" />
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="default">Sign in</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button variant="outline">Create account</Button>
          </SignUpButton>
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;