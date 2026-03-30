"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function ScrollReveal({ children, className = "", animation = "fade-in-up", style }: { children: React.ReactNode; className?: string; animation?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`animate-on-scroll ${animation} ${isVisible ? "visible" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}

interface CTAFooterProps {
  onConnectStore?: () => void;
  onDepositUSDC?: () => void;
}

export default function CTAFooter({ onConnectStore, onDepositUSDC }: CTAFooterProps) {
  return (
    <section className="bg-[#1C1B18] min-h-screen flex flex-col">
      {/* CTA */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-24">
        <ScrollReveal className="mb-16">
          <h2 className="text-[15vw] leading-[0.8] tracking-tighter text-center text-[#F5F3EC] font-semibold">
            Why wait
            <br />
            20 days?
          </h2>
        </ScrollReveal>

        <ScrollReveal animation="fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onConnectStore}
              className="bg-[#F5F3EC] text-[#1C1B18] px-10 py-6 text-lg font-medium rounded-none hover:bg-white transition-colors"
            >
              Connect Amazon Store
            </button>
            <button
              onClick={onDepositUSDC}
              className="bg-transparent text-[#F5F3EC] border-2 border-[#F5F3EC] px-10 py-6 text-lg font-medium rounded-none hover:bg-[#F5F3EC]/10 transition-colors"
            >
              Deposit USDC
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#F5F3EC]/10 px-8 py-8">
        <ScrollReveal animation="fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-[#F5F3EC]/30 text-sm">
              © 2025 eComYield
            </span>
            <div className="flex items-center gap-8">
              {[
                { label: "Docs", href: "#" },
                { label: "Twitter / X", href: "#" },
                { label: "Terms", href: "#" },
                { label: "Nomad AI Privacy", href: "#" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[#F5F3EC]/30 text-sm hover:text-[#F5F3EC]/60 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </footer>
    </section>
  );
}
