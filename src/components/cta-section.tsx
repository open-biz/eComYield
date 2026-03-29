"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, ShoppingCart } from "lucide-react";

interface CTASectionProps {
  onConnectStore?: () => void;
  onEarnYield?: () => void;
}

export default function CTASection({ onConnectStore, onEarnYield }: CTASectionProps) {
  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">Cash Flow?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            Whether you're an Amazon seller needing instant liquidity or an investor seeking real yield — eComYield delivers.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* For Sellers */}
            <button
              onClick={onConnectStore}
              className="group flex flex-col items-center gap-4 p-8 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-cyan-500/50 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Amazon Sellers</h3>
                <p className="text-slate-400 text-sm mb-4">Get paid same-day. No waiting 9-23 days.</p>
                <span className="inline-flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all">
                  Connect Store <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </button>

            {/* For LPs */}
            <button
              onClick={onEarnYield}
              className="group flex flex-col items-center gap-4 p-8 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-green-500/50 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Liquidity Providers</h3>
                <p className="text-slate-400 text-sm mb-4">Earn 24-48% APY backed by real receivables.</p>
                <span className="inline-flex items-center gap-2 text-green-400 font-medium group-hover:gap-3 transition-all">
                  Start Earning <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          </div>

          <p className="text-slate-500 text-sm mt-8">
            🔒 Secure • ⚡ Fast • 🎯 Transparent
          </p>
        </motion.div>
      </div>
    </section>
  );
}