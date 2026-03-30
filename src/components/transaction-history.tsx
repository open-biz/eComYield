"use client";

import { ArrowDown, ArrowUp, TrendingUp, ExternalLink } from "lucide-react";

interface Transaction {
  id: string;
  type: "deposit" | "withdraw" | "yield";
  amount: number;
  timestamp: string;
  status: "completed" | "pending";
  txHash?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(amount);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return <ArrowDown size={14} className="text-[#0A2E20]" />;
      case "withdraw":
        return <ArrowUp size={14} className="text-[#1C1B18]/60" />;
      case "yield":
        return <TrendingUp size={14} className="text-[#0A2E20]" />;
    }
  };

  const getTypeLabel = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return "Deposit";
      case "withdraw":
        return "Withdraw";
      case "yield":
        return "Yield Earned";
    }
  };

  const getTypeColor = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return "text-[#0A2E20]";
      case "withdraw":
        return "text-[#1C1B18]/60";
      case "yield":
        return "text-[#0A2E20]";
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="border border-[#1C1B18]/10">
        <div className="border-b border-[#1C1B18]/10 bg-[#F5F3EC] px-6 py-4">
          <h2 className="text-sm font-medium tracking-widest text-[#1C1B18]/50 uppercase">
            Your Transaction History
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center bg-[#F5F3EC]">
          <div className="mb-3 rounded-full bg-[#EBE8DE] p-3">
            <ArrowDown size={20} className="text-[#1C1B18]/30" />
          </div>
          <p className="text-sm font-medium text-[#1C1B18]">No transactions yet</p>
          <p className="mt-1 text-xs text-[#1C1B18]/50">
            Your deposit and yield history will appear here
          </p>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalDeposited = transactions
    .filter((t) => t.type === "deposit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalWithdrawn = transactions
    .filter((t) => t.type === "withdraw" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalYield = transactions
    .filter((t) => t.type === "yield" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="border border-[#1C1B18]/10">
      {/* Header */}
      <div className="border-b border-[#1C1B18]/10 bg-[#F5F3EC] px-6 py-4">
        <h2 className="text-sm font-medium tracking-widest text-[#1C1B18]/50 uppercase">
          Your Transaction History
        </h2>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 divide-x divide-[#1C1B18]/10 bg-[#EBE8DE]">
        <div className="p-4 text-center">
          <span className="text-xs text-[#1C1B18]/50">Total Deposited</span>
          <p className="mt-1 text-lg font-bold text-[#0A2E20]">{formatCurrency(totalDeposited)}</p>
        </div>
        <div className="p-4 text-center">
          <span className="text-xs text-[#1C1B18]/50">Total Withdrawn</span>
          <p className="mt-1 text-lg font-bold text-[#1C1B18]">{formatCurrency(totalWithdrawn)}</p>
        </div>
        <div className="p-4 text-center">
          <span className="text-xs text-[#1C1B18]/50">Total Yield Earned</span>
          <p className="mt-1 text-lg font-bold text-[#0A2E20]">{formatCurrency(totalYield)}</p>
        </div>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-[#1C1B18]/5 bg-[#F5F3EC]">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between px-6 py-4 hover:bg-[#EBE8DE]/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${tx.type === 'yield' ? 'bg-[#0A2E20]/10' : 'bg-[#EBE8DE]'}`}>
                {getIcon(tx.type)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${getTypeColor(tx.type)}`}>
                    {getTypeLabel(tx.type)}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-medium uppercase ${
                      tx.status === "completed"
                        ? "bg-[#0A2E20]/10 text-[#0A2E20]"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
                <span className="text-xs text-[#1C1B18]/40">{formatDate(tx.timestamp)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={`text-sm font-bold ${getTypeColor(tx.type)}`}>
                {tx.type === "withdraw" ? "-" : "+"}
                {formatCurrency(tx.amount)}
              </span>
              {tx.txHash && (
                <a
                  href={`https://solscan.io/tx/${tx.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1C1B18]/30 hover:text-[#0A2E20] transition-colors"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}