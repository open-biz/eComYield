"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Filter,
  Search,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  ChevronDown,
} from "lucide-react";

interface Advance {
  id: string;
  date: string;
  amount: number;
  fee: number;
  net: number;
  sales: number;
  status: string;
  settledDate: string;
  daysToSettle: number;
}

type StatusFilter = "All" | "Repaid" | "Active";
type DateFilter = "All" | "7D" | "30D" | "90D";

export default function SellerAdvances() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [dateFilter, setDateFilter] = useState<DateFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAdvance, setSelectedAdvance] = useState<Advance | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [advances, setAdvances] = useState<Advance[]>([]);
  const [totals, setTotals] = useState({ totalAdvanced: 0, totalFees: 0, totalNet: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvances = async () => {
      const params = new URLSearchParams();
      if (statusFilter !== "All") params.set("status", statusFilter);
      if (dateFilter !== "All") params.set("dateRange", dateFilter);
      if (searchQuery) params.set("search", searchQuery);

      try {
        const res = await fetch(`/api/seller/advances?${params}`);
        const data = await res.json();
        setAdvances(data.advances);
        setTotals(data.totals);
      } catch (err) {
        console.error("Failed to fetch advances:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvances();
  }, [statusFilter, dateFilter, searchQuery]);

  // API handles filtering - use advances from API directly
  const filteredAdvances = advances;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Repaid":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#0A2E20] bg-[#0A2E20]/10 px-2.5 py-1 rounded-sm">
            <CheckCircle2 size={12} />
            Repaid
          </span>
        );
      case "Active":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-700 bg-orange-100 px-2.5 py-1 rounded-sm">
            <Clock size={12} />
            Active
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1C1B18]/60 bg-[#1C1B18]/5 px-2.5 py-1 rounded-sm">
            <AlertCircle size={12} />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => window.history.back()}
            className="text-[#1C1B18]/40 hover:text-[#1C1B18] transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-3xl font-bold text-[#1C1B18] tracking-tight">
            Advances
          </h1>
        </div>
        <p className="text-[#1C1B18]/50">
          View and manage your cash advances
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1C1B18]/30"
          />
          <input
            type="text"
            placeholder="Search by Advance ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F5F3EC] border border-[#1C1B18]/10 text-[#1C1B18] placeholder-[#1C1B18]/30 text-sm rounded-sm focus:outline-none focus:border-[#1C1B18]/20"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="appearance-none pl-4 pr-10 py-2.5 bg-[#F5F3EC] border border-[#1C1B18]/10 text-[#1C1B18] text-sm rounded-sm focus:outline-none focus:border-[#1C1B18]/20 cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Repaid">Repaid</option>
            <option value="Active">Active</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1C1B18]/40 pointer-events-none"
          />
        </div>

        {/* Date Filter */}
        <div className="relative">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as DateFilter)}
            className="appearance-none pl-4 pr-10 py-2.5 bg-[#F5F3EC] border border-[#1C1B18]/10 text-[#1C1B18] text-sm rounded-sm focus:outline-none focus:border-[#1C1B18]/20 cursor-pointer"
          >
            <option value="All">All Time</option>
            <option value="7D">Last 7 Days</option>
            <option value="30D">Last 30 Days</option>
            <option value="90D">Last 90 Days</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1C1B18]/40 pointer-events-none"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#EBE8DE] border border-[#1C1B18]/5 rounded-sm p-5">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={16} className="text-[#1C1B18]/30" />
            <span className="text-xs text-[#1C1B18]/50 uppercase tracking-wider">
              Total Advanced
            </span>
          </div>
          <p className="text-2xl font-bold text-[#1C1B18] tracking-tight">
            {formatCurrency(totals.totalAdvanced)}
          </p>
        </div>
        <div className="bg-[#EBE8DE] border border-[#1C1B18]/5 rounded-sm p-5">
          <div className="flex items-center gap-2 mb-2">
            <Filter size={16} className="text-[#1C1B18]/30" />
            <span className="text-xs text-[#1C1B18]/50 uppercase tracking-wider">
              Total Fees
            </span>
          </div>
          <p className="text-2xl font-bold text-[#1C1B18] tracking-tight">
            {formatCurrency(totals.totalFees)}
          </p>
        </div>
        <div className="bg-[#EBE8DE] border border-[#1C1B18]/5 rounded-sm p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={16} className="text-[#1C1B18]/30" />
            <span className="text-xs text-[#1C1B18]/50 uppercase tracking-wider">
              Net Received
            </span>
          </div>
          <p className="text-2xl font-bold text-[#0A2E20] tracking-tight">
            {formatCurrency(totals.totalNet)}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="border border-[#1C1B18]/10 rounded-sm overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-6 bg-[#F5F3EC] border-b border-[#1C1B18]/10 px-5 py-3">
          <span className="text-xs font-medium text-[#1C1B18]/40 uppercase tracking-wider">
            Advance ID
          </span>
          <span className="text-xs font-medium text-[#1C1B18]/40 uppercase tracking-wider">
            Date
          </span>
          <span className="text-xs font-medium text-[#1C1B18]/40 uppercase tracking-wider">
            Amount
          </span>
          <span className="text-xs font-medium text-[#1C1B18]/40 uppercase tracking-wider">
            Fee
          </span>
          <span className="text-xs font-medium text-[#1C1B18]/40 uppercase tracking-wider">
            Status
          </span>
          <span className="text-xs font-medium text-[#1C1B18]/40 uppercase tracking-wider text-right">
            Actions
          </span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-[#1C1B18]/5">
          {filteredAdvances.map((adv) => (
            <div key={adv.id}>
              {/* Main Row */}
              <div
                className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-0 px-5 py-4 items-center hover:bg-[#F5F3EC]/50 transition-colors cursor-pointer"
                onClick={() =>
                  setExpandedRow(expandedRow === adv.id ? null : adv.id)
                }
              >
                {/* Mobile: Stacked layout, Desktop: Grid */}
                <div className="md:contents flex flex-col md:flex-row md:items-center md:gap-4">
                  <div className="flex items-center justify-between md:justify-start md:w-auto w-full">
                    <span className="text-sm font-medium text-[#1C1B18] md:hidden w-20">
                      Advance
                    </span>
                    <span className="text-sm font-medium text-[#1C1B18]">
                      {adv.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between md:justify-start md:w-auto w-full">
                    <span className="text-sm text-[#1C1B18]/50 md:hidden w-20">
                      Date
                    </span>
                    <span className="text-sm text-[#1C1B18]">{adv.date}</span>
                  </div>
                  <div className="flex items-center justify-between md:justify-start md:w-auto w-full">
                    <span className="text-sm text-[#1C1B18]/50 md:hidden w-20">
                      Amount
                    </span>
                    <span className="text-sm font-medium text-[#1C1B18]">
                      {formatCurrency(adv.amount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between md:justify-start md:w-auto w-full">
                    <span className="text-sm text-[#1C1B18]/50 md:hidden w-20">
                      Fee
                    </span>
                    <span className="text-sm text-[#1C1B18]/60">
                      {formatCurrency(adv.fee)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between md:justify-start md:w-auto w-full">
                    <span className="text-sm text-[#1C1B18]/50 md:hidden w-20">
                      Status
                    </span>
                    <div className="md:block">{getStatusBadge(adv.status)}</div>
                  </div>
                  <div className="flex items-center justify-end md:justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAdvance(adv);
                      }}
                      className="text-xs text-[#0A2E20] hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Row */}
              {expandedRow === adv.id && (
                <div className="bg-[#F5F3EC]/30 px-5 py-4 border-t border-[#1C1B18]/5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-xs text-[#1C1B18]/40 uppercase tracking-wider mb-1">
                        Advance Amount
                      </p>
                      <p className="text-sm font-semibold text-[#1C1B18]">
                        {formatCurrency(adv.amount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#1C1B18]/40 uppercase tracking-wider mb-1">
                        Daily Sales
                      </p>
                      <p className="text-sm font-semibold text-[#1C1B18]">
                        {formatCurrency(adv.sales)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#1C1B18]/40 uppercase tracking-wider mb-1">
                        Fee (1.5%)
                      </p>
                      <p className="text-sm font-semibold text-[#1C1B18]">
                        {formatCurrency(adv.fee)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#1C1B18]/40 uppercase tracking-wider mb-1">
                        Net Received
                      </p>
                      <p className="text-sm font-semibold text-[#0A2E20]">
                        {formatCurrency(adv.net)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#1C1B18]/40 uppercase tracking-wider mb-1">
                        Settled Date
                      </p>
                      <p className="text-sm text-[#1C1B18]">{adv.settledDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#1C1B18]/40 uppercase tracking-wider mb-1">
                        Days to Settle
                      </p>
                      <p className="text-sm text-[#1C1B18]">{adv.daysToSettle} days</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#1C1B18]/40 uppercase tracking-wider mb-1">
                        Settlement Amount
                      </p>
                      <p className="text-sm font-semibold text-[#1C1B18]">
                        {formatCurrency(adv.sales - adv.amount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#1C1B18]/40 uppercase tracking-wider mb-1">
                        Status
                      </p>
                      <div className="mt-1">{getStatusBadge(adv.status)}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-[#1C1B18]/40">
          Showing {filteredAdvances.length} of {advances.length} advances
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-sm border border-[#1C1B18]/10 rounded-sm text-[#1C1B18]/40 hover:text-[#1C1B18] hover:border-[#1C1B18]/20 disabled:opacity-30 disabled:cursor-not-allowed" disabled>
            <ArrowLeft size={14} />
          </button>
          <span className="px-3 py-2 text-sm text-[#1C1B18]">1</span>
          <button className="px-3 py-2 text-sm border border-[#1C1B18]/10 rounded-sm text-[#1C1B18]/40 hover:text-[#1C1B18] hover:border-[#1C1B18]/20 disabled:opacity-30 disabled:cursor-not-allowed" disabled>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAdvance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1B18]/40">
          <div className="bg-[#F5F3EC] max-w-lg w-full rounded-sm overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C1B18]/10">
              <div>
                <p className="text-xs text-[#1C1B18]/40 uppercase tracking-wider">
                  Advance Details
                </p>
                <h2 className="text-lg font-bold text-[#1C1B18]">
                  {selectedAdvance.id}
                </h2>
              </div>
              <button
                onClick={() => setSelectedAdvance(null)}
                className="text-[#1C1B18]/40 hover:text-[#1C1B18]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="text-xs text-[#1C1B18]/40 uppercase tracking-wider mb-1">
                    Advance Date
                  </p>
                  <p className="text-sm font-medium text-[#1C1B18]">
                    {selectedAdvance.date}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#1C1B18]/40 uppercase tracking-wider mb-1">
                    Status
                  </p>
                  <div className="mt-1">
                    {getStatusBadge(selectedAdvance.status)}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#1C1B18]/10 pt-5">
                <p className="text-xs text-[#1C1B18]/40 uppercase tracking-wider mb-3">
                  Financial Breakdown
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#1C1B18]/60">Daily Net Sales</span>
                    <span className="text-sm font-medium text-[#1C1B18]">
                      {formatCurrency(selectedAdvance.sales)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#1C1B18]/60">Advance (80%)</span>
                    <span className="text-sm font-medium text-[#1C1B18]">
                      {formatCurrency(selectedAdvance.amount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#1C1B18]/60">Withheld (20%)</span>
                    <span className="text-sm font-medium text-[#1C1B18]">
                      {formatCurrency(selectedAdvance.sales - selectedAdvance.amount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#1C1B18]/10 pt-3">
                    <span className="text-sm text-[#1C1B18]/60">Fee (1.5%)</span>
                    <span className="text-sm font-medium text-orange-700">
                      -{formatCurrency(selectedAdvance.fee)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-[#0A2E20]/5 px-3 py-2 -mx-3">
                    <span className="text-sm font-semibold text-[#1C1B18]">Net Received</span>
                    <span className="text-sm font-bold text-[#0A2E20]">
                      {formatCurrency(selectedAdvance.net)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#1C1B18]/10 pt-5">
                <p className="text-xs text-[#1C1B18]/40 uppercase tracking-wider mb-3">
                  Settlement
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#1C1B18]/60">Settled Date</span>
                    <span className="text-sm font-medium text-[#1C1B18]">
                      {selectedAdvance.settledDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#1C1B18]/60">Days to Settle</span>
                    <span className="text-sm font-medium text-[#1C1B18]">
                      {selectedAdvance.daysToSettle} days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#1C1B18]/10 flex justify-end">
              <button
                onClick={() => setSelectedAdvance(null)}
                className="px-5 py-2 text-sm font-medium text-[#1C1B18] border border-[#1C1B18]/20 rounded-sm hover:bg-[#1C1B18]/5 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}