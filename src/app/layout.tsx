import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eComYield | Get Paid Today, Not in 21 Days",
  description: "Turn Amazon receivables into instant cash flow. Up to 80% of daily net sales advanced same-day. Earn 24-48% APY on Solana.",
  keywords: ["Amazon seller financing", "RWA", "Solana", "DeFi yield", "e-commerce cash flow", "daily advance"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-950">{children}</body>
    </html>
  );
}
