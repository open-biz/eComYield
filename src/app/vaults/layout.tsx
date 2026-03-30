"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { SolanaConnectButton } from "@/components/solana-connect-button";

const navLinks = [
  { label: "Markets", href: "/vaults" },
  { label: "Portfolio", href: "/vaults/portfolio" },
  { label: "RWA Performance", href: "/vaults/rwa-performance" },
];

export default function VaultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F3EC]">
      {/* Fixed Top Navbar */}
      <nav className="fixed top-0 left-0 z-50 h-20 w-full border-b border-[#1C1B18]/10 bg-[#F5F3EC]">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 lg:px-10">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image 
                src="/eComYield-logo.jpeg" 
                alt="eComYield" 
                width={36} 
                height={36} 
                className="object-contain"
              />
              <span className="text-sm font-medium text-[#1C1B18]/60 hidden sm:inline">Home</span>
            </Link>
            <div className="h-5 w-px bg-[#1C1B18]/20" />
            <Link href="/vaults" className="whitespace-nowrap text-lg font-bold tracking-tight text-[#1C1B18]">
              eComYield | Institutional
            </Link>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium tracking-wide text-[#1C1B18]/70 transition-colors hover:text-[#1C1B18]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Connect Wallet + Hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <SolanaConnectButton variant="primary" />
            </div>

            {/* Mobile Hamburger */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-sm text-[#1C1B18] md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="border-b border-[#1C1B18]/10 bg-[#F5F3EC] px-6 pb-6 pt-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium tracking-wide text-[#1C1B18]/70 transition-colors hover:text-[#1C1B18]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 sm:hidden">
                <SolanaConnectButton variant="primary" />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="min-h-[calc(100vh-5rem)] bg-[#F5F3EC] pt-20 p-6 lg:p-10 lg:pt-20">
        <div className="mx-auto max-w-[1440px] pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}
