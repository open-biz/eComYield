"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, DollarSign, TrendingUp, Package, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface DemoConnectProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (demoId: string) => void;
}

export default function DemoConnect({ isOpen, onClose, onConnect }: DemoConnectProps) {
  const [step, setStep] = useState<"select" | "connecting" | "success">("select");
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const demoAccounts = [
    {
      id: "demo1",
      name: "TechGear Pro",
      category: "Electronics",
      dailySales: 12450,
      monthlySales: 373500,
      rating: 4.8,
      daysActive: 847,
    },
    {
      id: "demo2",
      name: "Home Essentials Co",
      category: "Home & Kitchen",
      dailySales: 8320,
      monthlySales: 249600,
      rating: 4.6,
      daysActive: 523,
    },
    {
      id: "demo3",
      name: "FitLife Active",
      category: "Sports & Outdoors",
      dailySales: 15890,
      monthlySales: 476700,
      rating: 4.9,
      daysActive: 1203,
    },
  ];

  const handleConnect = (demoId: string) => {
    setSelectedDemo(demoId);
    setStep("connecting");
    setTimeout(() => {
      setStep("success");
    }, 2000);
  };

  const handleSuccess = () => {
    if (selectedDemo) {
      onConnect(selectedDemo);
    }
    onClose();
    setStep("select");
    setSelectedDemo(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Connect Amazon Store</h3>
                  <p className="text-slate-400 text-sm">Demo Mode</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === "select" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-slate-400 mb-6">
                    Select a demo account to explore how eComYield works with real Amazon seller data.
                  </p>
                  <div className="space-y-3">
                    {demoAccounts.map((demo) => (
                      <button
                        key={demo.id}
                        onClick={() => handleConnect(demo.id)}
                        className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-cyan-500/50 transition-all text-left group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                            {demo.name}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-400">
                            {demo.category}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-slate-500 text-xs">Daily Sales</div>
                            <div className="text-white font-medium">${demo.dailySales.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-slate-500 text-xs">Monthly</div>
                            <div className="text-white font-medium">${(demo.monthlySales / 1000).toFixed(0)}K</div>
                          </div>
                          <div>
                            <div className="text-slate-500 text-xs">Rating</div>
                            <div className="text-white font-medium">⭐ {demo.rating}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
                    <p className="text-cyan-300 text-sm">
                      💡 Each demo account shows different sales volumes to illustrate our advance calculations.
                    </p>
                  </div>
                </motion.div>
              )}

              {step === "connecting" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Package className="w-8 h-8 text-cyan-400" />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Connecting to Amazon...</h3>
                  <p className="text-slate-400">
                    Fetching sales data via SP-API
                  </p>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Store Connected!</h3>
                  <p className="text-slate-400 mb-6">
                    Your Amazon store is now linked to eComYield
                  </p>
                  <button
                    onClick={handleSuccess}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all"
                  >
                    View Dashboard →
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}