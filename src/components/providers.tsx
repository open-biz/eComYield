"use client";

import * as React from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter, SolflareWalletAdapter, LedgerWalletAdapter, CoinbaseWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider as SolanaWalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

const queryClient = new QueryClient();

// Solana wallet configuration - supports Phantom, Solflare, Ledger, Coinbase
const SolanaWalletProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = clusterApiUrl(network);
  
  const wallets = React.useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
      new CoinbaseWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <SolanaWalletModalProvider>
          {children}
        </SolanaWalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SolanaWalletProviderWrapper>
        {children}
      </SolanaWalletProviderWrapper>
    </QueryClientProvider>
  );
}