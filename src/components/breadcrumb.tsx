"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  homeHref?: string;
}

export function Breadcrumb({ items, homeHref = "/" }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-[#1C1B18]/60 mb-6">
      <Link 
        href={homeHref} 
        className="hover:text-[#1C1B18] transition-colors flex items-center"
      >
        <Home size={16} />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <ChevronRight size={14} className="text-[#1C1B18]/30" />
          {item.href ? (
            <Link 
              href={item.href} 
              className="hover:text-[#1C1B18] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#1C1B18] font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

// Seller-specific breadcrumb with custom home label
export function SellerBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return <Breadcrumb items={items} homeHref="/seller" />;
}

// Vaults-specific breadcrumb
export function VaultsBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return <Breadcrumb items={items} homeHref="/vaults" />;
}