"use client";

import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { TrendingUp, Activity, Calendar, DollarSign, Wallet } from "lucide-react";
import { SolanaConnectButton } from "@/components/solana-connect-button";
import { VaultsBreadcrumb } from "@/components/breadcrumb";

const monthlyData = [
  { month: "Jul", yield: 82.34, totalValue: 10082.34 },
  { month: "Aug", yield: 164.12, totalValue: 10164.12 },
  { month: "Sep", yield: 246.47, totalValue: 10246.47 },
  { month: "Oct", yield: 329.39, totalValue: 10329.39 },
  { month: "Nov", yield: 412.89, totalValue: 10412.89 },
  { month: "Dec", yield: 496.97, totalValue: 10496.97 },
  { month: "Jan", yield: 581.64, totalValue: 10581.64 },
];

export default function VaultsRWAPerformancePage() {
  const { connected: isConnected, publicKey } = useSolanaWallet();
  
  const currentValue = 10000;
  const projectedValue = 10581.64;
  const totalYield = 581.64;
  const apy = 9.74;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(amount);

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const maxValue = Math.max(...monthlyData.map(d => d.totalValue));

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-16 h-16 bg-[#0A2E20]/10 rounded-full flex items-center justify-center">
          <Wallet size={32} className="text-[#0A2E20]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1C1B18]">Connect Your Wallet</h2>
          <p className="text-[#1C1B18]/60 max-w-md">
            Connect your Solana wallet to view your vault yield performance and analytics.
          </p>
        </div>
        <SolanaConnectButton variant="primary" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-8">
      <VaultsBreadcrumb items={[{ label: "RWA Performance", href: "/vaults/rwa-performance" }]} />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1C1B18] tracking-tight">RWA Performance</h1>
          <p className="text-[#1C1B18]/60 mt-2">Yield analytics and vault performance</p>
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
        <div className="bg-gradient-to-br from-[#0A2E20]/10 to-transparent border border-[#0A2E20]/20 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={18} className="text-[#0A2E20]" />
            <span className="text-sm text-[#1C1B18]/60">Current Value</span>
          </div>
          <p className="text-2xl font-bold text-[#1C1B18] font-mono">{formatCurrency(currentValue)}</p>
        </div>
        <div className="bg-gradient-to-br from-[#0A2E20]/10 to-transparent border border-[#0A2E20]/20 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-[#0A2E20]" />
            <span className="text-sm text-[#1C1B18]/60">Projected (12mo)</span>
          </div>
          <p className="text-2xl font-bold text-[#1C1B18] font-mono">{formatCurrency(projectedValue)}</p>
          <p className="text-xs text-[#0A2E20] mt-1">+{formatCurrency(projectedValue - currentValue)}</p>
        </div>
        <div className="bg-gradient-to-br from-[#0A2E20]/10 to-transparent border border-[#0A2E20]/20 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={18} className="text-[#0A2E20]" />
            <span className="text-sm text-[#1C1B18]/60">Yield Earned</span>
          </div>
          <p className="text-2xl font-bold text-[#0A2E20] font-mono">+{formatCurrency(totalYield)}</p>
          <p className="text-xs text-[#1C1B18]/40 mt-1">YTD</p>
        </div>
        <div className="bg-gradient-to-br from-[#0A2E20]/10 to-transparent border border-[#0A2E20]/20 p-5 rounded-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={18} className="text-[#0A2E20]" />
            <span className="text-sm text-[#1C1B18]/60">Vault APY</span>
          </div>
          <p className="text-2xl font-bold text-[#1C1B18] font-mono">{apy}%</p>
          <p className="text-xs text-[#0A2E20] mt-1">USDC Vault</p>
        </div>
      </div>

      {/* Yield Curve */}
      <div className="bg-[#050505] text-white border border-gray-800 p-6 rounded-3xl shadow-2xl">
        <div className="flex flex-col space-y-1.5 mb-6">
          <h3 className="font-semibold leading-none tracking-tight text-gray-400">Yield Curve</h3>
        </div>
        
        <div className="h-[200px] w-full relative">
          <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-gray-500 font-mono">
            <span>$10.5k</span>
            <span>$10.2k</span>
            <span>$10k</span>
          </div>
          
          <div className="ml-14 h-full flex flex-col justify-end gap-1">
            <div className="absolute inset-0 ml-14 flex flex-col justify-between pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-gray-800 w-full" />
              ))}
            </div>
            
            <div className="flex items-end justify-between h-full relative z-10 gap-1">
              {monthlyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-[#00E08F] rounded-t transition-all hover:opacity-80"
                    style={{ height: `${(d.totalValue / maxValue) * 100}%`, minHeight: '4px' }}
                  />
                  <span className="text-[10px] text-gray-500">{d.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00E08F]"></div>
            <span className="text-xs text-gray-400">USDC Vault ({apy}% APY)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            <span className="text-xs text-gray-400">Traditional Savings (0.01%)</span>
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
                <th className="text-right text-xs font-medium text-[#1C1B18]/50 uppercase tracking-wider px-5 py-3">Yield Earned</th>
                <th className="text-right text-xs font-medium text-[#1C1B18]/50 uppercase tracking-wider px-5 py-3">Total Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C1B18]/5">
              {monthlyData.map((d, i) => (
                <tr key={i} className="hover:bg-[#F5F3EC]/30 transition-colors">
                  <td className="px-5 py-3 text-sm font-medium text-[#1C1B18]">{d.month}</td>
                  <td className="px-5 py-3 text-sm font-mono text-[#0A2E20]">+{formatCurrency(d.yield)}</td>
                  <td className="px-5 py-3 text-sm font-mono text-[#1C1B18] text-right">{formatCurrency(d.totalValue)}</td>
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
            Vault yields are generated through institutional lending strategies. 
            USDC deposits earn <span className="font-semibold text-[#1C1B18]">{apy}% APY</span> with daily yield distribution.
          </p>
        </div>
      </div>
    </div>
  );
}