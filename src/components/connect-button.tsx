"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { Wallet, LogOut } from "lucide-react";

export function ConnectWallet({ 
  variant = "primary",
}: { 
  variant?: "primary" | "secondary";
}) {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
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
        {formatAddress(address)}
        <LogOut size={14} />
      </button>
    );
  }

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!ready) {
          return null;
        }

        if (connected) {
          return (
            <button
              onClick={openAccountModal}
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                variant === "primary" 
                  ? "bg-[#0A2E20] text-[#F5F3EC] hover:bg-black" 
                  : "bg-transparent text-[#1C1B18] border-2 border-[#1C1B18] hover:bg-[#EBE8DE]"
              }`}
            >
              <Wallet size={16} />
              {account.displayName}
              {account.displayBalance ? ` (${account.displayBalance})` : ""}
            </button>
          );
        }

        return (
          <button
            onClick={openConnectModal}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
              variant === "primary" 
                ? "bg-[#0A2E20] text-[#F5F3EC] hover:bg-black" 
                : "bg-transparent text-[#1C1B18] border-2 border-[#1C1B18] hover:bg-[#EBE8DE]"
            }`}
          >
            <Wallet size={16} />
            Connect Wallet
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}