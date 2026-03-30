"use client";

import { useState, useEffect, useMemo } from "react";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import {
  Info,
  ExternalLink,
  ArrowDown,
  ArrowUp,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import { VaultsBreadcrumb } from "@/components/breadcrumb";
import { SolanaConnectButton } from "@/components/solana-connect-button";
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
  vault: { name: string; status: string; epoch: number; epochEndTime: string; epochStartTime: string };
  stats: {
    totalMarketSize: number;
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
  const [activeTab, setActiveTab] = useState<"overview" | "advanced" | "activity">("overview");
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  
  // Deposit form state
  const [depositAmount, setDepositAmount] = useState("");
  const [isDepositing, setIsDepositing] = useState(false);
  const [depositSuccess, setDepositSuccess] = useState(false);
  const [depositError, setDepositError] = useState<string | null>(null);
  
  // Withdraw form state
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);
  
  // Action tab state
  const [actionTab, setActionTab] = useState<"deposit" | "withdraw">("deposit");

  // Countdown timer
  useEffect(() => {
    if (!data?.vault?.epochEndTime) return;

    const epochEndTime = data.vault.epochEndTime;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const endTime = new Date(epochEndTime).getTime();
      const diff = endTime - now;

      if (diff <= 0) {
        setTimeRemaining("0d 0h 0m 0s");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [data?.vault?.epochEndTime]);

  useEffect(() => {
    fetch("/api/vaults")
      .then((res) => res.json())
      .then((apiData) => {
        if (isConnected && address) {
          apiData.userPosition = {
            deposited: 10000,
            earnedYield: 245.50,
            walletConnected: true,
          };
          apiData.userTransactions = [
            { id: "1", type: "deposit", amount: 5000, timestamp: "2024-12-01T10:00:00Z", status: "completed", txHash: "5x9K2...3p2m" },
            { id: "2", type: "yield", amount: 42.50, timestamp: "2024-12-08T00:00:00Z", status: "completed", txHash: "7m3H1...8k4n" },
            { id: "3", type: "deposit", amount: 5000, timestamp: "2024-12-15T14:30:00Z", status: "completed", txHash: "2n8P4...5q7r" },
            { id: "4", type: "yield", amount: 78.25, timestamp: "2024-12-22T00:00:00Z", status: "completed", txHash: "9s2T6...1v8w" },
            { id: "5", type: "yield", amount: 124.75, timestamp: "2025-01-05T00:00:00Z", status: "completed", txHash: "4y7U9...2x3z" },
          ];
        } else {
          apiData.userTransactions = [];
        }
        setData(apiData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isConnected, address]);

  // Calculate yields
  const parsedDepositAmount = parseFloat(depositAmount) || 0;
  const isValidDeposit = parsedDepositAmount >= 1000;
  
  const yields = useMemo(() => {
    if (!data || !isValidDeposit || parsedDepositAmount <= 0) {
      return { daily: 0, monthly: 0, annual: 0 };
    }
    const apy = data.stats.currentAPY / 100;
    const daily = parsedDepositAmount * apy / 365;
    const monthly = parsedDepositAmount * apy / 12;
    const annual = parsedDepositAmount * apy;
    return { daily, monthly, annual };
  }, [parsedDepositAmount, data, isValidDeposit]);

  // Handle deposit
  const handleDeposit = async () => {
    if (!isValidDeposit || !isConnected) return;

    setIsDepositing(true);
    setDepositError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setDepositSuccess(true);
      // Update user position
      if (data) {
        setData({
          ...data,
          userPosition: {
            ...data.userPosition,
            deposited: (data.userPosition.deposited || 0) + parsedDepositAmount,
          },
        });
      }
    } catch {
      setDepositError("Deposit failed. Please try again.");
    } finally {
      setIsDepositing(false);
    }
  };

  // Handle withdraw
  const handleWithdraw = async () => {
    const parsedWithdraw = parseFloat(withdrawAmount) || 0;
    const maxWithdraw = data?.userPosition.deposited || 0;
    
    if (parsedWithdraw <= 0 || parsedWithdraw > maxWithdraw || !isConnected) return;

    setIsWithdrawing(true);
    setWithdrawError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setWithdrawSuccess(true);
      // Update user position
      if (data) {
        setData({
          ...data,
          userPosition: {
            ...data.userPosition,
            deposited: maxWithdraw - parsedWithdraw,
          },
        });
      }
    } catch {
      setWithdrawError("Withdraw failed. Please try again.");
    } finally {
      setIsWithdrawing(false);
    }
  };

  // Reset forms
  const resetDepositForm = () => {
    setDepositAmount("");
    setDepositSuccess(false);
    setDepositError(null);
  };

  const resetWithdrawForm = () => {
    setWithdrawAmount("");
    setWithdrawSuccess(false);
    setWithdrawError(null);
  };

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

  const formatUSD = (val: number) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);

  const formatUSDC = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "decimal", maximumFractionDigits: 2 }).format(amount / 1e6) + "M USDC";

  const userDeposited = data.userPosition.deposited || 0;

  return (
    <div className="space-y-6">
      <VaultsBreadcrumb items={[{ label: "Markets", href: "/vaults" }]} />

      {/* Hero Section */}
      <div className="rounded-xl border border-[#1C1B18]/10 bg-white p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Token Pair */}
          <div className="flex items-center gap-4">
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
                <h1 className="text-2xl font-bold tracking-tight text-[#1C1B18]">RWA / USDC</h1>
                <span className="rounded-full bg-[#0A2E20]/10 px-2 py-0.5 text-xs font-medium text-[#0A2E20]">86%</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                {isConnected && address && (
                  <button className="flex items-center gap-2 rounded-md border border-[#1C1B18]/10 px-3 py-1.5 text-[#1C1B18] hover:bg-[#F5F3EC] transition-colors">
                    <span className="font-mono text-xs">{address.toString().slice(0, 6)}...{address.toString().slice(-4)}</span>
                  </button>
                )}
                <span className="inline-flex items-center gap-1 rounded-md bg-[#F5F3EC] px-2 py-1 text-xs font-medium text-[#1C1B18]/60">
                  <span className="h-2 w-2 rounded-full bg-[#0A2E20]" />
                  Solana
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-[#1C1B18]/50">Total Market Size</span>
                <Info size={14} className="text-[#1C1B18]/30" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tight text-[#1C1B18]">${(data.stats.totalMarketSize / 1e6).toFixed(2)}</span>
                <span className="text-sm font-semibold text-[#1C1B18]/60">M</span>
              </div>
              <span className="text-xs text-[#1C1B18]/40">{formatUSDC(data.stats.totalMarketSize)}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-[#1C1B18]/50">Total Liquidity</span>
                <Info size={14} className="text-[#1C1B18]/30" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tight text-[#1C1B18]">${(data.stats.totalValueLocked / 1e6).toFixed(2)}</span>
                <span className="text-sm font-semibold text-[#1C1B18]/60">M</span>
              </div>
              <span className="text-xs text-[#1C1B18]/40">{formatUSDC(data.stats.totalValueLocked)}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-[#1C1B18]/50">Rate</span>
                <Info size={14} className="text-[#1C1B18]/30" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-[#0A2E20]">{data.stats.currentAPY}</span>
                <span className="text-lg font-semibold text-[#0A2E20]">%</span>
              </div>
              <span className="text-xs text-[#1C1B18]/40">APY</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-medium uppercase tracking-wider text-[#1C1B18]/50">Trusted By</span>
              <div className="flex items-center gap-2">
                {trustedByLogos.map((logo, i) => (
                  <div key={i} className="flex h-8 w-8 items-center justify-center rounded-md border border-[#1C1B18]/10" style={{ backgroundColor: logo.color }} title={logo.name}>
                    <span className="text-[10px] font-bold text-white">{logo.name.slice(0, 2)}</span>
                  </div>
                ))}
                <span className="text-xs text-[#1C1B18]/40">+2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Epoch Info */}
        <div className="mt-6 pt-6 border-t border-[#1C1B18]/10">
          <p className="text-sm text-[#1C1B18]/60">
            Institutional-grade yield from tokenized Amazon seller receivables. Senior tranche with first-loss protection.
          </p>
          <p className="text-xs text-[#1C1B18]/40 mt-1">
            Epoch {data.vault.epoch} · {timeRemaining || "Loading..."} remaining
          </p>
        </div>
      </div>

      {/* Main Content - 2 Column Layout like Morpho */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Market Info & Tabs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="border-b border-[#1C1B18]/10 bg-white rounded-t-xl">
            <div className="flex gap-8 px-6">
              {(["overview", "advanced", "activity"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`relative py-4 text-sm font-medium capitalize transition-colors ${activeTab === tab ? "text-[#1C1B18]" : "text-[#1C1B18]/50 hover:text-[#1C1B18]"}`}>
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0A2E20]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-b-xl rounded-tr-xl border border-[#1C1B18]/10">
            {activeTab === "overview" && (
              <div className="divide-y divide-[#1C1B18]/5">
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
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm font-medium text-[#1C1B18]">Max LTV</span>
                  <span className="text-sm font-semibold text-[#0A2E20]">75%</span>
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm font-medium text-[#1C1B18]">Utilization</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-[#1C1B18]/10">
                      <div className="h-full rounded-full bg-[#0A2E20]" style={{ width: `${data.stats.poolUtilization}%` }} />
                    </div>
                    <span className="text-sm font-medium text-[#1C1B18]">{data.stats.poolUtilization}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-sm font-medium text-[#1C1B18]">Active Advances</span>
                  <span className="text-sm font-semibold text-[#1C1B18]">{data.stats.activeAdvances}</span>
                </div>
              </div>
            )}

            {activeTab === "advanced" && (
              <div className="divide-y divide-[#1C1B18]/5">
                {data.parameters.map((row) => (
                  <div key={row.label} className="flex items-center justify-between px-6 py-4">
                    <span className="text-sm text-[#1C1B18]/60">{row.label}</span>
                    <span className="text-sm font-medium text-[#1C1B18]">{row.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "activity" && (
              <div className="divide-y divide-[#1C1B18]/5">
                {data.recentActivity.map((row, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                      <span className={`inline-flex w-28 items-center text-xs font-medium tracking-wide ${row.amount > 0 ? "text-[#0A2E20]" : "text-[#1C1B18]/60"}`}>
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
            )}
          </div>

          {/* User Transactions */}
          {isConnected && data.userTransactions.length > 0 && (
            <TransactionHistory transactions={data.userTransactions} />
          )}
        </div>

        {/* Right Column - Action Panel (Deposit/Withdraw) */}
        <div className="rounded-xl border border-[#1C1B18]/10 bg-white p-6 shadow-sm">
          {/* Action Tabs */}
          <div className="flex gap-1 p-1 bg-[#F5F3EC] rounded-lg mb-6">
            <button
              onClick={() => { setActionTab("deposit"); resetDepositForm(); resetWithdrawForm(); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-md transition-all ${
                actionTab === "deposit" 
                  ? "bg-white text-[#0A2E20] shadow-sm" 
                  : "text-[#1C1B18]/50 hover:text-[#1C1B18]"
              }`}
            >
              <ArrowDown size={16} />
              Deposit
            </button>
            <button
              onClick={() => { setActionTab("withdraw"); resetDepositForm(); resetWithdrawForm(); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-md transition-all ${
                actionTab === "withdraw" 
                  ? "bg-white text-[#0A2E20] shadow-sm" 
                  : "text-[#1C1B18]/50 hover:text-[#1C1B18]"
              }`}
            >
              <ArrowUp size={16} />
              Withdraw
            </button>
          </div>

          {/* User Position Summary */}
          <div className="space-y-4 mb-6 pb-6 border-b border-[#1C1B18]/10">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#1C1B18]/50">Your Deposited</span>
              <span className="text-lg font-bold text-[#1C1B18]">{formatUSD(userDeposited)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#1C1B18]/50">Earned Yield</span>
              <span className="text-lg font-bold text-[#0A2E20]">{formatUSD(data.userPosition.earnedYield || 0)}</span>
            </div>
          </div>

          {/* Deposit Form */}
          {actionTab === "deposit" && (
            <div className="space-y-4">
              {/* Amount Input */}
              <div className="rounded-lg border border-[#1C1B18]/10 bg-[#F5F3EC]/50 p-4 hover:bg-[#F5F3EC] transition-colors cursor-text">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#1C1B18]/50">Deposit USDC</span>
                  <div className="flex items-center gap-2">
                    {depositAmount && (
                      <button
                        onClick={() => setDepositAmount("")}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1C1B18]/10 text-[#1C1B18]/40 hover:bg-[#1C1B18]/20 hover:text-[#1C1B18] transition-colors"
                      >
                        <X size={12} />
                      </button>
                    )}
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2774CA]">
                      <span className="text-[8px] font-bold text-white">USDC</span>
                    </div>
                  </div>
                </div>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0.00"
                  inputMode="decimal"
                  className="w-full bg-transparent text-2xl font-bold text-[#1C1B18] outline-none caret-[#0A2E20] placeholder:text-[#1C1B18]/20"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-[#1C1B18]/40">≈ {formatUSD(parsedDepositAmount)}</span>
                  <span className="text-xs text-[#1C1B18]/40">Min: 1,000 USDC</span>
                </div>
              </div>

              {/* Quick Amount Buttons - Additive */}
              <div className="flex gap-2">
                {[1000, 5000, 10000, 50000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setDepositAmount((prev) => ((parseFloat(prev) || 0) + val).toString())}
                    className="flex-1 rounded border border-[#1C1B18]/10 py-1.5 text-xs font-medium text-[#1C1B18]/60 hover:bg-[#F5F3EC] hover:text-[#1C1B18] transition-colors"
                  >
                    ${val.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Yield Calculator */}
              <div className="space-y-2 rounded-lg border border-[#1C1B18]/10 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#1C1B18]/50">APY</span>
                  <span className="text-sm font-bold text-[#0A2E20]">{data.stats.currentAPY}%</span>
                </div>
                <div className="space-y-1.5 border-t border-[#1C1B18]/5 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#1C1B18]/50">Projected daily</span>
                    <span className={`text-sm font-medium ${parsedDepositAmount > 0 ? "text-[#0A2E20]" : "text-[#1C1B18]/30"}`}>
                      {formatUSD(yields.daily)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#1C1B18]/50">Projected monthly</span>
                    <span className={`text-sm font-medium ${parsedDepositAmount > 0 ? "text-[#0A2E20]" : "text-[#1C1B18]/30"}`}>
                      {formatUSD(yields.monthly)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#1C1B18]/50">Projected yearly</span>
                    <span className={`text-sm font-medium ${parsedDepositAmount > 0 ? "text-[#0A2E20]" : "text-[#1C1B18]/30"}`}>
                      {formatUSD(yields.annual)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Error */}
              {depositError && (
                <div className="flex items-center gap-2 rounded-sm bg-red-50 p-3">
                  <AlertCircle size={16} className="text-red-500" />
                  <span className="text-sm text-red-600">{depositError}</span>
                </div>
              )}

              {/* Deposit Button */}
              {!isConnected ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-2 rounded-lg bg-[#F5F3EC] p-3">
                    <Info size={14} className="mt-0.5 shrink-0 text-[#1C1B18]/40" />
                    <p className="text-xs leading-relaxed text-[#1C1B18]/50">Connect your wallet to deposit.</p>
                  </div>
                  <SolanaConnectButton />
                </div>
              ) : depositSuccess ? (
                <div className="text-center py-4">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0A2E20]/10">
                    <ArrowDown size={24} className="text-[#0A2E20]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1B18]">Deposit Successful!</h3>
                  <p className="text-sm text-[#1C1B18]/60 mt-1">{formatUSD(parsedDepositAmount)} deposited</p>
                  <button
                    onClick={resetDepositForm}
                    className="mt-4 w-full rounded-lg bg-[#0A2E20] py-3 text-sm font-medium text-[#F5F3EC] hover:opacity-90"
                  >
                    Deposit More
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleDeposit}
                  disabled={!isValidDeposit || isDepositing}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#0A2E20] py-4 text-sm font-semibold text-[#F5F3EC] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDepositing ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Depositing...
                    </>
                  ) : (
                    <>
                      <ArrowDown size={16} />
                      Deposit {parsedDepositAmount > 0 ? formatUSD(parsedDepositAmount) : ""}
                    </>
                  )}
                </button>
              )}

              {/* Info */}
              <div className="flex items-start gap-2 rounded-sm bg-[#EBE8DE] p-3">
                <AlertCircle size={14} className="mt-0.5 shrink-0 text-[#1C1B18]/40" />
                <p className="text-xs leading-relaxed text-[#1C1B18]/50">
                  Yield starts from next epoch. Early withdrawal may incur fees.
                </p>
              </div>
            </div>
          )}

          {/* Withdraw Form */}
          {actionTab === "withdraw" && (
            <div className="space-y-4">
              {/* Amount Input */}
              <div className="rounded-lg border border-[#1C1B18]/10 bg-[#F5F3EC]/50 p-4 hover:bg-[#F5F3EC] transition-colors cursor-text">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#1C1B18]/50">Withdraw USDC</span>
                  <div className="flex items-center gap-2">
                    {withdrawAmount && (
                      <button
                        onClick={() => setWithdrawAmount("")}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1C1B18]/10 text-[#1C1B18]/40 hover:bg-[#1C1B18]/20 hover:text-[#1C1B18] transition-colors"
                      >
                        <X size={12} />
                      </button>
                    )}
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2774CA]">
                      <span className="text-[8px] font-bold text-white">USDC</span>
                    </div>
                  </div>
                </div>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                  inputMode="decimal"
                  className="w-full bg-transparent text-2xl font-bold text-[#1C1B18] outline-none caret-[#0A2E20] placeholder:text-[#1C1B18]/20"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-[#1C1B18]/40">≈ {formatUSD(parseFloat(withdrawAmount) || 0)}</span>
                  <button 
                    onClick={() => setWithdrawAmount(userDeposited.toString())}
                    className="text-xs font-medium text-[#0A2E20] hover:underline"
                  >
                    Max: {formatUSD(userDeposited)}
                  </button>
                </div>
              </div>

              {/* Available Balance */}
              <div className="rounded-lg border border-[#1C1B18]/10 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#1C1B18]/50">Available to withdraw</span>
                  <span className="text-sm font-bold text-[#1C1B18]">{formatUSD(userDeposited)}</span>
                </div>
              </div>

              {/* Error */}
              {withdrawError && (
                <div className="flex items-center gap-2 rounded-sm bg-red-50 p-3">
                  <AlertCircle size={16} className="text-red-500" />
                  <span className="text-sm text-red-600">{withdrawError}</span>
                </div>
              )}

              {/* Withdraw Button */}
              {!isConnected ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-2 rounded-lg bg-[#F5F3EC] p-3">
                    <Info size={14} className="mt-0.5 shrink-0 text-[#1C1B18]/40" />
                    <p className="text-xs leading-relaxed text-[#1C1B18]/50">Connect your wallet to withdraw.</p>
                  </div>
                  <SolanaConnectButton />
                </div>
              ) : withdrawSuccess ? (
                <div className="text-center py-4">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0A2E20]/10">
                    <ArrowUp size={24} className="text-[#0A2E20]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1B18]">Withdraw Successful!</h3>
                  <p className="text-sm text-[#1C1B18]/60 mt-1">{formatUSD(parseFloat(withdrawAmount) || 0)} withdrawn</p>
                  <button
                    onClick={resetWithdrawForm}
                    className="mt-4 w-full rounded-lg bg-[#0A2E20] py-3 text-sm font-medium text-[#F5F3EC] hover:opacity-90"
                  >
                    Withdraw More
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleWithdraw}
                  disabled={!isConnected || !withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > userDeposited || isWithdrawing}
                  className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-[#1C1B18] py-4 text-sm font-semibold text-[#1C1B18] hover:bg-[#F5F3EC] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isWithdrawing ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Withdrawing...
                    </>
                  ) : (
                    <>
                      <ArrowUp size={16} />
                      Withdraw {withdrawAmount ? formatUSD(parseFloat(withdrawAmount)) : ""}
                    </>
                  )}
                </button>
              )}

              {/* Info */}
              <div className="flex items-start gap-2 rounded-sm bg-[#EBE8DE] p-3">
                <AlertCircle size={14} className="mt-0.5 shrink-0 text-[#1C1B18]/40" />
                <p className="text-xs leading-relaxed text-[#1C1B18]/50">
                  Withdrawals are processed at epoch end. Your yield is preserved.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}