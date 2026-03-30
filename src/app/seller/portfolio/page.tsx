"use client";

import { TrendingUp, DollarSign, Wallet, PieChart } from "lucide-react";
import { SellerBreadcrumb } from "@/components/breadcrumb";

const portfolioPositions = [
  {
    id: 1,
    type: "Active Advance",
    name: "Advance #A-2024-001",
    amount: 15000,
    yield: 8.5,
    status: "Active",
    startDate: "2024-12-01",
    endDate: "2025-02-28",
    collateral: "Amazon Account",
  },
  {
    id: 2,
    type: "Active Advance",
    name: "Advance #A-2024-002",
    amount: 8500,
    yield: 8.5,
    status: "Active",
    startDate: "2024-12-15",
    endDate: "2025-03-15",
    collateral: "Shopify Store",
  },
];

const savingsAccounts = [
  {
    name: "eComYield Business Savings",
    balance: 5420,
    apy: 4.5,
    type: "High-Yield Savings",
  },
];

export default function PortfolioPage() {
  const totalAdvances = portfolioPositions.reduce((sum, p) => sum + p.amount, 0);
  const totalSavings = savingsAccounts.reduce((sum, p) => sum + p.balance, 0);
  const totalValue = totalAdvances + totalSavings;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(amount);

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <SellerBreadcrumb items={[{ label: "Portfolio", href: "/seller/portfolio" }]} />
        <h1 className="text-3xl font-bold text-[#1C1B18] tracking-tight">Portfolio</h1>
        <p className="text-[#1C1B18]/60 mt-2">Overview of your advances and savings positions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-white border border-[#1C1B18]/10 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <Wallet size={18} className="text-[#0A2E20]" />
            <span className="text-sm text-[#1C1B18]/60">Total Value</span>
          </div>
          <p className="text-2xl font-bold text-[#1C1B18] font-mono">{formatCurrency(totalValue)}</p>
        </div>
        <div className="bg-white border border-[#1C1B18]/10 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={18} className="text-[#0A2E20]" />
            <span className="text-sm text-[#1C1B18]/60">Active Advances</span>
          </div>
          <p className="text-2xl font-bold text-[#1C1B18] font-mono">{formatCurrency(totalAdvances)}</p>
          <p className="text-xs text-[#1C1B18]/40 mt-1">{portfolioPositions.length} positions</p>
        </div>
        <div className="bg-white border border-[#1C1B18]/10 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-[#0A2E20]" />
            <span className="text-sm text-[#1C1B18]/60">Savings Balance</span>
          </div>
          <p className="text-2xl font-bold text-[#1C1B18] font-mono">{formatCurrency(totalSavings)}</p>
          <p className="text-xs text-[#0A2E20] mt-1">4.5% APY</p>
        </div>
        <div className="bg-white border border-[#1C1B18]/10 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <PieChart size={18} className="text-[#0A2E20]" />
            <span className="text-sm text-[#1C1B18]/60">Avg. Yield</span>
          </div>
          <p className="text-2xl font-bold text-[#1C1B18] font-mono">8.5%</p>
          <p className="text-xs text-[#1C1B18]/40 mt-1">on advances</p>
        </div>
      </div>

      {/* Active Advances */}
      <div className="bg-white border border-[#1C1B18]/10 rounded-sm overflow-hidden">
        <div className="p-5 border-b border-[#1C1B18]/10">
          <h2 className="text-lg font-semibold text-[#1C1B18]">Active Advances</h2>
        </div>
        <div className="divide-y divide-[#1C1B18]/5">
          {portfolioPositions.map((position) => (
            <div key={position.id} className="p-5 hover:bg-[#F5F3EC]/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-[#1C1B18]">{position.name}</h3>
                    <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium bg-[#0A2E20]/10 text-[#0A2E20] border-[#0A2E20]/20">
                      {position.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#1C1B18]/60">
                    <span>{position.type}</span>
                    <span>•</span>
                    <span>Collateral: {position.collateral}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#1C1B18]/50">
                    <span>Started: {position.startDate}</span>
                    <span>•</span>
                    <span>Ends: {position.endDate}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-[#1C1B18] font-mono">{formatCurrency(position.amount)}</p>
                  <p className="text-sm text-[#0A2E20]">{position.yield}% yield</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Savings Accounts */}
      <div className="bg-white border border-[#1C1B18]/10 rounded-sm overflow-hidden">
        <div className="p-5 border-b border-[#1C1B18]/10">
          <h2 className="text-lg font-semibold text-[#1C1B18]">High-Yield Savings</h2>
        </div>
        <div className="divide-y divide-[#1C1B18]/5">
          {savingsAccounts.map((account, i) => (
            <div key={i} className="p-5 hover:bg-[#F5F3EC]/30 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-[#1C1B18]">{account.name}</h3>
                  <p className="text-sm text-[#1C1B18]/50">{account.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-[#1C1B18] font-mono">{formatCurrency(account.balance)}</p>
                  <p className="text-sm text-[#0A2E20]">{account.apy}% APY</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}