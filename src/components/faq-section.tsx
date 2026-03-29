"use client";

import { motion } from "framer-motion";
import { HelpCircle, ChevronDown, Shield, DollarSign, Clock } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    category: "For Sellers",
    questions: [
      {
        q: "How is this different from a loan?",
        a: "This is a receivables advance — we're purchasing a portion of your future Amazon receivables, not lending you money. There's no interest, no APR, and no personal liability."
      },
      {
        q: "What happens if Amazon suspends my account?",
        a: "We monitor your account health continuously. If there are any issues, advances are paused. The 20% withheld from each advance serves as a buffer against this scenario."
      },
      {
        q: "Can I use this alongside other funding?",
        a: "Yes! Many sellers use eComYield alongside bank loans or other financing. We're flexible — you control your Amazon payout routing."
      },
      {
        q: "Is there a minimum or maximum advance amount?",
        a: "You can advance up to 80% of your daily net sales. There's no minimum — even small sellers benefit from daily cash flow."
      }
    ]
  },
  {
    category: "For Liquidity Providers",
    questions: [
      {
        q: "How is my yield generated?",
        a: "Every USDC you deposit funds real Amazon seller advances. When sellers use our service, they pay a 2% daily fee — this flows to the pool as your yield."
      },
      {
        q: "What's the risk of default?",
        a: "Each advance is backed by an Amazon receivable — money Amazon owes and will pay. The 20% withheld from sellers acts as a buffer. Default risk is minimal since Amazon is the counterparty."
      },
      {
        q: "When can I withdraw my funds?",
        a: "USDC in the pool is available for withdrawal at any time. However, funds currently deployed in active advances will return when Amazon settles (14-21 days)."
      },
      {
        q: "Is this audited?",
        a: "The smart contracts will be audited before mainnet. All advances, repayments, and fee distributions are recorded on-chain for full transparency."
      }
    ]
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm mb-6">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Got <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Questions?</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            We answer the most common questions from sellers and liquidity providers.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        {faqs.map((category, catIndex) => (
          <div key={catIndex} className="mb-12">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              {category.category === "For Sellers" ? (
                <DollarSign className="w-5 h-5 text-cyan-400" />
              ) : (
                <Shield className="w-5 h-5 text-green-400" />
              )}
              {category.category}
            </h3>
            <div className="space-y-3">
              {category.questions.map((faq, i) => {
                const index = catIndex * 100 + i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/30 transition-colors"
                    >
                      <span className="text-white font-medium pr-4">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        className="px-5 pb-5"
                      >
                        <p className="text-slate-400 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl"
        >
          <h3 className="text-xl font-semibold text-white mb-2">Still have questions?</h3>
          <p className="text-slate-400 mb-4">We're here to help. Reach out to our team.</p>
          <button className="px-6 py-2 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-400 transition-colors">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
}