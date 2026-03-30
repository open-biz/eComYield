"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  lightTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, createConfig, http } from "wagmi";
import {
  mainnet,
  sepolia,
  polygon,
  optimism,
  arbitrum,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { metaMaskWallet, injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider as SolanaWalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

const queryClient = new QueryClient();

// Only use injected wallets (browser extensions like MetaMask) - no WalletConnect
const connectors = connectorsForWallets(
  [
    {
      groupName: "Wallets",
      wallets: [metaMaskWallet, injectedWallet],
    },
  ],
  { appName: "eComYield", projectId: "ecomyield" }
);

const metadata = {
  name: "eComYield",
  description: "Advance Amazon seller payouts. Earn real-world yield.",
  url: "https://ecomyield.com",
  icons: ["https://ecomyield.com/icon.png"],
};

const config = createConfig({
  chains: [mainnet, sepolia, polygon, optimism, arbitrum],
  connectors,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
});

// Solana wallet configuration
const SolanaWalletProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = clusterApiUrl(network);
  
  const wallets = React.useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
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
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#0A2E20",
            accentColorForeground: "#F5F3EC",
            borderRadius: "none",
            fontStack: "system",
          })}
          appInfo={{
            ...metadata,
            learnMoreUrl: "https://ecomyield.com/docs",
          }}
        >
          <SolanaWalletProviderWrapper>
            {children}
          </SolanaWalletProviderWrapper>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}