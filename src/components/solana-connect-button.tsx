"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Wallet, LogOut } from "lucide-react";

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
      <button
        onClick={() => disconnect()}
        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
          variant === "primary" 
            ? "bg-[#0A2E20] text-[#F5F3EC] hover:bg-black" 
            : "bg-transparent text-[#1C1B18] border-2 border-[#1C1B18] hover:bg-[#EBE8DE]"
        }`}
      >
        <Wallet size={16} />
        {formatAddress(publicKey.toBase58())}
        <LogOut size={14} />
      </button>
    );
  }

  return (
    <WalletMultiButton
      className={`!inline-flex !items-center !gap-2 !px-4 !py-2 !text-sm !font-medium !transition-colors ${
        variant === "primary" 
          ? "!bg-[#0A2E20] !text-[#F5F3EC] hover:!bg-black" 
          : "!bg-transparent !text-[#1C1B18] !border-2 !border-[#1C1B18] hover:!bg-[#EBE8DE]"
      }`}
    >
      <Wallet size={16} />
      Connect Solana
    </WalletMultiButton>
  );
}