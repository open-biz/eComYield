"use client";

import { useState, useEffect } from "react";
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
import { SellerBreadcrumb } from "@/components/breadcrumb";

interface DashboardData {
  availableAdvance: number;
  advanceLimit: number;
  feeRate: number;
  stats: {
    todaySales: number;
    todaySalesChange: number;
    pendingSettlement: number;
    pendingSettlementDays: number;
    ordersShipped: number;
    ordersShippedToday: number;
    nextPayout: number;
    nextPayoutDate: string;
  };
  recentAdvances: { date: string; amount: number; status: string }[];
  accountSummary: {
    totalAdvancedMTD: number;
    totalRepaidMTD: number;
    outstandingBalance: number;
  };
}

export default function SellerDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/seller/dashboard")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#0A2E20]/20 border-t-[#0A2E20] rounded-full animate-spin" />
          <p className="text-sm text-[#1C1B18]/50">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-sm text-red-600">Failed to load dashboard data</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  const stats = [
    { label: "Today's Sales", value: formatCurrency(data.stats.todaySales), change: `+${data.stats.todaySalesChange}%`, icon: ShoppingCart },
    { label: "Pending Settlement", value: formatCurrency(data.stats.pendingSettlement), change: `${data.stats.pendingSettlementDays} days`, icon: Clock },
    { label: "Orders Shipped", value: data.stats.ordersShipped.toString(), change: `+${data.stats.ordersShippedToday} today`, icon: PackageCheck },
    { label: "Next Payout", value: formatCurrency(data.stats.nextPayout), change: data.stats.nextPayoutDate, icon: CalendarClock },
  ];

  const recentAdvances = data.recentAdvances.map((adv) => ({
    date: adv.date,
    amount: formatCurrency(adv.amount),
    status: adv.status,
  }));

  return (
    <div className="max-w-5xl">
      <SellerBreadcrumb items={[{ label: "Dashboard" }]} />
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm text-[#1C1B18]/50 font-medium uppercase tracking-wider mb-2">
          Available Advance
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold text-[#1C1B18] tracking-tight">
          {formatCurrency(data.availableAdvance)}
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
                {formatCurrency(data.accountSummary.totalAdvancedMTD)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#1C1B18]/50">Total Repaid (MTD)</span>
              <span className="text-sm font-semibold text-[#1C1B18]">
                {formatCurrency(data.accountSummary.totalRepaidMTD)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#1C1B18]/50">Outstanding Balance</span>
              <span className="text-sm font-semibold text-[#1C1B18]">
                {formatCurrency(data.accountSummary.outstandingBalance)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#1C1B18]/50">Fee Rate</span>
              <span className="text-sm font-semibold text-[#1C1B18]">{data.feeRate}%</span>
            </div>
            <div className="pt-3 border-t border-[#1C1B18]/5 flex items-center justify-between">
              <span className="text-sm text-[#1C1B18]/50">
                Advance Limit
              </span>
              <span className="text-sm font-bold text-[#0A2E20]">
                {formatCurrency(data.advanceLimit)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
