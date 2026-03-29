"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const competitors = [
  {
    name: "Storfund",
    model: "Daily Advance",
    funding: "Balance Sheet",
    speed: "Next-day",
    web3: false,
    fee: "~2%"
  },
  {
    name: "Payability",
    model: "Daily Advance",
    funding: "Institutional",
    speed: "Next-day",
    web3: false,
    fee: "1-2%"
  },
  {
    name: "SellersFunding",
    model: "Loans & Advances",
    funding: "Bank Credit",
    speed: "1-3 days",
    web3: false,
    fee: "15-24% APR"
  },
  {
    name: "eComYield",
    model: "Daily Advance",
    funding: "Solana USDC Pool",
    speed: "Same-day 24/7",
    web3: true,
    fee: "2% daily"
  }
];

const features = [
  { name: "24/7/365 Settlement", storfund: false, payability: false, sellers: false, ecomyield: true },
  { name: "Sub-second Finality", storfund: false, payability: false, sellers: false, ecomyield: true },
  { name: "Global by Default", storfund: false, payability: false, sellers: false, ecomyield: true },
  { name: "On-Chain Transparency", storfund: false, payability: false, sellers: false, ecomyield: true },
  { name: "No Banking Hours", storfund: false, payability: false, sellers: false, ecomyield: true },
  { name: "DeFi Capital Efficiency", storfund: false, payability: false, sellers: false, ecomyield: true },
];

export default function CompetitiveLandscape() {
  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm mb-6">
            Competitive Landscape
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            We Beat TradFi at <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Their Own Game</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Same product model, but built on Solana. 24/7 settlement, global access, and transparent on-chain yield.
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-4 px-4 text-slate-400 font-medium">Feature</th>
                <th className="text-center py-4 px-4 text-slate-400 font-medium">Storfund</th>
                <th className="text-center py-4 px-4 text-slate-400 font-medium">Payability</th>
                <th className="text-center py-4 px-4 text-slate-400 font-medium">SellersFunding</th>
                <th className="text-center py-4 px-4 text-cyan-400 font-bold">eComYield</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-4 px-4 text-slate-300 font-medium">{feature.name}</td>
                  <td className="py-4 px-4 text-center">
                    {feature.storfund ? (
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-slate-600 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {feature.payability ? (
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-slate-600 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {feature.sellers ? (
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-slate-600 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {feature.ecomyield ? (
                      <Check className="w-5 h-5 text-cyan-400 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-slate-600 mx-auto" />
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Why we win */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            { title: "24/7 Settlement", desc: "No more waiting for bank wires. Get USDC instantly, any time, any day." },
            { title: "Global Access", desc: "A seller in Germany gets the same instant advance as one in the US." },
            { title: "Transparent Yield", desc: "Every advance and repayment on-chain. No opaque balance sheets." }
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}