"use client";

import { motion } from "framer-motion";
import { TrendingUp, Shield, Clock, DollarSign } from "lucide-react";

export default function YieldShowcase() {
  return (
    <section id="yield" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Pool Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-slate-400 text-sm">Total Pool Size</div>
                <div className="text-3xl font-bold text-white">$12.4M USDC</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-400">847</div>
                <div className="text-slate-500 text-xs">Active Sellers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">$2.1M</div>
                <div className="text-slate-500 text-xs">Advances Today</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">36%</div>
                <div className="text-slate-500 text-xs">Current APY</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fee Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-orange-400 font-semibold mb-2">2% Daily Fee on Cash Forwarded</div>
              <div className="text-slate-400 text-sm">Sellers pay 2% of the advance amount — not interest, just a small fee for instant liquidity.</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">17x</div>
              <div className="text-slate-500 text-xs">Capital Turns/Year</div>
            </div>
          </div>
        </motion.div>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm mb-6">
            <TrendingUp className="w-4 h-4" />
            For Liquidity Providers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Earn <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">24-48% APY</span>
            <br />Backed by Real Commerce
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Your USDC earns real yield from Amazon receivables. Not speculative DeFi — verified, short-duration, cash-flow positive assets.
          </p>
        </motion.div>

        {/* Yield calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-3xl p-8 md:p-12 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Input side */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Estimate Your Earnings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">USDC Deposit Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="number"
                      defaultValue={10000}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white text-2xl font-semibold focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Duration</label>
                  <div className="flex gap-3">
                    {["30D", "90D", "1Y"].map((term) => (
                      <button
                        key={term}
                        className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                          term === "1Y"
                            ? "bg-cyan-500 text-white"
                            : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Output side */}
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">Estimated Earnings</div>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 mb-2">
                  $4,800
                </div>
                <div className="text-slate-400">48% APY over 1 year</div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">17x</div>
                  <div className="text-xs text-slate-500">Capital Turns/Year</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">2%</div>
                  <div className="text-xs text-slate-500">Fee Per Cycle</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">14-21d</div>
                  <div className="text-xs text-slate-500">Settlement Period</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How Yield Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 bg-slate-900/30 border border-slate-800 rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold text-white mb-6 text-center">How Your 24-48% APY is Generated</h3>
          <div className="space-y-4">
            {[
              { step: "Day 1", action: "Seller gets $8,000 advance", fee: "$160 fee" },
              { step: "Day 21", action: "Amazon settles, pool repaid", yield: "+2% return" },
              { step: "Repeat", action: "Same $1,000 deployed 17x/year", total: "34% APY" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl">
                <div className="w-20 text-cyan-400 font-semibold">{item.step}</div>
                <div className="flex-1 text-slate-300">{item.action}</div>
                <div className={item.fee ? "text-orange-400" : item.yield ? "text-green-400" : "text-green-400 font-bold"}>
                  {item.fee || item.yield || item.total}
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-sm text-center mt-4">
            2% fee × 17 capital turns/year = <span className="text-green-400 font-semibold">34% gross APY</span>. After protocol fees: <span className="text-white font-semibold">24-48% net APY</span>.
          </p>
        </motion.div>

        {/* Why this yield is real */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: "Real Asset Backing",
              description: "Every dollar is backed by verified Amazon receivables — money Amazon owes and will pay."
            },
            {
              icon: Clock,
              title: "Short Duration",
              description: "14-21 day cycles means capital turns 17x/year. Your money isn't locked up for months."
            },
            {
              icon: TrendingUp,
              title: "Transparent On-Chain",
              description: "All advances, repayments, and fees recorded on Solana. Audit the pool anytime."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="group flex items-center gap-2 mx-auto px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 text-white font-semibold text-lg hover:from-green-400 hover:to-cyan-400 transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40">
            Start Earning Yield
            <TrendingUp className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}