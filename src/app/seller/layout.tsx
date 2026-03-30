"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Landmark,
  Banknote,
  Settings,
  Menu,
  X,
  Store,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/seller", icon: LayoutDashboard },
  { label: "Advances", href: "/seller/advances", icon: Banknote },
  { label: "Bank Accounts (Nomad)", href: "/seller/bank-accounts", icon: Landmark },
  { label: "Settings", href: "/seller/settings", icon: Settings },
];

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-8 flex items-center justify-between">
        <span className="text-[#F5F3EC] font-bold text-lg tracking-tight">
          eComYield <span className="font-normal text-[#F5F3EC]/60">|</span>{" "}
          <span className="font-medium text-sm text-[#F5F3EC]/80">Merchant</span>
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-[#F5F3EC]/70 hover:text-[#F5F3EC] lg:hidden"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm transition-colors ${
                isActive
                  ? "bg-[#F5F3EC]/10 text-[#F5F3EC] font-medium"
                  : "text-[#F5F3EC]/60 hover:text-[#F5F3EC] hover:bg-[#F5F3EC]/5"
              }`}
            >
              <Icon size={18} strokeWidth={1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Profile snippet */}
      <div className="px-6 py-6 border-t border-[#F5F3EC]/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-[#F5F3EC]/10 flex items-center justify-center">
            <Store size={16} className="text-[#F5F3EC]/70" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-medium text-[#F5F3EC]">Amazon US Store</p>
            <p className="text-xs text-[#F5F3EC]/50">Seller Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5F3EC]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 w-64 h-screen bg-[#0A2E20] z-40">
        <Sidebar />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-[#1C1B18]/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-screen bg-[#0A2E20] z-50 transform transition-transform duration-200 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setMobileOpen(false)} />
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center px-6 py-4 border-b border-[#1C1B18]/10">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-[#1C1B18]"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
          <span className="ml-4 font-bold text-sm text-[#1C1B18] tracking-tight">
            eComYield <span className="font-normal text-[#1C1B18]/40">|</span>{" "}
            <span className="font-medium text-[#1C1B18]/60">Merchant</span>
          </span>
        </div>

        <div className="p-6 sm:p-10">{children}</div>
      </main>
    </div>
  );
}
