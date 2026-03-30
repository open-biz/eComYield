"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ProblemSolution from "@/components/problem-solution";
import TrustBanner from "@/components/trust-banner";
import Mechanism from "@/components/mechanism";
import PricingSection from "@/components/pricing-section";
import YieldPitch from "@/components/yield-pitch";
import CTAFooter from "@/components/cta-footer";

export default function Home() {
  const router = useRouter();

  const handleConnectStore = () => router.push("/seller");
  const handleConnectWallet = () => router.push("/vaults");

  const scrollToYield = () => {
    document.getElementById("yield-pitch")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-[#F5F3EC]">
      <Navbar onConnectStore={handleConnectStore} onConnectWallet={handleConnectWallet} />
      <HeroSection onConnectStore={handleConnectStore} onEarnYield={scrollToYield} />
      <ProblemSolution />
      <TrustBanner />
      <Mechanism />
      <PricingSection />
      <div id="yield-pitch">
        <YieldPitch />
      </div>
      <CTAFooter onConnectStore={handleConnectStore} onDepositUSDC={handleConnectWallet} />
    </main>
  );
}
