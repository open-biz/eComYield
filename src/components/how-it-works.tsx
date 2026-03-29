"use client";

import { motion } from "framer-motion";
import { Link2, Building2, ArrowRight, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Connect Your Amazon Store",
    description: "Link your Seller Central account via Amazon SP-API. We pull real-time sales, fees, and net revenue data."
  },
  {
    number: "02",
    icon: Building2,
    title: "Virtual Bank Setup",
    description: "We create a dedicated virtual receiving account via Nomad AI. Redirect your Amazon payouts here."
  },
  {
    number: "03",
    icon: ArrowRight,
    title: "Get Paid Daily",
    description: "Receive up to 80% of your daily net sales as USDC — minus a flat 2% daily fee. The remaining 20% is held as repayment buffer."
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Auto-Repayment",
    description: "When Amazon settles (14-21 days), the principal repays the pool. Fees go to LPs as yield. The rest returns to you."
  }
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 bg-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm mb-6">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            From Amazon Sale to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">USDC in Minutes</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Four simple steps. No bank visits. No credit checks. Just connect and get paid.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-slate-800/30 border border-slate-700 rounded-2xl p-8 hover:border-cyan-500/30 transition-colors group"
            >
              {/* Number background */}
              <div className="absolute -top-4 -right-4 text-8xl font-bold text-slate-800 group-hover:text-slate-700 transition-colors">
                {step.number}
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </div>

              {/* Connector line for desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Visual flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-slate-800/20 border border-slate-700 rounded-2xl p-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {[
              { label: "Amazon Seller", icon: "📦" },
              { label: "eComYield Protocol", icon: "🔗" },
              { label: "Solana USDC Pool", icon: "💎" },
              { label: "Seller receives", icon: "✅" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <span className="text-slate-300 font-medium hidden sm:block">{item.label}</span>
                {i < 3 && (
                  <ArrowRight className="w-5 h-5 text-slate-600" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}