import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/preloader";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eComYield | Advance Seller Payouts. Earn Yield.",
  description:
    "Turn Amazon receivables into instant cash flow. Up to 80% of daily net sales advanced same-day. Earn real-world yield backed by verifiable commerce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#F5F3EC] text-[#1C1B18] antialiased">
        <Providers>
          <Preloader>{children}</Preloader>
        </Providers>
      </body>
    </html>
  );
}
