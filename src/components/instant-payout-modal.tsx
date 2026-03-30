"use client";

import { useState } from "react";
import { X, Building2, Wallet, ArrowRight, Loader2, Check } from "lucide-react";

interface InstantPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance?: number;
}

export function InstantPayoutModal({ isOpen, onClose, availableBalance = 12847.50 }: InstantPayoutModalProps) {
  const [payoutMethod, setPayoutMethod] = useState<"bank" | "crypto" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(amount);

  const handlePayout = async () => {
    if (!payoutMethod) return;
    setIsProcessing(true);
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsComplete(true);
  };

  const handleClose = () => {
    setPayoutMethod(null);
    setIsProcessing(false);
    setIsComplete(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1C1B18]/10">
          <h2 className="text-lg font-semibold text-[#1C1B18]">Instant Payout</h2>
          <button onClick={handleClose} className="p-1 hover:bg-[#F5F3EC] rounded-full transition-colors">
            <X size={20} className="text-[#1C1B18]/60" />
          </button>
        </div>

        {isComplete ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-[#0A2E20]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-[#0A2E20]" />
            </div>
            <h3 className="text-xl font-semibold text-[#1C1B18] mb-2">Payout Initiated</h3>
            <p className="text-[#1C1B18]/60 mb-6">
              Your payout of {formatCurrency(availableBalance)} has been initiated. 
              You will receive the funds within 1-2 business days.
            </p>
            <button 
              onClick={handleClose}
              className="w-full bg-[#0A2E20] text-[#F5F3EC] py-3 rounded-full font-medium hover:opacity-90 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Balance */}
            <div className="p-5 bg-[#F5F3EC]/50">
              <p className="text-sm text-[#1C1B18]/60 mb-1">Available for payout</p>
              <p className="text-3xl font-bold text-[#1C1B18] font-mono">{formatCurrency(availableBalance)}</p>
            </div>

            {/* Payout Options */}
            <div className="p-5 space-y-4">
              <p className="text-sm font-medium text-[#1C1B18]">Select payout method</p>
              
              <button
                onClick={() => setPayoutMethod("bank")}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  payoutMethod === "bank" 
                    ? "border-[#0A2E20] bg-[#0A2E20]/5" 
                    : "border-[#1C1B18]/10 hover:border-[#1C1B18]/30"
                }`}
              >
                <div className={`p-2 rounded-lg ${payoutMethod === "bank" ? "bg-[#0A2E20] text-white" : "bg-[#F5F3EC] text-[#1C1B18]/60"}`}>
                  <Building2 size={20} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-[#1C1B18]">Bank Transfer (ACH)</p>
                  <p className="text-sm text-[#1C1B18]/50">1-2 business days</p>
                </div>
                <ArrowRight size={18} className={`${payoutMethod === "bank" ? "text-[#0A2E20]" : "text-[#1C1B18]/30"}`} />
              </button>

              <button
                onClick={() => setPayoutMethod("crypto")}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  payoutMethod === "crypto" 
                    ? "border-[#0A2E20] bg-[#0A2E20]/5" 
                    : "border-[#1C1B18]/10 hover:border-[#1C1B18]/30"
                }`}
              >
                <div className={`p-2 rounded-lg ${payoutMethod === "crypto" ? "bg-[#0A2E20] text-white" : "bg-[#F5F3EC] text-[#1C1B18]/60"}`}>
                  <Wallet size={20} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-[#1C1B18]">USDC (Solana)</p>
                  <p className="text-sm text-[#1C1B18]/50">Instant</p>
                </div>
                <ArrowRight size={18} className={`${payoutMethod === "crypto" ? "text-[#0A2E20]" : "text-[#1C1B18]/30"}`} />
              </button>
            </div>

            {/* Action */}
            <div className="p-5 border-t border-[#1C1B18]/10">
              <button
                onClick={handlePayout}
                disabled={!payoutMethod || isProcessing}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium transition-all ${
                  payoutMethod 
                    ? "bg-[#0A2E20] text-[#F5F3EC] hover:opacity-90" 
                    : "bg-[#1C1B18]/10 text-[#1C1B18]/40 cursor-not-allowed"
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Initiate Payout</>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}