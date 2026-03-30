"use client";

import { useState } from "react";
import { X, ArrowUpRight, ArrowDownLeft, Search, Download } from "lucide-react";

interface CardTransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const transactions = [
  { id: 1, date: "2024-12-28", description: "AWS Services", amount: -245.00, category: "Software", status: "completed" },
  { id: 2, date: "2024-12-26", description: "FBA Reimbursement", amount: 1247.85, category: "Revenue", status: "completed" },
  { id: 3, date: "2024-12-24", description: "Shopify Subscription", amount: -29.00, category: "Software", status: "completed" },
  { id: 4, date: "2024-12-22", description: "Amazon FBA Payment", amount: 3892.12, category: "Revenue", status: "completed" },
  { id: 5, date: "2024-12-20", description: "Shipping Supplies", amount: -156.78, category: "Operations", status: "completed" },
  { id: 6, date: "2024-12-18", description: "Product Sourcing", amount: -890.00, category: "Inventory", status: "completed" },
  { id: 7, date: "2024-12-15", description: "Advertising - Amazon", amount: -450.00, category: "Marketing", status: "completed" },
  { id: 8, date: "2024-12-12", description: "Customer Refund", amount: -89.99, category: "Refund", status: "completed" },
  { id: 9, date: "2024-12-10", description: "eComYield Advance", amount: 5000.00, category: "Advance", status: "completed" },
  { id: 10, date: "2024-12-08", description: "Domain & Hosting", amount: -24.99, category: "Software", status: "completed" },
];

export function CardTransactionsModal({ isOpen, onClose }: CardTransactionsModalProps) {
  const [search, setSearch] = useState("");

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(amount);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const filteredTransactions = transactions.filter(t => 
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1C1B18]/10">
          <div>
            <h2 className="text-lg font-semibold text-[#1C1B18]">Card Transactions</h2>
            <p className="text-sm text-[#1C1B18]/50">Business Treasury Card</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#F5F3EC] rounded-full transition-colors">
            <X size={20} className="text-[#1C1B18]/60" />
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 border-b border-[#1C1B18]/10">
          <div className="p-4 text-center border-r border-[#1C1B18]/10">
            <p className="text-xs text-[#1C1B18]/50 mb-1">Total Income</p>
            <p className="text-lg font-bold text-[#0A2E20] font-mono">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="p-4 text-center border-r border-[#1C1B18]/10">
            <p className="text-xs text-[#1C1B18]/50 mb-1">Total Expense</p>
            <p className="text-lg font-bold text-[#1C1B18] font-mono">{formatCurrency(totalExpense)}</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-xs text-[#1C1B18]/50 mb-1">Net</p>
            <p className={`text-lg font-bold font-mono ${totalIncome + totalExpense >= 0 ? "text-[#0A2E20]" : "text-red-600"}`}>
              {formatCurrency(totalIncome + totalExpense)}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-[#1C1B18]/10">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1C1B18]/40" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#1C1B18]/10 rounded-lg text-sm focus:border-[#0A2E20] focus:outline-none"
            />
          </div>
        </div>

        {/* Transactions List */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b border-[#1C1B18]/10">
                <th className="text-left text-xs font-medium text-[#1C1B18]/50 uppercase tracking-wider px-4 py-3">Date</th>
                <th className="text-left text-xs font-medium text-[#1C1B18]/50 uppercase tracking-wider px-4 py-3">Description</th>
                <th className="text-left text-xs font-medium text-[#1C1B18]/50 uppercase tracking-wider px-4 py-3">Category</th>
                <th className="text-right text-xs font-medium text-[#1C1B18]/50 uppercase tracking-wider px-4 py-3">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C1B18]/5">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-[#F5F3EC]/30 transition-colors">
                  <td className="px-4 py-3 text-sm text-[#1C1B18]/60 font-mono">{formatDate(t.date)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {t.amount > 0 ? (
                        <ArrowDownLeft size={14} className="text-[#0A2E20]" />
                      ) : (
                        <ArrowUpRight size={14} className="text-[#1C1B18]/40" />
                      )}
                      <span className="text-sm text-[#1C1B18]">{t.description}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-[#F5F3EC] text-[#1C1B18]/70 rounded-full">
                      {t.category}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-sm font-mono text-right ${t.amount > 0 ? "text-[#0A2E20]" : "text-[#1C1B18]"}`}>
                    {t.amount > 0 ? "+" : ""}{formatCurrency(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1C1B18]/10 flex justify-between items-center">
          <p className="text-xs text-[#1C1B18]/50">{filteredTransactions.length} transactions</p>
          <button className="flex items-center gap-2 text-sm text-[#0A2E20] hover:underline">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}