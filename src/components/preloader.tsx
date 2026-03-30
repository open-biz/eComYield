"use client";

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
          {/* Logo mark */}
          <div className="w-16 h-16 bg-[#0A2E20] flex items-center justify-center">
            <span className="text-[#F5F3EC] font-bold text-2xl">e</span>
          </div>
          {/* Brand name */}
          <div className="flex items-center gap-2">
            <span className="text-[#1C1B18] font-bold text-xl tracking-tight">
              eComYield
            </span>
            <span className="text-[#1C1B18]/30 text-xs">|</span>
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