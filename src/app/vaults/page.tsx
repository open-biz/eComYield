"use client";

import {
  Vault,
  TrendingUp,
  Activity,
  ArrowUpRight,
  CircleDollarSign,
  Info,
  ChevronRight,
} from "lucide-react";

const stats = [
  {
    label: "Total Value Locked",
    value: "$12,840,000",
    change: "+4.2%",
    icon: Vault,
  },
  {
    label: "Current APY",
    value: "9.74%",
    change: "+0.31%",
    icon: TrendingUp,
  },
  {
    label: "Pool Utilization",
    value: "87.3%",
    change: "+1.8%",
    icon: Activity,
  },
  {
    label: "Active Advances",
    value: "214",
    change: "+12",
    icon: ArrowUpRight,
  },
];

export default function VaultsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-sm border border-[#0A2E20]/20 bg-[#0A2E20]/5 px-2 py-0.5 text-xs font-medium tracking-widest text-[#0A2E20] uppercase">
              Live
            </span>
            <span className="text-xs tracking-wide text-[#1C1B18]/50">
              Epoch 47 · 6d 14h remaining
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1C1B18] lg:text-4xl">
            AMZN-USDC Receivables Vault
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-[#1C1B18]/60">
            Institutional-grade yield from tokenized Amazon seller receivables.
            Senior tranche with first-loss protection.
          </p>
        </div>

        <button className="flex h-12 items-center gap-2 rounded-none bg-[#0A2E20] px-7 text-sm font-medium tracking-wide text-[#F5F3EC] transition-opacity hover:opacity-90">
          <CircleDollarSign size={16} />
          Deposit USDC
        </button>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#1C1B18]/10" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-px border border-[#1C1B18]/10 bg-[#1C1B18]/10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex flex-col justify-between gap-4 bg-[#F5F3EC] p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium tracking-widest text-[#1C1B18]/50 uppercase">
                  {stat.label}
                </span>
                <Icon size={16} className="text-[#1C1B18]/30" />
              </div>
              <div className="flex items-end gap-3">
                <span className="text-2xl font-bold tracking-tight text-[#1C1B18]">
                  {stat.value}
                </span>
                <span className="mb-0.5 text-xs font-medium text-[#0A2E20]">
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vault Details Section */}
      <div className="grid grid-cols-1 gap-px border border-[#1C1B18]/10 bg-[#1C1B18]/10 lg:grid-cols-3">
        {/* Left: Vault Parameters */}
        <div className="col-span-1 space-y-5 bg-[#F5F3EC] p-6 lg:col-span-2">
          <h2 className="text-sm font-medium tracking-widest text-[#1C1B18]/50 uppercase">
            Vault Parameters
          </h2>
          <div className="space-y-0">
            {[
              { label: "Underlying Asset", value: "Amazon Seller Receivables" },
              { label: "Settlement Token", value: "USDC (Solana)" },
              { label: "Lock Period", value: "14 Days Rolling" },
              { label: "Min. Deposit", value: "1,000 USDC" },
              { label: "Risk Tranche", value: "Senior" },
              { label: "Collateral Ratio", value: "125%" },
            ].map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between py-3 ${
                  i > 0 ? "border-t border-[#1C1B18]/5" : ""
                }`}
              >
                <span className="text-sm text-[#1C1B18]/60">{row.label}</span>
                <span className="text-sm font-medium text-[#1C1B18]">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Your Position */}
        <div className="col-span-1 space-y-5 bg-[#EBE8DE] p-6">
          <h2 className="text-sm font-medium tracking-widest text-[#1C1B18]/50 uppercase">
            Your Position
          </h2>
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs text-[#1C1B18]/50">Deposited</span>
              <p className="text-2xl font-bold tracking-tight text-[#1C1B18]">
                — USDC
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-[#1C1B18]/50">Earned Yield</span>
              <p className="text-lg font-bold text-[#0A2E20]">— USDC</p>
            </div>
            <div className="h-px bg-[#1C1B18]/10" />
            <div className="flex items-start gap-2 rounded-sm bg-[#F5F3EC] p-3">
              <Info size={14} className="mt-0.5 shrink-0 text-[#1C1B18]/40" />
              <p className="text-xs leading-relaxed text-[#1C1B18]/50">
                Connect your Solana wallet to view your position and deposit
                into this vault.
              </p>
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded-none border border-[#1C1B18]/15 bg-[#F5F3EC] px-5 py-3 text-sm font-medium text-[#1C1B18] transition-colors hover:bg-[#1C1B18]/5">
              Connect Wallet
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="border border-[#1C1B18]/10">
        <div className="border-b border-[#1C1B18]/10 bg-[#F5F3EC] px-6 py-4">
          <h2 className="text-sm font-medium tracking-widest text-[#1C1B18]/50 uppercase">
            Recent Vault Activity
          </h2>
        </div>
        <div className="divide-y divide-[#1C1B18]/5 bg-[#F5F3EC]">
          {[
            {
              action: "Deposit",
              amount: "+25,000 USDC",
              wallet: "8xK2…mP4d",
              time: "12 min ago",
            },
            {
              action: "Advance Funded",
              amount: "−18,400 USDC",
              wallet: "Protocol",
              time: "34 min ago",
            },
            {
              action: "Repayment",
              amount: "+19,122 USDC",
              wallet: "Seller #1847",
              time: "1h ago",
            },
            {
              action: "Deposit",
              amount: "+50,000 USDC",
              wallet: "3nYq…vR7w",
              time: "2h ago",
            },
            {
              action: "Yield Distributed",
              amount: "+2,841 USDC",
              wallet: "Epoch 46",
              time: "6h ago",
            },
          ].map((row, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-6 py-3.5"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`inline-flex w-28 items-center text-xs font-medium tracking-wide ${
                    row.action === "Deposit" || row.action === "Repayment" || row.action === "Yield Distributed"
                      ? "text-[#0A2E20]"
                      : "text-[#1C1B18]/60"
                  }`}
                >
                  {row.action}
                </span>
                <span className="text-sm font-medium text-[#1C1B18]">
                  {row.amount}
                </span>
              </div>
              <div className="hidden items-center gap-6 sm:flex">
                <span className="text-xs font-mono text-[#1C1B18]/40">
                  {row.wallet}
                </span>
                <span className="text-xs text-[#1C1B18]/40">{row.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
