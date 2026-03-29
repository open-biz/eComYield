"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  onConnectStore?: () => void;
  onEarnYield?: () => void;
}

export default function HeroSection({ onConnectStore, onEarnYield }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Logo + Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="relative w-16 h-16">
            <Image
              src="/eComYield-logo.jpeg"
              alt="eComYield Logo"
              fill
              priority
              className="rounded-2xl object-cover shadow-lg shadow-cyan-500/30"
            />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            RWA-Backed Stablecoin Protocol
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Amazon Holds Your
          <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Money for 7-21 Days</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto"
        >
          We advance you up to <span className="text-cyan-400 font-semibold">80% of your daily sales</span> the same day Amazon confirms the order — no waiting 7-21 days for settlement.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button 
            onClick={onConnectStore}
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
          >
            Connect Amazon Store
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={onEarnYield}
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-slate-600 text-slate-300 font-semibold text-lg hover:bg-slate-800/50 transition-all"
          >
            Earn Yield
          </button>
        </motion.div>

        {/* The Problem - Solution highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          <div className="text-center px-8 py-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
            <div className="text-4xl font-bold text-red-400 mb-2">7-21</div>
            <div className="text-slate-400">Days Amazon Holds Funds</div>
          </div>
          <div className="flex items-center text-slate-500">
            <span className="text-2xl">→</span>
          </div>
          <div className="text-center px-8 py-6 bg-green-500/10 border border-green-500/30 rounded-2xl">
            <div className="text-4xl font-bold text-green-400 mb-2">Same Day</div>
            <div className="text-slate-400">With eComYield</div>
          </div>
        </motion.div>

        {/* Features pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: Shield, text: "KYC via Amazon Data" },
            { icon: Zap, text: "24/7/365 Settlement" },
            { icon: Globe, text: "Global Access" },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-sm">
              <feature.icon className="w-4 h-4 text-cyan-400" />
              {feature.text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 rounded-full bg-slate-400"
          />
        </div>
      </motion.div>
    </section>
  );
}