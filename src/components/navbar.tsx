"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  onConnectStore?: () => void;
  onConnectWallet?: () => void;
}

export default function Navbar({ onConnectStore, onConnectWallet }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-[#0A2E20] z-50">
      <div className="flex items-center justify-between px-8 py-6">
        <Link href="/" className="text-[#F5F3EC] font-bold text-xl tracking-tight">
          eComYield
        </Link>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onConnectStore}
            className="bg-[#F5F3EC] text-[#0A2E20] px-6 py-3 text-sm font-medium rounded-none hover:bg-white transition-colors"
          >
            Connect Store
          </button>
          <button
            onClick={onConnectWallet}
            className="bg-transparent text-[#F5F3EC] border border-[#F5F3EC] px-6 py-3 text-sm font-medium rounded-none hover:bg-[#F5F3EC]/10 transition-colors"
          >
            View RWA Vaults
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#F5F3EC]"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden px-8 pb-6 border-t border-[#F5F3EC]/10">
          <div className="flex flex-col gap-3 pt-4">
            <button
              onClick={() => { onConnectStore?.(); setIsOpen(false); }}
              className="w-full bg-[#F5F3EC] text-[#0A2E20] px-6 py-3 text-sm font-medium rounded-none"
            >
              Connect Store
            </button>
            <button
              onClick={() => { onConnectWallet?.(); setIsOpen(false); }}
              className="w-full bg-transparent text-[#F5F3EC] border border-[#F5F3EC] px-6 py-3 text-sm font-medium rounded-none"
            >
              View RWA Vaults
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
