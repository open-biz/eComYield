"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import EasySetup from "@/components/easy-setup";
import YieldShowcase from "@/components/yield-showcase";
import CompetitiveLandscape from "@/components/competitive-landscape";
import Footer from "@/components/footer";
import DemoConnect from "@/components/demo-connect";
import SellerDashboard from "@/components/seller-dashboard";

const DEMO_ACCOUNTS: Record<string, { name: string; dailySales: number }> = {
  demo1: { name: "TechGear Pro", dailySales: 12450 },
  demo2: { name: "Home Essentials Co", dailySales: 8320 },
  demo3: { name: "FitLife Active", dailySales: 15890 },
};

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<{ name: string; dailySales: number } | null>(null);

  const handleConnect = (demoId: string) => {
    const data = DEMO_ACCOUNTS[demoId];
    if (data) {
      setSelectedSeller(data);
      setIsDashboardOpen(true);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar 
        onConnectStore={() => setIsDemoModalOpen(true)} 
        onEarnYield={() => {
          const yieldSection = document.getElementById("yield");
          yieldSection?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <HeroSection 
        onConnectStore={() => setIsDemoModalOpen(true)} 
        onEarnYield={() => {
          const yieldSection = document.getElementById("yield");
          yieldSection?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <EasySetup />
      <YieldShowcase />
      <CompetitiveLandscape />
      <Footer />

      {/* Demo Connect Modal */}
      <DemoConnect
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onConnect={handleConnect}
      />

      {/* Seller Dashboard */}
      {selectedSeller && (
        <SellerDashboard
          isOpen={isDashboardOpen}
          onClose={() => setIsDashboardOpen(false)}
          sellerName={selectedSeller.name}
          dailySales={selectedSeller.dailySales}
        />
      )}
    </main>
  );
}