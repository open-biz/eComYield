"use client";

import {
  DollarSign,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ShoppingCart,
  PackageCheck,
  CalendarClock,
  Wallet,
} from "lucide-react";

const stats = [
  {
    label: "Today's Sales",
    value: "$1,842.30",
    change: "+12.4%",
    icon: ShoppingCart,
  },
  {
    label: "Pending Settlement",
    value: "$6,210.00",
    change: "3 days",
    icon: Clock,
  },
  {
    label: "Orders Shipped",
    value: "47",
    change: "+8 today",
    icon: PackageCheck,
  },
  {
    label: "Next Payout",
    value: "$3,105.00",
    change: "Tomorrow",
    icon: CalendarClock,
  },
];

const recentAdvances = [
  { date: "Jun 12, 2025", amount: "$2,500.00", status: "Repaid" },
  { date: "Jun 5, 2025", amount: "$3,800.00", status: "Repaid" },
  { date: "May 28, 2025", amount: "$1,900.00", status: "Repaid" },
];

export default function SellerDashboard() {
  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm text-[#1C1B18]/50 font-medium uppercase tracking-wider mb-2">
          Available Advance
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold text-[#1C1B18] tracking-tight">
          $4,250.00
        </h1>
        <p className="mt-3 text-sm text-[#1C1B18]/50">
          Based on your trailing 7-day average net sales
        </p>

        <button className="mt-6 inline-flex items-center gap-2 bg-[#0A2E20] text-[#F5F3EC] px-6 py-3 rounded-none text-sm font-medium hover:bg-[#0A2E20]/90 transition-colors">
          <Wallet size={16} strokeWidth={1.5} />
          Request Payout
          <ArrowUpRight size={14} strokeWidth={2} />
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[#EBE8DE] border border-[#1C1B18]/5 rounded-sm p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon
                  size={18}
                  className="text-[#1C1B18]/30"
                  strokeWidth={1.5}
                />
                <span className="text-xs text-[#0A2E20] font-medium">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-[#1C1B18] tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs text-[#1C1B18]/50 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Two column section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Advances */}
        <div className="bg-[#EBE8DE] border border-[#1C1B18]/5 rounded-sm">
          <div className="px-5 py-4 border-b border-[#1C1B18]/5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#1C1B18]">
              Recent Advances
            </h2>
            <DollarSign
              size={16}
              className="text-[#1C1B18]/30"
              strokeWidth={1.5}
            />
          </div>
          <div className="divide-y divide-[#1C1B18]/5">
            {recentAdvances.map((advance, i) => (
              <div
                key={i}
                className="px-5 py-3.5 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-[#1C1B18]">
                    {advance.amount}
                  </p>
                  <p className="text-xs text-[#1C1B18]/40 mt-0.5">
                    {advance.date}
                  </p>
                </div>
                <span className="text-xs font-medium text-[#0A2E20] bg-[#0A2E20]/10 px-2.5 py-1 rounded-sm">
                  {advance.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Account Summary */}
        <div className="bg-[#EBE8DE] border border-[#1C1B18]/5 rounded-sm">
          <div className="px-5 py-4 border-b border-[#1C1B18]/5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#1C1B18]">
              Account Summary
            </h2>
            <TrendingUp
              size={16}
              className="text-[#1C1B18]/30"
              strokeWidth={1.5}
            />
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#1C1B18]/50">Total Advanced (MTD)</span>
              <span className="text-sm font-semibold text-[#1C1B18]">
                $12,450.00
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#1C1B18]/50">Total Repaid (MTD)</span>
              <span className="text-sm font-semibold text-[#1C1B18]">
                $8,200.00
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#1C1B18]/50">Outstanding Balance</span>
              <span className="text-sm font-semibold text-[#1C1B18]">
                $4,250.00
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#1C1B18]/50">Fee Rate</span>
              <span className="text-sm font-semibold text-[#1C1B18]">1.5%</span>
            </div>
            <div className="pt-3 border-t border-[#1C1B18]/5 flex items-center justify-between">
              <span className="text-sm text-[#1C1B18]/50">
                Advance Limit
              </span>
              <span className="text-sm font-bold text-[#0A2E20]">
                $10,000.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
