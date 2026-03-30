"use client";

import { ScrollReveal } from "@/components/scroll-animation";

const problemItems = [
  { label: "Amazon Hold Period", value: "7–21 days" },
  { label: "Bank Transfer Delay", value: "+1–2 days" },
  { label: "Total Wait Time", value: "9–23 days" },
  { label: "Banking Hours Only", value: "Mon–Fri, 9–5" },
  { label: "Cash Flow Gap", value: "Unpredictable" },
];

const solutionItems = [
  { label: "Advance Timing", value: "Same Day" },
  { label: "Availability", value: "24/7/365" },
  { label: "Advance Rate", value: "Up to 80%" },
  { label: "Settlement", value: "Sub-second" },
  { label: "Transparency", value: "On-chain" },
];

export default function ProblemSolution() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 w-full">
      {/* LEFT — The Problem */}
      <ScrollReveal animation="fade-in-left" className="bg-[#EBE8DE] p-16 md:p-24">
        <h2 className="text-4xl tracking-tight text-[#1C1B18] mb-12">
          The Problem
        </h2>
        <div className="space-y-0">
          {problemItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-5 border-b border-[#1C1B18]/20"
            >
              <span className="text-[#1C1B18]/70 text-lg">{item.label}</span>
              <span className="text-[#1C1B18] font-medium text-lg font-mono">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* RIGHT — The Solution */}
      <ScrollReveal animation="fade-in-right" className="bg-[#0A2E20] p-16 md:p-24">
        <h2 className="text-4xl tracking-tight text-[#F5F3EC] mb-12">
          The Solution
        </h2>
        <div className="space-y-0">
          {solutionItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-5 border-b border-[#F5F3EC]/20"
            >
              <span className="text-[#F5F3EC]/70 text-lg">{item.label}</span>
              <span className="text-[#F5F3EC] font-medium text-lg font-mono">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
