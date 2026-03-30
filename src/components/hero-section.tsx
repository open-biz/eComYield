"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onConnectStore?: () => void;
  onEarnYield?: () => void;
}

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

export default function HeroSection({ onConnectStore, onEarnYield }: HeroSectionProps) {
  return (
    <section className="bg-[#F5F3EC] pt-32 pb-24 px-8 md:px-16">
      {/* Tag */}
      <ScrollReveal className="mb-8">
        <span className="inline-block bg-[#EBE8DE] text-[#1C1B18] px-4 py-2 text-sm font-medium rounded-none">
          RWA-Backed Stablecoin Protocol
        </span>
      </ScrollReveal>

      {/* Headline */}
      <ScrollReveal animation="fade-in-up" className="mb-8">
        <h1 className="text-[12vw] md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[0.85] text-[#1C1B18] text-balance">
          Amazon Holds Your
          <br />
          Money 9–23 Days.
        </h1>
      </ScrollReveal>

      {/* Sub-headline */}
      <ScrollReveal animation="fade-in-up" className="mb-12" style={{ animationDelay: '100ms' }}>
        <p className="text-2xl md:text-3xl text-[#1C1B18]/70 max-w-3xl leading-snug tracking-tight">
          We advance up to 80% of your daily net sales the same day Amazon confirms the order. No waiting. No credit checks. No paperwork.
        </p>
      </ScrollReveal>

      {/* Buttons */}
      <ScrollReveal animation="fade-in-up" className="flex flex-col sm:flex-row gap-4" style={{ animationDelay: '200ms' }}>
        <button
          onClick={onConnectStore}
          className="group inline-flex items-center gap-3 bg-[#0A2E20] text-[#F5F3EC] px-10 py-6 text-lg font-medium rounded-none hover:bg-black transition-colors"
        >
          Connect Amazon Store
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={onEarnYield}
          className="inline-flex items-center gap-3 bg-transparent text-[#1C1B18] border-2 border-[#1C1B18] px-10 py-6 text-lg font-medium rounded-none hover:bg-[#EBE8DE] transition-colors"
        >
          Earn Yield
        </button>
      </ScrollReveal>
    </section>
  );
}
