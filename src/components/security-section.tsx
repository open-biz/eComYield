"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, CheckCircle2, Audit, BugBounty } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Asset Backing",
    description: "Every USDC in the pool is backed 1:1 by verified Amazon receivables"
  },
  {
    icon: Lock,
    title: "Smart Contract Security",
    description: "Audited contracts with pause functionality and role-based access control"
  },
  {
    icon: Eye,
    title: "On-Chain Transparency",
    description: "All transactions verifiable on Solana — advances, repayments, fees"
  },
  {
    icon: Server,
    title: "Real-Time Monitoring",
    description: "Continuous SP-API monitoring of seller health and account status"
  }
];

const audits = [
  { name: "Security Audit", status: "Scheduled" },
  { name: "Economic Audit", status: "Scheduled" },
  { name: "Bug Bounty", status: "Coming Soon" }
];

export default function SecuritySection() {
  return (
    <section className="relative py-24 bg-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-sm mb-6">
            <Shield className="w-4 h-4" />
            Security First
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">Trust</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Security isn't an afterthought — it's foundational. Every advance is protected by multiple layers of security.
          </p>
        </motion.div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 hover:border-green-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Audit Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Audit className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-semibold text-white">Security Audits</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {audits.map((audit, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
                <span className="text-slate-300">{audit.name}</span>
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
                  {audit.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          {[
            { icon: CheckCircle2, text: "KYC via Amazon Data" },
            { icon: Lock, text: "Receivables Factoring License" },
            { icon: BugBounty, text: "Bug Bounty Program" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-xl">
              <item.icon className="w-5 h-5 text-green-400" />
              <span className="text-slate-300 text-sm">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}