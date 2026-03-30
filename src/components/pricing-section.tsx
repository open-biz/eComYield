"use client";

import { ScrollReveal } from "@/components/scroll-animation";

export default function PricingSection() {
  return (
    <section className="bg-[#0A2E20] py-24 md:py-32 px-8 md:px-16">
      {/* Headline */}
      <ScrollReveal className="mb-16">
        <h2 className="text-5xl md:text-7xl tracking-tighter font-semibold text-[#F5F3EC] max-w-4xl leading-[0.9]">
          Priced for scale.
          <br />
          No hidden terms.
        </h2>
      </ScrollReveal>

      {/* Receipt card */}
      <ScrollReveal animation="scale-in">
        <div className="max-w-2xl bg-[#0A2E20] border border-[#F5F3EC]/20 p-10 md:p-14">
        <div className="space-y-0">
          {/* Line item 1 */}
          <div className="flex items-baseline justify-between py-5 border-b border-[#F5F3EC]/10">
            <span className="text-[#F5F3EC]/60 text-sm uppercase tracking-widest">
              Daily Fee
            </span>
            <span className="text-[#F5F3EC] font-mono text-4xl md:text-5xl font-semibold">
              0.3%
            </span>
          </div>

          {/* Line item 2 */}
          <div className="flex items-baseline justify-between py-5 border-b border-[#F5F3EC]/10">
            <span className="text-[#F5F3EC]/60 text-sm uppercase tracking-widest">
              Avg. Annual Cost
            </span>
            <span className="text-[#F5F3EC] font-mono text-4xl md:text-5xl font-semibold">
              1–2%
            </span>
          </div>

          {/* Line item 3 */}
          <div className="flex items-baseline justify-between py-5 border-b border-[#F5F3EC]/10">
            <span className="text-[#F5F3EC]/60 text-sm uppercase tracking-widest">
              Of Net Sales
            </span>
            <span className="text-[#F5F3EC]/40 font-mono text-lg">
              Gross − Fees − Refunds
            </span>
          </div>
        </div>

        {/* Micro-copy */}
        <p className="text-[#F5F3EC]/40 text-sm leading-relaxed mt-8 font-mono">
          Net sales = Gross sales minus Amazon fees and refunds. You only pay for
          the exact days you use the capital. No minimums. No lock-ins.
        </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
