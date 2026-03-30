"use client";

import { useState, useEffect } from "react";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import {
  CircleDollarSign,
  Info,
  ExternalLink,
} from "lucide-react";
import { VaultsBreadcrumb } from "@/components/breadcrumb";
import { SolanaConnectButton } from "@/components/solana-connect-button";
import { DepositModal } from "@/components/deposit-modal";
import { WithdrawModal } from "@/components/withdraw-modal";
import { TransactionHistory } from "@/components/transaction-history";

interface Transaction {
  id: string;
  type: "deposit" | "withdraw" | "yield";
  amount: number;
  timestamp: string;
  status: "completed" | "pending";
  txHash?: string;
}

interface VaultData {
  vault: { name: string; status: string; epoch: number; epochTimeRemaining: string };
  stats: {
    totalValueLocked: number;
    tvlChange: number;
    currentAPY: number;
    apyChange: number;
    poolUtilization: number;
    utilizationChange: number;
    activeAdvances: number;
    activeAdvancesChange: number;
  };
  parameters: { label: string; value: string }[];
  userPosition: { deposited: number | null; earnedYield: number | null; walletConnected: boolean };
  recentActivity: { action: string; amount: number; wallet: string; time: string }[];
  userTransactions: Transaction[];
}

// Mock trusted by logos (would be real logos in production)
const trustedByLogos = [
  { name: "Steakhouse", color: "#FF6B35" },
  { name: "Gauntlet", color: "#1E3A5F" },
  { name: "Yearn", color: "#FFFFFF" },
  { name: "Anthias", color: "#00D4AA" },
];

