"use client";

import { ScrollReveal } from "@/components/scroll-animation";

const partners = [
  "Amazon Partner Network",
  "Solana",
  "Circle (USDC)",
  "Nomad AI",
];

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
