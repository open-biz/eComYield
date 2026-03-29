"use client";

import { motion } from "framer-motion";
import { TrendingUp, ShoppingCart, DollarSign, Globe } from "lucide-react";

export default function MarketSection() {
  return (
    <section className="relative py-20 bg-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm mb-6">
            <TrendingUp className="w-4 h-4" />
            Market Opportunity
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            The $500B+ E-Commerce Financing Gap
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: ShoppingCart, value: "9.7M+", label: "Active Amazon Sellers", color: "cyan" },
            { icon: DollarSign, value: "$700B+", label: "Amazon Annual GMV", color: "green" },
            { icon: Globe, value: "$400B+", label: "Locked in Settlement", color: "orange" },
            { icon: TrendingUp, value: "$150B+", label: "DeFi Seeking Yield", color: "purple" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 text-center"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 text-${stat.color}-400`} />
              <div className={`text-3xl font-bold text-${stat.color}-400 mb-1`}>{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-slate-400">
            eComYield sits at the intersection of <span className="text-white font-semibold">sellers who need cash now</span> and <span className="text-white font-semibold">investors who need real yield</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}