"use client";

import { useState } from "react";
import { X, ArrowDown, AlertCircle, Loader2 } from "lucide-react";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  vaultName: string;
  currentAPY: number;
  minDeposit: number;
}

export function DepositModal({ isOpen, onClose, vaultName, currentAPY, minDeposit }: DepositModalProps) {
  const { connected: isConnected } = useSolanaWallet();
  const [amount, setAmount] = useState("");
  const [isDepositing, setIsDepositing] = useState(false);
  const [depositSuccess, setDepositSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const depositAmount = parseFloat(amount) || 0;
  const isValidAmount = depositAmount >= minDeposit;
  const estimatedYield = (depositAmount * currentAPY) / 100;

  const handleDeposit = async () => {
    if (!isValidAmount || !isConnected) return;

    setIsDepositing(true);
    setError(null);

    // Simulate deposit transaction
    // In production, this would call a smart contract or API
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setDepositSuccess(true);
    } catch {
      setError("Deposit failed. Please try again.");
    } finally {
      setIsDepositing(false);
    }
  };

  const handleClose = () => {
    setAmount("");
    setDepositSuccess(false);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1C1B18]/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#F5F3EC] p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-[#1C1B18]/40 hover:text-[#1C1B18]"
        >
          <X size={20} />
        </button>

        {depositSuccess ? (
          /* Success State */
          <div className="text-center py-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0A2E20]/10">
              <ArrowDown size={32} className="text-[#0A2E20]" />
            </div>
            <h3 className="text-xl font-bold text-[#1C1B18]">Deposit Successful!</h3>
            <p className="mt-2 text-sm text-[#1C1B18]/60">
              Your USDC has been deposited into the vault.
            </p>
            <div className="mt-6 rounded-sm bg-[#EBE8DE] p-4 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-[#1C1B18]/50">Deposited</span>
                <span className="font-medium text-[#1C1B18]">${depositAmount.toLocaleString()} USDC</span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-[#1C1B18]/50">Estimated APY</span>
                <span className="font-medium text-[#0A2E20]">{currentAPY}%</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="mt-6 w-full rounded-none bg-[#0A2E20] py-3 text-sm font-medium text-[#F5F3EC] hover:opacity-90"
            >
              Done
            </button>
          </div>
        ) : (
          /* Deposit Form */
          <>
            <h2 className="text-xl font-bold text-[#1C1B18]">Deposit USDC</h2>
            <p className="mt-1 text-sm text-[#1C1B18]/50">{vaultName}</p>

            {/* Amount Input */}
            <div className="mt-6">
              <label className="text-xs font-medium text-[#1C1B18]/50 uppercase tracking-wider">
                Amount
              </label>
              <div className="mt-2 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#1C1B18]/40">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full border-2 border-[#1C1B18]/10 py-4 pl-10 pr-4 text-2xl font-bold text-[#1C1B18] placeholder-[#1C1B18]/20 focus:border-[#0A2E20] focus:outline-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#1C1B18]/40">
                  USDC
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-[#1C1B18]/40">
                  Min: {minDeposit.toLocaleString()} USDC
                </span>
                <button
                  onClick={() => setAmount("10000")}
                  className="text-xs font-medium text-[#0A2E20] hover:underline"
                >
                  Set $10,000
                </button>
              </div>
            </div>

            {/* Estimated Yield */}
            {isValidAmount && (
              <div className="mt-4 rounded-sm bg-[#EBE8DE] p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#1C1B18]/60">Estimated Annual Yield</span>
                  <span className="text-sm font-bold text-[#0A2E20]">
                    ~${estimatedYield.toLocaleString(undefined, { maximumFractionDigits: 2 })} USDC
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-[#1C1B18]/40">APY</span>
                  <span className="text-xs font-medium text-[#0A2E20]">{currentAPY}%</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-sm bg-red-50 p-3">
                <AlertCircle size={16} className="text-red-500" />
                <span className="text-sm text-red-600">{error}</span>
              </div>
            )}

            {/* Deposit Button */}
            <button
              onClick={handleDeposit}
              disabled={!isValidAmount || isDepositing || !isConnected}
              className="mt-6 w-full flex items-center justify-center gap-2 rounded-none bg-[#0A2E20] py-4 text-sm font-medium text-[#F5F3EC] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDepositing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Depositing...
                </>
              ) : !isConnected ? (
                "Connect Wallet to Deposit"
              ) : (
                <>
                  <ArrowDown size={16} />
                  Deposit {depositAmount > 0 ? `${depositAmount.toLocaleString()} USDC` : ""}
                </>
              )}
            </button>

            {/* Info */}
            <div className="mt-4 flex items-start gap-2 rounded-sm bg-[#F5F3EC] p-3">
              <AlertCircle size={14} className="mt-0.5 shrink-0 text-[#1C1B18]/40" />
              <p className="text-xs leading-relaxed text-[#1C1B18]/50">
                Your deposit will earn yield starting from the next epoch. Early withdrawal may incur fees.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}