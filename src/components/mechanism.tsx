"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Connect & Sync",
    description:
      "Link your Amazon Seller Central via SP-API. We instantly verify your daily net sales, marketplace fees, and refunds off-chain.",
  },
  {
    number: "02",
    title: "Daily Funding",
    description:
      "Nomad AI provisions a virtual receiving account. Our Solana liquidity pool advances your daily payout in USDC or Fiat.",
  },
  {
    number: "03",
    title: "Automated Settlement",
    description:
      "When Amazon releases your 14-day hold, the funds route through the virtual account, repaying the smart contract and LP yield.",
  },
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

export default function Mechanism() {
  return (
    <section className="bg-[#EBE8DE] border-y border-[#1C1B18]">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1C1B18]">
        {steps.map((step, i) => (
          <ScrollReveal key={step.number} animation="fade-in-up" style={{ animationDelay: `${i * 150}ms` }} className="p-12 md:p-16">
            <span className="block font-mono text-sm text-[#1C1B18]/40 mb-6">
              {step.number}
            </span>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1C1B18] mb-4">
              {step.title}
            </h3>
            <p className="text-[#1C1B18]/60 leading-relaxed text-base">
              {step.description}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
