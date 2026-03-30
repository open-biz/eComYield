"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  lightTheme,
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
import { injected } from "wagmi/connectors";

const queryClient = new QueryClient();

const metadata = {
  name: "eComYield",
  description: "Advance Amazon seller payouts. Earn real-world yield.",
  url: "https://ecomyield.com",
  icons: ["https://ecomyield.com/icon.png"],
};

const config = createConfig({
  chains: [mainnet, sepolia, polygon, optimism, arbitrum],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
});

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
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}