"use client";

import { useState, useEffect } from "react";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import {
  Vault,
  TrendingUp,
  Activity,
  ArrowUpRight,
  CircleDollarSign,
  Info,
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

export default function VaultsPage() {
  const { connected: isConnected, publicKey: address } = useSolanaWallet();
  const [data, setData] = useState<VaultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    // In production, pass wallet address to fetch user position
    fetch("/api/vaults")
      .then((res) => res.json())
      .then((data) => {
        // Update user position based on wallet connection
        if (isConnected && address) {
          // Mock user position - in production would come from API
          data.userPosition = {
            deposited: 10000,
            earnedYield: 245.50,
            walletConnected: true,
          };
          // Mock transaction history
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

  const stats = [
    { label: "Total Value Locked", value: formatCurrency(data.stats.totalValueLocked), change: `+${data.stats.tvlChange}%`, icon: Vault },
    { label: "Current APY", value: `${data.stats.currentAPY}%`, change: `+${data.stats.apyChange}%`, icon: TrendingUp },
    { label: "Pool Utilization", value: `${data.stats.poolUtilization}%`, change: `+${data.stats.utilizationChange}%`, icon: Activity },
    { label: "Active Advances", value: data.stats.activeAdvances.toString(), change: `+${data.stats.activeAdvancesChange}`, icon: ArrowUpRight },
  ];

  return (
    <div className="space-y-10">
      <VaultsBreadcrumb items={[{ label: "Markets", href: "/vaults" }]} />
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-sm border border-[#0A2E20]/20 bg-[#0A2E20]/5 px-2 py-0.5 text-xs font-medium tracking-widest text-[#0A2E20] uppercase">
              {data.vault.status}
            </span>
            <span className="text-xs tracking-wide text-[#1C1B18]/50">
              Epoch {data.vault.epoch} · {data.vault.epochTimeRemaining} remaining
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1C1B18] lg:text-4xl">
            {data.vault.name}
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-[#1C1B18]/60">
            Institutional-grade yield from tokenized Amazon seller receivables.
            Senior tranche with first-loss protection.
          </p>
        </div>

        <button
          onClick={() => setShowDepositModal(true)}
          className="flex h-12 items-center gap-2 rounded-none bg-[#0A2E20] px-7 text-sm font-medium tracking-wide text-[#F5F3EC] transition-opacity hover:opacity-90"
        >
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
            {data.parameters.map((row, i) => (
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
                {data.userPosition.deposited ? formatCurrency(data.userPosition.deposited) : '—'} USDC
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-[#1C1B18]/50">Earned Yield</span>
              <p className="text-lg font-bold text-[#0A2E20]">{data.userPosition.earnedYield ? formatCurrency(data.userPosition.earnedYield) : '—'} USDC</p>
            </div>
            {isConnected ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDepositModal(true)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-none bg-[#0A2E20] px-5 py-3 text-sm font-medium text-[#F5F3EC] transition-colors hover:opacity-90"
                >
                  <CircleDollarSign size={16} />
                  Deposit
                </button>
                <button
                  onClick={() => setShowWithdrawModal(true)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-none border-2 border-[#1C1B18] px-5 py-3 text-sm font-medium text-[#1C1B18] transition-colors hover:bg-[#EBE8DE]"
                >
                  Withdraw
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-2 rounded-sm bg-[#F5F3EC] p-3">
                  <Info size={14} className="mt-0.5 shrink-0 text-[#1C1B18]/40" />
                  <p className="text-xs leading-relaxed text-[#1C1B18]/50">
                    Connect your wallet to view your position and deposit
                    into this vault.
                  </p>
                </div>
                <SolanaConnectButton />
              </>
            )}
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
          {data.recentActivity.map((row, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-6 py-3.5"
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
                <span className="text-xs font-mono text-[#1C1B18]/40">
                  {row.wallet}
                </span>
                <span className="text-xs text-[#1C1B18]/40">{row.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Transaction History - Only show when connected */}
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
