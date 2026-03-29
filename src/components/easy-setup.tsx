"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, CreditCard, ArrowRight, Check, Clock, Globe, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Zap,
    title: "1. Connect in Seconds",
    description: "Link your Amazon Seller Central account via SP-API. No paperwork, no waiting.",
    time: "2 minutes"
  },
  {
    icon: ShieldCheck,
    title: "2. Instant Verification",
    description: "We verify you through your Amazon data — no credit check, no bank statements, no hassle.",
    time: "Auto"
  },
  {
    icon: CreditCard,
    title: "3. Get Paid Daily",
    description: "Set up your virtual bank account, redirect payouts, and start receiving advances immediately.",
    time: "Same day"
  }
];

const benefits = [
  { icon: Clock, text: "No waiting 21 days for Amazon" },
  { icon: FileCheck, text: "No credit check required" },
  { icon: Globe, text: "Works globally" },
  { icon: ShieldCheck, text: "No personal guarantee needed" },
];

export default function EasySetup() {
  return (
    <section className="relative py-24 bg-slate-900 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-sm mb-6">
            <Zap className="w-4 h-4" />
            Setup in Minutes
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">No Forms.</span> No Credit Check. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Just Connect.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Other funding options require weeks of paperwork and credit inquiries. eComYield connects directly to your Amazon account — verification is automatic.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-slate-800/40 border border-slate-700 rounded-2xl p-8 hover:border-cyan-500/40 transition-all group"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                {i + 1}
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <step.icon className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed mb-4">{step.description}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                <Clock className="w-3 h-3" />
                {step.time}
              </div>
            </motion.div>
          ))}
        </div>

        {/* No paperwork highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20 rounded-2xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Traditional Funding vs eComYield
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                    <span className="text-red-400 text-xs">✕</span>
                  </div>
                  <div>
                    <div className="text-slate-400">Bank loans: 2-4 weeks application</div>
                    <div className="text-slate-500 text-sm">Credit checks, tax returns, business plans</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                    <span className="text-red-400 text-xs">✕</span>
                  </div>
                  <div>
                    <div className="text-slate-400">Factoring companies: 1-2 weeks setup</div>
                    <div className="text-slate-500 text-sm">Contracts, personal guarantees, invoices</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                  <div>
                    <div className="text-green-400 font-semibold">eComYield: 2 minutes</div>
                    <div className="text-slate-500 text-sm">Just connect your Amazon account</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-xl">
                  <benefit.icon className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="group flex items-center gap-2 mx-auto px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 text-white font-semibold text-lg hover:from-green-400 hover:to-cyan-400 transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40">
            Connect Your Amazon Store
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-slate-500 mt-4 text-sm">
            Free to connect • No commitment • No hidden fees
          </p>
        </motion.div>
      </div>
    </section>
  );
}