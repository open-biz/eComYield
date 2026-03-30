"use client";

import { useEffect, useRef, useState } from "react";

const partners = [
  "Amazon Partner Network",
  "Solana",
  "Circle (USDC)",
  "Nomad AI",
];

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

export default function TrustBanner() {
  return (
    <section className="w-full bg-[#F5F3EC] border-y border-[#1C1B18]/10 py-12 px-8">
      <ScrollReveal className="mb-8">
        <p className="text-center tracking-widest text-xs text-[#1C1B18]/50 uppercase">
          Infrastructure Powered By
        </p>
      </ScrollReveal>
      <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
        {partners.map((name, i) => (
          <ScrollReveal key={name} animation="fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
            <span className="text-[#1C1B18]/40 text-lg md:text-xl font-semibold tracking-tight">
              {name}
            </span>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
