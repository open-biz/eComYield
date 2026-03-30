"use client";

import { TrendingUp, Activity, Calendar, DollarSign } from "lucide-react";
import { SellerBreadcrumb } from "@/components/breadcrumb";

const monthlyData = [
  { month: "Jul", interest: 55.92, balance: 12903.42 },
  { month: "Aug", interest: 112.08, balance: 12959.58 },
  { month: "Sep", interest: 168.49, balance: 13015.99 },
  { month: "Oct", interest: 225.15, balance: 13072.65 },
  { month: "Nov", interest: 282.05, balance: 13129.55 },
  { month: "Dec", interest: 339.19, balance: 13186.69 },
  { month: "Jan", interest: 396.59, balance: 13244.09 },
  { month: "Feb", interest: 454.24, balance: 13301.74 },
  { month: "Mar", interest: 512.13, balance: 13359.63 },
  { month: "Apr", interest: 570.28, balance: 13417.78 },
  { month: "May", interest: 628.68, balance: 13476.18 },
  { month: "Jun", interest: 687.34, balance: 13534.84 },
];

export default function RWAPerformancePage() {
  const currentBalance = 12847.50;
  const projectedBalance = 13534.84;
  const totalInterest = 687.34;
  const apy = 5.35;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(amount);

  const maxBalance = Math.max(...monthlyData.map(d => d.balance));

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <SellerBreadcrumb items={[{ label: "RWA Performance", href: "/seller/rwa-performance" }]} />
        <h1 className="text-3xl font-bold text-[#1C1B18] tracking-tight">RWA Performance</h1>
        <p className="text-[#1C1B18]/60 mt-2">Yield analytics and 12-month balance projection</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-gradient-to-br from-[#0A2E20]/10 to-transparent border border-[#0A2E20]/20 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={18} className="text-[#0A2E20]" />
            <span className="text-sm text-[#1C1B18]/60">Current Balance</span>
          </div>
          <p className="text-2xl font-bold text-[#1C1B18] font-mono">{formatCurrency(currentBalance)}</p>
        </div>
        <div className="bg-gradient-to-br from-[#0A2E20]/10 to-transparent border border-[#0A2E20]/20 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-[#0A2E20]" />
            <span className="text-sm text-[#1C1B18]/60">Projected (12mo)</span>
          </div>
          <p className="text-2xl font-bold text-[#1C1B18] font-mono">{formatCurrency(projectedBalance)}</p>
          <p className="text-xs text-[#0A2E20] mt-1">+{formatCurrency(projectedBalance - currentBalance)}</p>
        </div>
        <div className="bg-gradient-to-br from-[#0A2E20]/10 to-transparent border border-[#0A2E20]/20 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={18} className="text-[#0A2E20]" />
            <span className="text-sm text-[#1C1B18]/60">Interest Earned</span>
          </div>
          <p className="text-2xl font-bold text-[#0A2E20] font-mono">+{formatCurrency(totalInterest)}</p>
          <p className="text-xs text-[#1C1B18]/40 mt-1">YTD</p>
        </div>
        <div className="bg-gradient-to-br from-[#0A2E20]/10 to-transparent border border-[#0A2E20]/20 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={18} className="text-[#0A2E20]" />
            <span className="text-sm text-[#1C1B18]/60">Current APY</span>
          </div>
          <p className="text-2xl font-bold text-[#1C1B18] font-mono">{apy}%</p>
          <p className="text-xs text-[#0A2E20] mt-1">sGHO Active Staking</p>
        </div>
      </div>

      {/* Yield Curve Chart */}
      <div className="bg-[#050505] text-white border border-gray-800 p-6 rounded-3xl shadow-2xl">
        <div className="flex flex-col space-y-1.5 mb-6">
          <h3 className="font-semibold leading-none tracking-tight text-gray-400">Yield Curve</h3>
        </div>
        
        <div className="h-[200px] w-full relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-gray-500 font-mono">
            <span>$14k</span>
            <span>$12k</span>
            <span>$10k</span>
          </div>
          
          {/* Chart area */}
          <div className="ml-14 h-full flex flex-col justify-end gap-1">
            {/* Grid lines */}
            <div className="absolute inset-0 ml-14 flex flex-col justify-between pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-gray-800 w-full" />
              ))}
            </div>
            
            {/* Bars */}
            <div className="flex items-end justify-between h-full relative z-10 gap-1">
              {monthlyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-[#00E08F] rounded-t transition-all hover:opacity-80"
                    style={{ height: `${(d.balance / maxBalance) * 100}%`, minHeight: '4px' }}
                  />
                  <span className="text-[10px] text-gray-500">{d.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00E08F]"></div>
            <span className="text-xs text-gray-400">eComYield Treasury (5.35% APY)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            <span className="text-xs text-gray-400">Traditional Bank (0.01%)</span>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white border border-[#1C1B18]/10 rounded-sm overflow-hidden">
        <div className="p-5 border-b border-[#1C1B18]/10">
          <h2 className="text-lg font-semibold text-[#1C1B18]">Monthly Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F3EC]/50">
              <tr>
                <th className="text-left text-xs font-medium text-[#1C1B18]/50 uppercase tracking-wider px-5 py-3">Month</th>
                <th className="text-right text-xs font-medium text-[#1C1B18]/50 uppercase tracking-wider px-5 py-3">Interest Earned</th>
                <th className="text-right text-xs font-medium text-[#1C1B18]/50 uppercase tracking-wider px-5 py-3">End Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C1B18]/5">
              {monthlyData.map((d, i) => (
                <tr key={i} className="hover:bg-[#F5F3EC]/30 transition-colors">
                  <td className="px-5 py-3 text-sm font-medium text-[#1C1B18]">{d.month}</td>
                  <td className="px-5 py-3 text-sm font-mono text-[#0A2E20]">+{formatCurrency(d.interest)}</td>
                  <td className="px-5 py-3 text-sm font-mono text-[#1C1B18] text-right">{formatCurrency(d.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0A2E20]/5 border border-[#0A2E20]/20">
        <Activity size={20} className="text-[#0A2E20] mt-0.5 shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-[#1C1B18]/70 leading-relaxed">
            Your idle cash is automatically routed to US Treasury Bills via our banking partner. 
            Interest compounds monthly and is paid directly to your account.
          </p>
        </div>
      </div>
    </div>
  );
}