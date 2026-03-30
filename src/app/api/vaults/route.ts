import { NextResponse } from "next/server";

export async function GET() {
  // In production, this would fetch from blockchain or database
  
  // Calculate epoch end time (14 days from now, for demo purposes)
  const now = new Date();
  const epochEndTime = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days from now
  const epochStartTime = new Date(epochEndTime.getTime() - 14 * 24 * 60 * 60 * 1000); // 14 days ago
  
  const data = {
    vault: {
      name: "AMZN-USDC Receivables Vault",
      status: "Live",
      epoch: 47,
      epochEndTime: epochEndTime.toISOString(),
      epochStartTime: epochStartTime.toISOString(),
    },
    stats: {
      totalMarketSize: 50240000,
      totalValueLocked: 24180000,
      tvlChange: 4.2,
      currentAPY: 24.56,
      apyChange: 0.31,
      poolUtilization: 87.3,
      utilizationChange: 1.8,
      activeAdvances: 214,
      activeAdvancesChange: 12,
    },
    parameters: [
      { label: "Underlying Asset", value: "Amazon Seller Receivables" },
      { label: "Settlement Token", value: "USDC (Solana)" },
      { label: "Lock Period", value: "14 Days Rolling" },
      { label: "Min. Deposit", value: "1,000 USDC" },
      { label: "Risk Tranche", value: "Senior" },
      { label: "Collateral Ratio", value: "125%" },
    ],
    userPosition: {
      deposited: null,
      earnedYield: null,
      walletConnected: false,
    },
    recentActivity: [
      { action: "Deposit", amount: 25000, wallet: "8xK2…mP4d", time: "12 min ago" },
      { action: "Advance Funded", amount: -18400, wallet: "Protocol", time: "34 min ago" },
      { action: "Repayment", amount: 19122, wallet: "Seller #1847", time: "1h ago" },
      { action: "Deposit", amount: 50000, wallet: "3nYq…vR7w", time: "2h ago" },
      { action: "Yield Distributed", amount: 2841, wallet: "Epoch 46", time: "6h ago" },
    ],
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}