export default function VaultsPage() {
  const { connected: isConnected, publicKey: address } = useSolanaWallet();
  const [data, setData] = useState<VaultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "advanced" | "activity">("overview");

  useEffect(() => {
    fetch("/api/vaults")
      .then((res) => res.json())
      .then((data) => {
        if (isConnected && address) {
          data.userPosition = {
            deposited: 10000,
            earnedYield: 245.50,
            walletConnected: true,
          };
          data.userTransactions = [
            { id: "1", type: "deposit", amount: 5000, timestamp: "2024-12-01T10:00:00Z", status: "completed", txHash: "5x9K2...3p2m" },
            { id: "2", type: "yield", amount: 42.50, timestamp: "2024-12-08T00:00:00Z", status: "completed", txHash: "7m3H1...8k4n" },
            { id: "3", type: "deposit", amount: 5000, timestamp: "2024-12-15T14:30:00Z", status: "completed", txHash: "2n8P4...5q7r" },
            { id: "4", type: "yield", amount: 78.25, timestamp: "2024-12-22T00:00:00Z", status: "completed", txHash: "9s2T6...1v8w" },
            { id: "5", type: "yield", amount: 124.75, timestamp: "2025-01-05T00:00:00Z", status: "completed", txHash: "4y7U9...2x3z" },
          ];
        } else {
          data.userTransactions = [];
        }
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isConnected]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#0A2E20]/20 border-t-[#0A2E20] rounded-full animate-spin" />
          <p className="text-sm text-[#1C1B18]/50">Loading vault data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div className="text-sm text-red-600">Failed to load vault data</div>;
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

  const formatCompact = (amount: number) => {
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(2)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(2)}M`;
    return formatCurrency(amount);
  };

  const formatUSDC = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "decimal", maximumFractionDigits: 2 }).format(amount / 1e6) + "M USDC";

  return (
    <div className="space-y-6">
      <VaultsBreadcrumb items={[{ label: "Markets", href: "/vaults" }]} />

      {/* Hero Section - Token Pair & Stats */}
      <div className="rounded-xl border border-[#1C1B18]/10 bg-white p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left: Token Pair */}
          <div className="flex items-center gap-4">
            {/* Stacked Token Icons */}
            <div className="relative">
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-[#F5F3EC] bg-gradient-to-br from-[#0A2E20] to-[#0A2E20]/80">
                <span className="text-lg font-bold text-white">RWA</span>
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white bg-[#2774CA]">
                <span className="text-xs font-bold text-white">USDC</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-[#1C1B18]">
                  RWA / USDC
                </h1>
                <span className="rounded-full bg-[#0A2E20]/10 px-2 py-0.5 text-xs font-medium text-[#0A2E20]">
                  86%
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                {isConnected && address && (
                  <button className="flex items-center gap-2 rounded-md border border-[#1C1B18]/10 px-3 py-1.5 text-[#1C1B18] hover:bg-[#F5F3EC] transition-colors">
                    <span className="font-mono text-xs">{address?.toString().slice(0, 6)}...{address?.toString().slice(-4)}</span>
                  </button>
                )}
                <span className="inline-flex items-center gap-1 rounded-md bg-[#F5F3EC] px-2 py-1 text-xs font-medium text-[#1C1B18]/60">
                  <span className="h-2 w-2 rounded-full bg-[#0A2E20]" />
                  Solana
                </span>
              </div>
            </div>
          </div>

          {/* Right: Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {/* Total Market Size */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-[#1C1B18]/50">
                  Total Market Size
                </span>
                <Info size={14} className="text-[#1C1B18]/30" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tight text-[#1C1B18]">
                  {formatCompact(data.stats.totalValueLocked * 100)}
                </span>
              </div>
              <span className="text-xs text-[#1C1B18]/40">
                {formatUSDC(data.stats.totalValueLocked * 100)}
              </span>
            </div>

            {/* Total Liquidity */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-[#1C1B18]/50">
                  Total Liquidity
                </span>
                <Info size={14} className="text-[#1C1B18]/30" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tight text-[#1C1B18]">
                  {formatCompact(data.stats.totalValueLocked)}
                </span>
              </div>
              <span className="text-xs text-[#1C1B18]/40">
                {formatUSDC(data.stats.totalValueLocked)}
              </span>
            </div>

            {/* Rate / APY */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-[#1C1B18]/50">
                  Rate
                </span>
                <Info size={14} className="text-[#1C1B18]/30" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-[#0A2E20]">
                  {data.stats.currentAPY}
                </span>
                <span className="text-lg font-semibold text-[#0A2E20]">%</span>
              </div>
              <span className="text-xs text-[#1C1B18]/40">APY</span>
            </div>

            {/* Trusted By */}
            <div className="space-y-2">
              <span className="text-xs font-medium uppercase tracking-wider text-[#1C1B18]/50">
                Trusted By
              </span>
              <div className="flex items-center gap-2">
                {trustedByLogos.map((logo, i) => (
                  <div
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#1C1B18]/10"
                    style={{ backgroundColor: logo.color }}
                    title={logo.name}
                  >
                    <span className="text-[10px] font-bold text-white">{logo.name.slice(0, 2)}</span>
                  </div>
                ))}
                <span className="text-xs text-[#1C1B18]/40">+2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deposit Button */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-[#1C1B18]/10">
          <div className="space-y-1">
            <p className="text-sm text-[#1C1B18]/60">
              Institutional-grade yield from tokenized Amazon seller receivables. Senior tranche with first-loss protection.
            </p>
            <p className="text-xs text-[#1C1B18]/40">
              Epoch {data.vault.epoch} · {data.vault.epochTimeRemaining} remaining
            </p>
          </div>
          <button
            onClick={() => setShowDepositModal(true)}
            className="flex h-12 items-center gap-2 rounded-lg bg-[#0A2E20] px-6 text-sm font-semibold tracking-wide text-[#F5F3EC] transition-all hover:opacity-90 hover:shadow-lg"
          >
            <CircleDollarSign size={18} />
            Deposit USDC
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#1C1B18]/10">
        <div className="flex gap-8">
          {(["overview", "advanced", "activity"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative py-4 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "text-[#1C1B18]"
                  : "text-[#1C1B18]/50 hover:text-[#1C1B18]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0A2E20]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Market Attributes */}
          <div className="lg:col-span-2 rounded-xl border border-[#1C1B18]/10 bg-white">
            <div className="border-b border-[#1C1B18]/10 px-6 py-4">
              <h2 className="text-sm font-medium uppercase tracking-wider text-[#1C1B18]/50">
                Market Attributes
              </h2>
            </div>
            <div className="divide-y divide-[#1C1B18]/5">
              {/* Collateral */}
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-sm font-medium text-[#1C1B18]">Collateral</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0A2E20] to-[#0A2E20]/80">
                      <span className="text-xs font-bold text-white">RWA</span>
                    </div>
                    <span className="text-sm font-medium text-[#1C1B18]">RWA</span>
                  </div>
                  <button className="flex h-6 w-6 items-center justify-center text-[#1C1B18]/40 hover:text-[#1C1B18] transition-colors">
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
              {/* Loan */}
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-sm font-medium text-[#1C1B18]">Loan</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2774CA]">
                      <span className="text-xs font-bold text-white">USDC</span>
                    </div>
                    <span className="text-sm font-medium text-[#1C1B18]">USDC</span>
                  </div>
                  <button className="flex h-6 w-6 items-center justify-center text-[#1C1B18]/40 hover:text-[#1C1B18] transition-colors">
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
              {/* LTV */}
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-sm font-medium text-[#1C1B18]">Max LTV</span>
                <span className="text-sm font-semibold text-[#0A2E20]">75%</span>
              </div>
              {/* Utilization */}
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-sm font-medium text-[#1C1B18]">Utilization</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-[#1C1B18]/10">
                    <div
                      className="h-full rounded-full bg-[#0A2E20]"
                      style={{ width: `${data.stats.poolUtilization}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-[#1C1B18]">{data.stats.poolUtilization}%</span>
                </div>
              </div>
              {/* Active Advances */}
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-sm font-medium text-[#1C1B18]">Active Advances</span>
                <span className="text-sm font-semibold text-[#1C1B18]">{data.stats.activeAdvances}</span>
              </div>
            </div>
          </div>

          {/* Your Position */}
          <div className="rounded-xl border border-[#1C1B18]/10 bg-white p-6">
            <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-[#1C1B18]/50">
              Your Position
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#1C1B18]/50">Deposited</span>
                <p className="text-3xl font-bold tracking-tight text-[#1C1B18]">
                  {data.userPosition.deposited ? formatCurrency(data.userPosition.deposited) : "—"}
                  <span className="ml-1 text-lg font-medium text-[#1C1B18]/50">USDC</span>
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#1C1B18]/50">Earned Yield</span>
                <p className="text-2xl font-bold text-[#0A2E20]">
                  {data.userPosition.earnedYield ? formatCurrency(data.userPosition.earnedYield) : "—"}
                  <span className="ml-1 text-sm font-medium text-[#0A2E20]/70">USDC</span>
                </p>
              </div>
              {isConnected ? (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowDepositModal(true)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0A2E20] py-3 text-sm font-semibold text-[#F5F3EC] transition-all hover:opacity-90"
                  >
                    <CircleDollarSign size={16} />
                    Deposit
                  </button>
                  <button
                    onClick={() => setShowWithdrawModal(true)}
                    className="flex flex-1 items-center justify-center rounded-lg border-2 border-[#1C1B18] py-3 text-sm font-semibold text-[#1C1B18] transition-all hover:bg-[#F5F3EC]"
                  >
                    Withdraw
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-2 rounded-lg bg-[#F5F3EC] p-3">
                    <Info size={14} className="mt-0.5 shrink-0 text-[#1C1B18]/40" />
                    <p className="text-xs leading-relaxed text-[#1C1B18]/50">
                      Connect your wallet to view your position and deposit into this vault.
                    </p>
                  </div>
                  <SolanaConnectButton />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "advanced" && (
        <div className="rounded-xl border border-[#1C1B18]/10 bg-white">
          <div className="border-b border-[#1C1B18]/10 px-6 py-4">
            <h2 className="text-sm font-medium uppercase tracking-wider text-[#1C1B18]/50">
              Vault Parameters
            </h2>
          </div>
          <div className="divide-y divide-[#1C1B18]/5">
            {data.parameters.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between px-6 py-4"
              >
                <span className="text-sm text-[#1C1B18]/60">{row.label}</span>
                <span className="text-sm font-medium text-[#1C1B18]">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="rounded-xl border border-[#1C1B18]/10 bg-white">
          <div className="border-b border-[#1C1B18]/10 px-6 py-4">
            <h2 className="text-sm font-medium uppercase tracking-wider text-[#1C1B18]/50">
              Recent Vault Activity
            </h2>
          </div>
          <div className="divide-y divide-[#1C1B18]/5">
            {data.recentActivity.map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`inline-flex w-28 items-center text-xs font-medium tracking-wide ${
                      row.amount > 0 ? "text-[#0A2E20]" : "text-[#1C1B18]/60"
                    }`}
                  >
                    {row.action}
                  </span>
                  <span className="text-sm font-medium text-[#1C1B18]">
                    {row.amount > 0 ? "+" : ""}{formatCurrency(row.amount)}
                  </span>
                </div>
                <div className="hidden items-center gap-6 sm:flex">
                  <span className="text-xs font-mono text-[#1C1B18]/40">{row.wallet}</span>
                  <span className="text-xs text-[#1C1B18]/40">{row.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Transaction History */}
      {isConnected && data.userTransactions.length > 0 && (
        <TransactionHistory transactions={data.userTransactions} />
      )}

      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        vaultName={data.vault.name}
        currentAPY={data.stats.currentAPY}
        minDeposit={1000}
      />

      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        vaultName={data.vault.name}
        deposited={data.userPosition.deposited || 0}
        earnedYield={data.userPosition.earnedYield || 0}
      />
    </div>
  );
}