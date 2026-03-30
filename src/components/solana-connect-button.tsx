"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LogOut, ChevronDown } from "lucide-react";

export function SolanaConnectButton({ 
  variant = "primary",
}: { 
  variant?: "primary" | "secondary";
}) {
  const { connected, publicKey, disconnect } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (connected && publicKey) {
    return (
      <div className="relative group">
        <button
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ${
            variant === "primary" 
              ? "bg-[#0A2E20] text-[#F5F3EC] hover:opacity-90" 
              : "bg-transparent text-[#1C1B18] border-2 border-[#1C1B18] hover:bg-[#EBE8DE]"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#9945FF] flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">S</span>
            </div>
            <span>{formatAddress(publicKey.toBase58())}</span>
          </div>
          <ChevronDown size={14} className="opacity-60" />
        </button>
        
        {/* Dropdown menu */}
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#1C1B18]/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
          <button
            onClick={() => disconnect()}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-[#1C1B18]/70 hover:bg-[#F5F3EC] hover:text-[#1C1B18] rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <WalletMultiButton
      className={`!inline-flex !items-center !justify-center !gap-2 !px-6 !py-3 !text-sm !font-semibold !rounded-lg !transition-all ${
        variant === "primary" 
          ? "!bg-[#0A2E20] !text-[#F5F3EC] hover:!opacity-90" 
          : "!bg-transparent !text-[#1C1B18] !border-2 !border-[#1C1B18] hover:!bg-[#EBE8DE]"
      }`}
    >
      Connect Wallet
    </WalletMultiButton>
  );
}