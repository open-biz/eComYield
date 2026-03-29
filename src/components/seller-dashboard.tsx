"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  DollarSign, 
  Package, 
  Clock, 
  ArrowDownToLine, 
  Wallet,
  X,
  Calendar,
  ArrowRight
} from "lucide-react";
import Image from "next/image";

interface SellerDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  sellerName: string;
  dailySales: number;
}

export default function SellerDashboard({ isOpen, onClose, sellerName, dailySales }: SellerDashboardProps) {
  if (!isOpen) return null;

  const advanceAmount = dailySales * 0.8;
  const feeAmount = advanceAmount * 0.02;
  const sellerReceives = advanceAmount - feeAmount;
  const withheldAmount = dailySales * 0.2;

  // Mock daily sales data for the last 7 days
  const weeklyData = [
    { day: "Mon", sales: dailySales * 0.9, orders: 145 },
    { day: "Tue", sales: dailySales * 1.1, orders: 178 },
    { day: "Wed", sales: dailySales * 0.85, orders: 132 },
    { day: "Thu", sales: dailySales * 1.2, orders: 189 },
    { day: "Fri", sales: dailySales * 1.3, orders: 201 },
    { day: "Sat", sales: dailySales * 1.15, orders: 175 },
    { day: "Sun", sales: dailySales, orders: 156 },
  ];

  const maxSales = Math.max(...weeklyData.map(d => d.sales));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-950 overflow-y-auto"
    >
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <Image
                    src="/eComYield-logo.jpeg"
                    alt="eComYield Logo"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-white font-bold text-lg">Seller Dashboard</h1>
                  <p className="text-slate-400 text-sm">{sellerName} • Amazon</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-sm font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Today's Advance Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-cyan-300 text-sm font-medium mb-2">Today's Cash Advance Available</p>
              <div className="text-5xl font-bold text-white mb-2">
                ${sellerReceives.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <p className="text-slate-400 text-sm">
                80% of ${dailySales.toLocaleString()} net sales • 2% fee applied
              </p>
            </div>
            <button className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25">
              <ArrowDownToLine className="w-5 h-5" />
              Claim Advance
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Breakdown */}
          <div className="mt-8 pt-6 border-t border-cyan-500/20 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-slate-400 text-xs mb-1">Net Sales Today</div>
              <div className="text-white font-semibold">${dailySales.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-slate-400 text-xs mb-1">Advance (80%)</div>
              <div className="text-cyan-400 font-semibold">${advanceAmount.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-slate-400 text-xs mb-1">Fee (2%)</div>
              <div className="text-orange-400 font-semibold">-${feeAmount.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-slate-400 text-xs mb-1">Withheld (20%)</div>
              <div className="text-slate-300 font-semibold">${withheldAmount.toLocaleString()}</div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: DollarSign, label: "Monthly Sales", value: `$${(dailySales * 30 / 1000).toFixed(0)}K`, change: "+12%" },
            { icon: Package, label: "Orders Today", value: "156", change: "+8%" },
            { icon: Clock, label: "Pending Settlement", value: "$42.3K", change: "14-21d" },
            { icon: Wallet, label: "Available Credit", value: "$89.6K", change: "80%" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <stat.icon className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-400 text-sm">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className={`text-xs mt-1 ${stat.change.startsWith("+") ? "text-green-400" : stat.change.includes("d") ? "text-slate-500" : "text-slate-400"}`}>
                {stat.change}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weekly Sales Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold">Last 7 Days Sales</h3>
              <p className="text-slate-400 text-sm">Net sales after Amazon fees</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">Last 7 days</span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyData.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-slate-800 rounded-t-lg relative overflow-hidden" style={{ height: `${(day.sales / maxSales) * 100}%` }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500 to-cyan-400"
                  />
                </div>
                <span className="text-slate-500 text-xs">{day.day}</span>
                <span className="text-white text-xs font-medium">${(day.sales / 1000).toFixed(1)}K</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Advances */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
        >
          <h3 className="text-white font-semibold mb-4">Recent Advances</h3>
          <div className="space-y-3">
            {[
              { date: "Today", amount: sellerReceives, status: "Claimed", time: "2 hours ago" },
              { date: "Yesterday", amount: sellerReceives * 0.95, status: "Settled", time: "Settled" },
              { date: "2 days ago", amount: sellerReceives * 1.1, status: "Settled", time: "Settled" },
              { date: "3 days ago", amount: sellerReceives * 0.88, status: "Settled", time: "Settled" },
            ].map((advance, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <div>
                  <div className="text-white font-medium">${advance.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  <div className="text-slate-500 text-sm">{advance.date} • {advance.time}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  advance.status === "Claimed" 
                    ? "bg-cyan-500/20 text-cyan-400" 
                    : "bg-green-500/20 text-green-400"
                }`}>
                  {advance.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}