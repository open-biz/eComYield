"use client";

import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-animation";

const vaultData = [
  { label: "Pool Duration", value: "14–23 days" },
  { label: "Underlying Asset", value: "Amazon Receivables" },
  { label: "Denomination", value: "USDC" },
  { label: "Target APY", value: "8–12%" },
  { label: "Settlement", value: "Solana" },
];

export default function YieldPitch() {
  return (
    <section className="bg-[#F5F3EC] py-24 md:py-32 px-8 md:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.4fr] gap-16 md:gap-24 items-start">
        {/* Left — Copy */}
        <ScrollReveal animation="fade-in-left">
          <div>
            <h2 className="text-5xl md:text-7xl tracking-tighter font-semibold text-[#1C1B18] mb-8 leading-[0.9]">
              Uncorrelated
              <br />
              Real-World Yield.
            </h2>
            <p className="text-xl md:text-2xl text-[#1C1B18]/60 leading-relaxed max-w-2xl mb-12">
              Stop chasing inflationary tokenomics. eComYield allows LPs to deposit
              USDC into short-duration (14–23 day) factoring pools backed by
              verifiable, programmatic Amazon cash flows.
            </p>
            <button className="group inline-flex items-center gap-3 bg-transparent text-[#1C1B18] border-2 border-[#1C1B18] px-8 py-5 text-lg font-medium rounded-none hover:bg-[#EBE8DE] transition-colors">
              View RWA Vaults
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </ScrollReveal>

        {/* Right — Data Table */}
        <ScrollReveal animation="fade-in-right">
          <div className="border border-[#1C1B18]/20">
          <div className="px-6 py-4 border-b border-[#1C1B18]/20">
            <span className="text-xs uppercase tracking-widest text-[#1C1B18]/40">
              Vault Parameters
            </span>
          </div>
          {vaultData.map((row, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-6 py-4 border-b border-[#1C1B18]/10 last:border-b-0"
            >
              <span className="text-[#1C1B18]/50 text-sm">{row.label}</span>
              <span className="text-[#1C1B18] font-mono text-sm font-medium">
                {row.value}
              </span>
            </div>
          ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
