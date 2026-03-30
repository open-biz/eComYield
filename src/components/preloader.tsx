"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Only show preloader on first visit (landing page)
    const hasSeenPreloader = sessionStorage.getItem("preloaderShown");
    
    if (hasSeenPreloader) {
      setTimeout(() => setIsLoading(false), 0);
      return;
    }

    // First visit - show preloader
    sessionStorage.setItem("preloaderShown", "true");
    
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#F5F3EC] transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <Image 
            src="/eComYield-logo.jpeg" 
            alt="eComYield" 
            width={96}
            height={96}
            className="object-contain"
            priority
          />
          {/* Brand tagline */}
          <div className="flex items-center gap-2">
            <span className="text-[#1C1B18]/50 text-sm font-medium">
              Advance Seller Payouts
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}