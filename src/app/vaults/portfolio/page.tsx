"use client";

import { useState, useEffect } from "react";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { Wallet, TrendingUp, DollarSign, PieChart, ArrowUpRight } from "lucide-react";
import { SolanaConnectButton } from "@/components/solana-connect-button";
import { VaultsBreadcrumb } from "@/components/breadcrumb";

interface VaultPosition {
  vaultId: string;
  vaultName: string;
  deposited: number;
  earnedYield: number;
  currentAPY: number;
}

const mockPositions: VaultPosition[] = [
  {
    vaultId: "usdc-vault",
    vaultName: "USDC Vault",
    deposited: 10000,
    earnedYield: 245.50,
    currentAPY: 9.74,
  },
];

export default function VaultsPortfolioPage() {
  const { connected: isConnected, publicKey } = useSolanaWallet();
  const [positions, setPositions] = useState<VaultPosition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected) {
      // Simulate API call
      const timer = setTimeout(() => {
        setPositions(mockPositions);
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(amount);

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const totalDeposited = positions.reduce((sum, p) => sum + p.deposited, 0);
  const totalYield = positions.reduce((sum, p) => sum + p.earnedYield, 0);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-16 h-16 bg-[#0A2E20]/10 rounded-full flex items-center justify-center">
          <Wallet size={32} className="text-[#0A2E20]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1C1B18]">Connect Your Wallet</h2>
          <p className="text-[#1C1B18]/60 max-w-md">
            Connect your Solana wallet to view your vault positions and earned yields.
          </p>
        </div>
        <SolanaConnectButton variant="primary" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-8">
      <VaultsBreadcrumb items={[{ label: "Portfolio", href: "/vaults/portfolio" }]} />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1C1B18] tracking-tight">Portfolio</h1>
          <p className="text-[#1C1B18]/60 mt-2">Your vault positions and yield earnings</p>
        </div>
        {publicKey && (
          <div className="flex items-center gap-2 px-4 py-2 bg-[#0A2E20]/10 rounded-full">
            <Wallet size={14} className="text-[#0A2E20]" />
            <span className="text-sm font-mono text-[#1C1B18]">{formatAddress(publicKey.toBase58())}</span>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-white border border-[#1C1B18]/10 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <Wallet size={18} className="text-[#0A2E20]" />
            <span className="text-sm text-[#1C1B18]/60">Total Deposited</span>
          </div>
          <p className="text-2xl font-bold text-[#1C1B18] font-mono">{formatCurrency(totalDeposited)}</p>
          <p className="text-xs text-[#1C1B18]/40 mt-1">{positions.length} vaults</p>
        </div>
        <div className="bg-white border border-[#1C1B18]/10 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-[#0A2E20]" />
            <span className="text-sm text-[#1C1B18]/60">Earned Yield</span>
          </div>
          <p className="text-2xl font-bold text-[#0A2E20] font-mono">+{formatCurrency(totalYield)}</p>
          <p className="text-xs text-[#1C1B18]/40 mt-1">All time</p>
        </div>
        <div className="bg-white border border-[#1C1B18]/10 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <PieChart size={18} className="text-[#0A2E20]" />
            <span className="text-sm text-[#1C1B18]/60">Avg. APY</span>
          </div>
          <p className="text-2xl font-bold text-[#1C1B18] font-mono">9.74%</p>
          <p className="text-xs text-[#0A2E20] mt-1">Weighted avg</p>
        </div>
        <div className="bg-white border border-[#1C1B18]/10 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={18} className="text-[#0A2E20]" />
            <span className="text-sm text-[#1C1B18]/60">Total Value</span>
          </div>
          <p className="text-2xl font-bold text-[#1C1B18] font-mono">{formatCurrency(totalDeposited + totalYield)}</p>
          <p className="text-xs text-[#1C1B18]/40 mt-1">Principal + Yield</p>
        </div>
      </div>

      {/* Vault Positions */}
      <div className="bg-white border border-[#1C1B18]/10 rounded-sm overflow-hidden">
        <div className="p-5 border-b border-[#1C1B18]/10">
          <h2 className="text-lg font-semibold text-[#1C1B18]">Active Deposits</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-[#1C1B18]/50">Loading positions...</div>
        ) : positions.length === 0 ? (
          <div className="p-8 text-center text-[#1C1B18]/50">
            No active deposits. <a href="/vaults" className="text-[#0A2E20] hover:underline">Browse vaults</a>
          </div>
        ) : (
          <div className="divide-y divide-[#1C1B18]/5">
            {positions.map((position) => (
              <div key={position.vaultId} className="p-5 hover:bg-[#F5F3EC]/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-[#1C1B18]">{position.vaultName}</h3>
                      <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium bg-[#0A2E20]/10 text-[#0A2E20] border-[#0A2E20]/20">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#1C1B18]/50">
                      <span>USDC Token</span>
                      <span>•</span>
                      <span>Solana</span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xl font-bold text-[#1C1B18] font-mono">{formatCurrency(position.deposited)}</p>
                    <p className="text-sm text-[#0A2E20]">+{formatCurrency(position.earnedYield)} earned</p>
                    <p className="text-xs text-[#1C1B18]/50">{position.currentAPY}% APY</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <a
          href="/vaults"
          className="flex items-center justify-between p-5 bg-white border border-[#1C1B18]/10 rounded-sm hover:bg-[#F5F3EC]/50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0A2E20]/10 rounded-lg text-[#0A2E20]">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="font-medium text-[#1C1B18]">Browse Vaults</p>
              <p className="text-sm text-[#1C1B18]/50">Find new yield opportunities</p>
            </div>
          </div>
          <ArrowUpRight size={18} className="text-[#1C1B18]/40 group-hover:text-[#1C1B18]/70 transition-colors" />
        </a>
        <a
          href="/vaults/rwa-performance"
          className="flex items-center justify-between p-5 bg-white border border-[#1C1B18]/10 rounded-sm hover:bg-[#F5F3EC]/50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0A2E20]/10 rounded-lg text-[#0A2E20]">
              <PieChart size={20} />
            </div>
            <div>
              <p className="font-medium text-[#1C1B18]">View Performance</p>
              <p className="text-sm text-[#1C1B18]/50">Yield analytics and history</p>
            </div>
          </div>
          <ArrowUpRight size={18} className="text-[#1C1B18]/40 group-hover:text-[#1C1B18]/70 transition-colors" />
        </a>
      </div>
    </div>
  );
}