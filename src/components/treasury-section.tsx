"use client";

import { useState } from "react";
import { Building2, Copy, TrendingUp, CreditCard, Eye, Info, Lock, Unlock } from "lucide-react";
import { InstantPayoutModal } from "./instant-payout-modal";
import { CardTransactionsModal } from "./card-transactions-modal";

interface TreasurySectionProps {
  availableBalance?: number;
  usdcBalance?: number;
  savingsBalance?: number;
}

export function TreasurySection({ 
  availableBalance = 12847.50, 
  usdcBalance = 2150,
  savingsBalance = 5420 
}: TreasurySectionProps) {
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [showInstantPayout, setShowInstantPayout] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(amount);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const bankAccount = {
    bankName: "eComYield Business Checking",
    accountType: "Treasury Account",
    routingNumber: "026009593",
    accountNumber: "8847392010",
    iban: "US64 0260 0959 3884 7392 010",
  };

  const usdcWallet = {
    network: "Solana",
    address: "7xKXtgXL4hS3LS1qJ3gYqYvYjYzYmXkZ9P8qR3wMnQz",
  };

  const card = {
    fullNumber: "4532 1234 5678 9010",
    last4: "9010",
    cvv: "123",
    expires: "12/28",
    availableCredit: 48250,
    creditLimit: 50000,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1C1B18] tracking-tight">The Treasury</h2>
        <button 
          onClick={() => setShowInstantPayout(true)}
          className="inline-flex items-center gap-2 bg-[#0A2E20] text-[#F5F3EC] px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-colors shadow-lg"
        >
          <TrendingUp size={16} />
          Instant Payout
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Bank Account Card */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="space-y-6">
            {/* Bank Header */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#0A2E20]/10 rounded-xl text-[#0A2E20] border border-[#0A2E20]/20">
                <Building2 size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1C1B18] text-lg mb-1">{bankAccount.bankName}</h3>
                <p className="text-sm text-[#1C1B18]/50">{bankAccount.accountType} • FDIC Insured</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#1C1B18]/50">Available Balance</p>
                <p className="text-2xl font-bold text-[#1C1B18] font-mono">{formatCurrency(availableBalance)}</p>
              </div>
            </div>

            {/* Bank Details */}
            <div className="space-y-3 pt-4 border-t border-black/5">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#F5F3EC]/50 hover:bg-[#F5F3EC] transition-colors group">
                <div>
                  <p className="text-xs text-[#1C1B18]/50 mb-1">Routing Number</p>
                  <p className="font-mono text-sm font-semibold text-[#1C1B18]">{bankAccount.routingNumber}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(bankAccount.routingNumber)}
                  className="inline-flex items-center gap-2 whitespace-nowrap font-medium hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy size={14} className="text-[#1C1B18]/50" />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#F5F3EC]/50 hover:bg-[#F5F3EC] transition-colors group">
                <div>
                  <p className="text-xs text-[#1C1B18]/50 mb-1">Account Number</p>
                  <p className="font-mono text-sm font-semibold text-[#1C1B18]">{bankAccount.accountNumber}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(bankAccount.accountNumber)}
                  className="inline-flex items-center gap-2 whitespace-nowrap font-medium hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy size={14} className="text-[#1C1B18]/50" />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#F5F3EC]/50 hover:bg-[#F5F3EC] transition-colors group">
                <div>
                  <p className="text-xs text-[#1C1B18]/50 mb-1">IBAN</p>
                  <p className="font-mono text-sm font-semibold text-[#1C1B18]">{bankAccount.iban}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(bankAccount.iban)}
                  className="inline-flex items-center gap-2 whitespace-nowrap font-medium hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy size={14} className="text-[#1C1B18]/50" />
                </button>
              </div>
            </div>

            {/* USDC Wallet */}
            <div className="space-y-3 pt-4 border-t border-black/5">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-[#0A2E20]/10 to-transparent border border-[#0A2E20]/20">
                <div className="flex-1">
                  <p className="text-xs text-[#1C1B18]/50 mb-1">USDC Wallet ({usdcWallet.network} Network)</p>
                  <p className="font-mono text-xs font-semibold text-[#1C1B18] break-all">{usdcWallet.address}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(usdcWallet.address)}
                  className="inline-flex items-center gap-2 whitespace-nowrap font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs ml-2"
                >
                  <Copy size={14} className="text-[#1C1B18]/50" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-[#F5F3EC]/50">
                  <p className="text-xs text-[#1C1B18]/50 mb-1">Savings</p>
                  <p className="font-mono text-lg font-bold text-[#1C1B18]">{formatCurrency(savingsBalance)}</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-[#0A2E20]/10 to-transparent border border-[#0A2E20]/20">
                  <p className="text-xs text-[#1C1B18]/50 mb-1">USDC Balance</p>
                  <p className="font-mono text-lg font-bold text-[#1C1B18]">{formatCurrency(usdcBalance)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Virtual Card */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="space-y-6">
            {/* Card Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#F59E0B]/10 rounded-xl text-[#F59E0B] border border-[#F59E0B]/20">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1C1B18] text-lg mb-1">eComYield Business Card</h3>
                  <p className="text-sm text-[#1C1B18]/50">Virtual Treasury Card</p>
                </div>
              </div>
              <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors ${isCardFrozen ? "bg-red-100 text-red-700 border-red-200" : "bg-[#0A2E20]/20 text-[#0A2E20] border-[#0A2E20]/30"}`}>
                {isCardFrozen ? "Frozen" : "Active"}
              </span>
            </div>

            {/* Card Visual */}
            <div className="w-full max-w-[380px] mx-auto">
              <div className={`relative p-6 rounded-2xl bg-gradient-to-br from-[#1C1B18] via-gray-800 to-black border border-white/10 shadow-2xl overflow-hidden aspect-[1.586/1] ${isCardFrozen ? "opacity-60" : ""}`}>
                {/* Freeze Overlay */}
                {isCardFrozen && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-3">
                      <Lock size={48} className="text-white" />
                      <p className="text-white font-semibold text-lg">Card Frozen</p>
                      <p className="text-white/60 text-sm">Transactions are blocked</p>
                    </div>
                  </div>
                )}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#0A2E20]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-3xl"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-10 rounded-md bg-gradient-to-br from-[#F59E0B] to-yellow-600 shadow-lg"></div>
                    <div className="text-right">
                      <p className="text-white/60 text-xs font-medium">ECOMYIELD</p>
                      <p className="text-white/80 text-xs font-bold">TREASURY</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-xl md:text-2xl font-bold text-white tracking-wider">
                        {showCardNumber ? card.fullNumber : `4532 •••• •••• ${card.last4}`}
                      </p>
                      <button 
                        onClick={() => setShowCardNumber(!showCardNumber)}
                        disabled={isCardFrozen}
                        className="inline-flex items-center justify-center gap-2 rounded-md text-xs h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/50 text-xs mb-1">CARDHOLDER</p>
                      <p className="text-white font-semibold text-sm">YOUR BUSINESS LLC</p>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-white/50 text-xs mb-1">EXPIRES</p>
                        <p className="text-white font-mono font-semibold text-sm">{card.expires}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="text-white/50 text-xs mb-1">CVV</p>
                          <p className="text-white font-mono font-semibold text-sm">{showCVV ? card.cvv : "•••"}</p>
                        </div>
                        <button 
                          onClick={() => setShowCVV(!showCVV)}
                          disabled={isCardFrozen}
                          className="mt-3 inline-flex items-center justify-center rounded-md text-xs h-6 w-6 p-0 text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Eye size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Credit Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#1C1B18]/50">Available Credit</span>
                <span className="font-bold text-[#1C1B18] font-mono">{formatCurrency(card.availableCredit)}</span>
              </div>
              <div className="w-full bg-[#EBE8DE] rounded-full h-2">
                <div className="bg-gradient-to-r from-[#0A2E20] to-[#F59E0B] h-2 rounded-full transition-all" style={{ width: `${(card.availableCredit / card.creditLimit) * 100}%` }}></div>
              </div>
              <div className="flex items-center justify-between text-xs text-[#1C1B18]/40">
                <span>Credit Limit: {formatCurrency(card.creditLimit)}</span>
                <span>{((card.availableCredit / card.creditLimit) * 100).toFixed(1)}% Available</span>
              </div>
            </div>

            {/* Card Actions */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-black/10">
              <button 
                onClick={() => setIsCardFrozen(!isCardFrozen)}
                className={`inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 w-full ${isCardFrozen ? "border border-[#0A2E20] text-[#0A2E20] hover:bg-[#0A2E20]/10" : "border border-[#1C1B18]/10 bg-white shadow-sm hover:bg-[#EBE8DE]"}`}
              >
                {isCardFrozen ? (
                  <>
                    <Unlock size={16} />
                    Unfreeze Card
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Freeze Card
                  </>
                )}
              </button>
              <button 
                onClick={() => setShowTransactions(true)}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors border border-[#1C1B18]/10 bg-white shadow-sm hover:bg-[#EBE8DE] h-9 px-4 py-2 w-full"
              >
                View Transactions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0A2E20]/5 border border-[#0A2E20]/20">
        <Info size={20} className="text-[#0A2E20] mt-0.5 shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-[#1C1B18]/70 leading-relaxed">
            Your idle business funds are automatically routed to yield-generating opportunities. 
            USDC holdings earn <span className="font-semibold text-[#1C1B18]">4.5% APY</span> through our RWA Pool in eComYield&apos;s RWA.
          </p>
        </div>
      </div>

      {/* Modals */}
      <InstantPayoutModal 
        isOpen={showInstantPayout} 
        onClose={() => setShowInstantPayout(false)} 
        availableBalance={availableBalance}
      />
      <CardTransactionsModal 
        isOpen={showTransactions} 
        onClose={() => setShowTransactions(false)} 
      />
    </div>
  );
}