"use client";

import { useState, useMemo } from "react";
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

  const depositAmount = parseFloat(amount) || 0;
  const isValidAmount = depositAmount >= minDeposit;

  // Calculate yields
  const yields = useMemo(() => {
    if (!isValidAmount || depositAmount <= 0) {
      return { daily: 0, monthly: 0, annual: 0 };
    }
    const daily = depositAmount * (currentAPY / 100) / 365;
    const monthly = depositAmount * (currentAPY / 100) / 12;
    const annual = depositAmount * (currentAPY / 100);
    return { daily, monthly, annual };
  }, [depositAmount, currentAPY, isValidAmount]);

  if (!isOpen) return null;

  const handleDeposit = async () => {
    if (!isValidAmount || !isConnected) return;

    setIsDepositing(true);
    setError(null);

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

  const formatUSD = (val: number) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1C1B18]/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden bg-[#F5F3EC] shadow-2xl">
        {/* Deposit Form */}
        <div className="p-6">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-[#1C1B18]/40 hover:text-[#1C1B18]"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-bold text-[#1C1B18]">Deposit USDC</h2>
          <p className="mt-1 text-sm text-[#1C1B18]/50">{vaultName}</p>

          {/* Amount Input - Morpho style */}
          <div className="mt-6">
            <div className="rounded-lg border border-[#1C1B18]/10 bg-white p-4 hover:bg-[#F5F3EC]/50 transition-colors cursor-text">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#1C1B18]/50">Deposit USDC</span>
                <div className="flex items-center gap-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2774CA]">
                    <span className="text-[8px] font-bold text-white">USDC</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  inputMode="decimal"
                  className="w-full border-none bg-transparent p-0 text-2xl font-bold text-[#1C1B18] outline-none caret-[#0A2E20] placeholder:text-[#1C1B18]/20"
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-[#1C1B18]/40">
                  ≈ {formatUSD(depositAmount)}
                </span>
                <span className="text-xs text-[#1C1B18]/40">
                  Min: {minDeposit.toLocaleString()} USDC
                </span>
              </div>
            </div>

            {/* Quick amount buttons */}
            <div className="mt-2 flex gap-2">
              {[1000, 5000, 10000, 50000].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val.toString())}
                  className="flex-1 rounded border border-[#1C1B18]/10 py-1.5 text-xs font-medium text-[#1C1B18]/60 hover:bg-[#F5F3EC] hover:text-[#1C1B18] transition-colors"
                >
                  ${val.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Yield Calculator - Morpho style */}
          <div className="mt-6 space-y-3 rounded-lg border border-[#1C1B18]/10 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-[#1C1B18]/50">Network</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-[#9945FF]">
                  <span className="text-[8px] font-bold text-white">SOL</span>
                </div>
                <span className="text-xs font-medium text-[#1C1B18]">Solana</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-[#1C1B18]/50">Deposit (USDC)</span>
              <span className="text-sm font-medium text-[#1C1B18]">{depositAmount > 0 ? depositAmount.toLocaleString() : "0.00"}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-[#1C1B18]/50">APY</span>
              <span className="text-sm font-bold text-[#0A2E20]">{currentAPY}%</span>
            </div>

            {/* Projected Earnings */}
            <div className="mt-2 space-y-2 border-t border-[#1C1B18]/5 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#1C1B18]/50">Projected daily earnings</span>
                <span className={`text-sm font-medium ${depositAmount > 0 ? "text-[#0A2E20]" : "text-[#1C1B18]/30"}`}>
                  {formatUSD(yields.daily)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#1C1B18]/50">Projected monthly earnings</span>
                <span className={`text-sm font-medium ${depositAmount > 0 ? "text-[#0A2E20]" : "text-[#1C1B18]/30"}`}>
                  {formatUSD(yields.monthly)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#1C1B18]/50">Projected yearly earnings</span>
                <span className={`text-sm font-medium ${depositAmount > 0 ? "text-[#0A2E20]" : "text-[#1C1B18]/30"}`}>
                  {formatUSD(yields.annual)}
                </span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-sm bg-red-50 p-3">
              <AlertCircle size={16} className="text-red-500" />
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}

          {/* Deposit Button - Morpho style */}
          <button
            onClick={handleDeposit}
            disabled={!isValidAmount || isDepositing || !isConnected}
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-[#0A2E20] py-4 text-sm font-semibold text-[#F5F3EC] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="mt-4 flex items-start gap-2 rounded-sm bg-[#EBE8DE] p-3">
            <AlertCircle size={14} className="mt-0.5 shrink-0 text-[#1C1B18]/40" />
            <p className="text-xs leading-relaxed text-[#1C1B18]/50">
              Your deposit will earn yield starting from the next epoch. Early withdrawal may incur fees.
            </p>
          </div>
        </div>

        {/* Success State */}
        {depositSuccess && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5F3EC] p-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0A2E20]/10">
              <ArrowDown size={32} className="text-[#0A2E20]" />
            </div>
            <h3 className="text-xl font-bold text-[#1C1B18]">Deposit Successful!</h3>
            <p className="mt-2 text-sm text-[#1C1B18]/60">
              Your USDC has been deposited into the vault.
            </p>
            <div className="mt-6 rounded-sm bg-white p-4 text-left w-full border border-[#1C1B18]/10">
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
              className="mt-6 w-full rounded-lg bg-[#0A2E20] py-3 text-sm font-medium text-[#F5F3EC] hover:opacity-90"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}